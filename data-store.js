const DB_NAME = "makakao-db";
const DB_VERSION = 2;
const STORES = ["scans", "chat", "cart", "formulas", "activity", "orders"];

let databasePromise;
let usingFallback = false;
let remotePromise;
let remoteStatus = { enabled: false, backend: "local" };

async function loadRemoteConfig() {
  try {
    const module = await import("./config.js");
    return module.remoteDatabaseConfig || { provider: "local" };
  } catch {
    return { provider: "local" };
  }
}

async function getRemote() {
  if (remotePromise) return remotePromise;

  remotePromise = (async () => {
    const config = await loadRemoteConfig();
    if (config.provider !== "firebase" || !config.firebase?.apiKey || !config.firebase?.projectId) {
      return null;
    }

    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
      const {
        getFirestore,
        collection,
        doc,
        getDocs,
        limit,
        orderBy,
        query,
        setDoc,
      } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");
      const app = initializeApp(config.firebase);
      const db = getFirestore(app);
      remoteStatus = { enabled: true, backend: "Firebase Firestore" };
      return { db, collection, doc, getDocs, limit, orderBy, query, setDoc };
    } catch (error) {
      console.warn("Firebase no disponible, usando base local", error);
      remoteStatus = { enabled: false, backend: "local" };
      return null;
    }
  })();

  return remotePromise;
}

function openDatabase() {
  if (!("indexedDB" in window)) {
    usingFallback = true;
    return Promise.resolve(null);
  }

  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      STORES.forEach((store) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: "id" });
        }
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      usingFallback = true;
      reject(request.error);
    };
  }).catch(() => null);

  return databasePromise;
}

function fallbackKey(store) {
  return `${DB_NAME}:${store}`;
}

function fallbackRead(store) {
  return JSON.parse(localStorage.getItem(fallbackKey(store)) || "[]");
}

function fallbackWrite(store, rows) {
  localStorage.setItem(fallbackKey(store), JSON.stringify(rows));
}

export async function initStore() {
  await getRemote();
  const db = await openDatabase();
  return {
    backend: remoteStatus.enabled ? `${remoteStatus.backend} + cache local` : db && !usingFallback ? "IndexedDB" : "localStorage",
    stores: STORES,
  };
}

export async function saveRecord(store, data) {
  if (!STORES.includes(store)) {
    throw new Error(`Store no soportado: ${store}`);
  }

  const record = {
    id: data.id || `${store}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: data.createdAt || new Date().toISOString(),
    ...data,
  };
  const db = await openDatabase();
  const remote = await getRemote();

  if (remote) {
    try {
      await remote.setDoc(remote.doc(remote.db, store, record.id), record, { merge: true });
    } catch (error) {
      console.warn(`No se pudo guardar en Firebase (${store})`, error);
    }
  }

  if (!db || !db.objectStoreNames.contains(store)) {
    const rows = fallbackRead(store).filter((item) => item.id !== record.id);
    rows.unshift(record);
    fallbackWrite(store, rows.slice(0, 80));
    return record;
  }

  await new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(record);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });

  return record;
}

export async function listRecords(store, limit = 20) {
  if (!STORES.includes(store)) {
    return [];
  }

  const remote = await getRemote();
  if (remote) {
    try {
      const snapshot = await remote.getDocs(
        remote.query(remote.collection(remote.db, store), remote.orderBy("createdAt", "desc"), remote.limit(limit)),
      );
      return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    } catch (error) {
      console.warn(`No se pudo leer Firebase (${store})`, error);
    }
  }

  const db = await openDatabase();

  if (!db || !db.objectStoreNames.contains(store)) {
    return fallbackRead(store).slice(0, limit);
  }

  const rows = await new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const request = tx.objectStore(store).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });

  return rows
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

export async function clearStore() {
  const db = await openDatabase();

  if (!db) {
    STORES.forEach((store) => localStorage.removeItem(fallbackKey(store)));
    return;
  }

  await Promise.all(
    STORES.filter((store) => db.objectStoreNames.contains(store)).map(
      (store) =>
        new Promise((resolve, reject) => {
          const tx = db.transaction(store, "readwrite");
          tx.objectStore(store).clear();
          tx.oncomplete = resolve;
          tx.onerror = () => reject(tx.error);
        }),
    ),
  );
}
