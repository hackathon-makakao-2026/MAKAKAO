import { clearStore, initStore, listRecords, saveRecord } from "./data-store.js";

const routines = {
  seca: {
    title: "Rutina cacao hidratante",
    copy: "Limpieza suave, exfoliacion ligera con cacao y balsamo nutritivo para reforzar la barrera natural.",
    steps: ["Limpieza cremosa", "Exfoliante cacao", "Balsamo nutritivo"],
    scores: [42, 28, 70, 34, 38, 24],
  },
  grasa: {
    title: "Rutina equilibrio natural",
    copy: "Jabon artesanal de limpieza profunda, mascarilla ligera y acabado fresco sin sensacion pesada.",
    steps: ["Limpieza profunda", "Mascarilla ligera", "Gel fresco"],
    scores: [66, 31, 86, 58, 52, 78],
  },
  mixta: {
    title: "Rutina balance cacao",
    copy: "Tratamiento por zonas con exfoliacion suave, hidratacion flexible y aroma personalizado para uso diario.",
    steps: ["Zona T", "Hidratante flexible", "Aroma diario"],
    scores: [64, 37, 78, 46, 48, 54],
  },
  sensible: {
    title: "Rutina calma botanica",
    copy: "Formula suave con ingredientes calmantes, baja friccion y productos pensados para piel reactiva.",
    steps: ["Calma", "Nutricion", "Proteccion"],
    scores: [58, 82, 60, 38, 44, 30],
  },
};

const goalAddons = {
  hidratacion: "Prioridad: retener humedad y suavizar textura.",
  luminosidad: "Prioridad: renovar opacidad y mejorar brillo saludable.",
  calma: "Prioridad: reducir sensacion de irritacion.",
  equilibrio: "Prioridad: controlar brillo sin resecar.",
};

const scentNames = {
  cacao: "cacao suave",
  vainilla: "vainilla",
  citricos: "citricos",
  lavanda: "lavanda",
};

const formulas = {
  cacao: {
    kicker: "Base antioxidante",
    name: "Cacao ecuatoriano",
    copy: "Textura cremosa, aroma calido y apoyo nutritivo para rutinas de autocuidado consciente.",
  },
  avena: {
    kicker: "Base calmante",
    name: "Avena coloidal",
    copy: "Sensacion suave para piel sensible, con acabado confortable y enfoque en calma diaria.",
  },
  miel: {
    kicker: "Base nutritiva",
    name: "Miel natural",
    copy: "Perfil humectante con acabado luminoso para formulas de labios, jabones y exfoliantes.",
  },
  aloe: {
    kicker: "Base refrescante",
    name: "Aloe vera",
    copy: "Ligereza botanica para rutinas frescas, ideal cuando el objetivo es balance y alivio.",
  },
};

const products = {
  exfoliante: "El exfoliante corporal de cacao conviene cuando hay textura opaca o aspereza. Usalo 1 o 2 veces por semana y evita aplicarlo sobre irritacion activa.",
  jabon: "El jabon artesanal ayuda con limpieza diaria. Para piel seca o sensible, conviene alternarlo con una limpieza mas suave.",
  balsamo: "El balsamo labial esta pensado para nutricion localizada y labios sensibles. Si hay ardor persistente, suspende su uso.",
  vela: "La vela aromatica es bienestar sensorial, no tratamiento de piel. Evitala cerca de piel irritada si los aromas te provocan molestia.",
};

const cart = new Map();
let activeFormula = "cacao";
let toastTimer;
let cameraStream;
let capturedImage;
let lastAnalysis;
let runtimeConfig = { paymentConfig: null };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
const normalize = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const form = $("#skin-form");
const resultTitle = $("#result-title");
const resultCopy = $("#result-copy");
const routineGrid = $("#routine-grid");
const scanBar = $("#scan-bar");
const scanStatus = $("#scan-status");
const scanFace = $(".scan-face");
const cameraFrame = $(".camera-frame");
const cameraPlaceholder = $("#camera-placeholder");
const skinVideo = $("#skin-video");
const skinPhotoPreview = $("#skin-photo-preview");
const skinCanvas = $("#skin-canvas");
const startCamera = $("#start-camera");
const capturePhoto = $("#capture-photo");
const skinUpload = $("#skin-upload");
const scoreHydration = $("#score-hydration");
const scoreSensitivity = $("#score-sensitivity");
const scoreBalance = $("#score-balance");
const scorePores = $("#score-pores");
const scoreTexture = $("#score-texture");
const scoreShine = $("#score-shine");
const analysisGrid = $("#analysis-grid");
const formulaButtons = $$("[data-formula]");
const formulaKicker = $("#formula-kicker");
const formulaName = $("#formula-name");
const formulaCopy = $("#formula-copy");
const formulaScore = $("#formula-score");
const saveFormula = $("#save-formula");
const cartCount = $("#cart-count");
const cartItems = $("#cart-items");
const cartTotal = $("#cart-total");
const checkoutButton = $("#checkout-button");
const paymentStatus = $("#payment-status");
const chatWindow = $("#chat-window");
const chatForm = $("#chat-form");
const chatInput = $("#chat-input");
const toast = $("#toast");
const dbStatus = $("#db-status");
const clearData = $("#clear-data");
const scanHistory = $("#scan-history");
const activityHistory = $("#activity-history");
const siteHeader = $(".site-header");
const phoneViews = $$(".phone-view");
const phoneNavButtons = $$("[data-phone-target]");
const routeSections = $$("main > section[id]:not(#app)");
const routeLinks = $$('a[href^="#"]');
const allowedRoutes = new Set([...routeSections].map((section) => section.id));

function updateHeaderState() {
  siteHeader.classList.toggle("is-solid", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

function showPhoneView(viewName) {
  phoneViews.forEach((view) => view.classList.toggle("active", view.dataset.view === viewName));
  phoneNavButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.phoneTarget === viewName && !!button.closest(".phone-nav"));
  });
}

phoneNavButtons.forEach((button) => {
  button.addEventListener("click", () => showPhoneView(button.dataset.phoneTarget));
});

function setActiveRoute(routeName) {
  const route = allowedRoutes.has(routeName) ? routeName : "inicio";
  document.body.classList.add("route-mode");
  routeSections.forEach((section) => {
    section.hidden = section.id !== route;
  });
  routeLinks.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", target === route);
  });
  window.scrollTo({ top: 0, behavior: "auto" });
}

function syncRouteFromHash() {
  const route = window.location.hash.replace("#", "") || "inicio";
  setActiveRoute(route);
}

window.addEventListener("hashchange", syncRouteFromHash);
syncRouteFromHash();

async function refreshHistory() {
  const scans = await listRecords("scans", 5);
  const activity = await listRecords("activity", 7);

  scanHistory.innerHTML = scans.length
    ? scans
        .map(
          (scan) => `
            <div class="history-item">
              <strong>${scan.detectedType} · ${Math.round(scan.confidence)}%</strong>
              <span>Poros ${Math.round(scan.pores)}% · Textura ${Math.round(scan.texture)}% · Brillo ${Math.round(scan.shine)}%</span>
            </div>
          `,
        )
        .join("")
    : "<p>No hay escaneos guardados todavia.</p>";

  activityHistory.innerHTML = activity.length
    ? activity
        .map(
          (item) => `
            <div class="history-item">
              <strong>${item.kind}</strong>
              <span>${item.summary}</span>
            </div>
          `,
        )
        .join("")
    : "<p>No hay actividad guardada todavia.</p>";
}

async function logActivity(kind, summary, payload = {}) {
  await saveRecord("activity", { kind, summary, payload });
  await refreshHistory();
}

async function loadRuntimeConfig() {
  try {
    const module = await import("./config.js");
    runtimeConfig.paymentConfig = module.paymentConfig || null;
  } catch {
    runtimeConfig.paymentConfig = null;
  }

  const payment = runtimeConfig.paymentConfig;
  const configured = Boolean(
    payment?.paymentUrl || (payment?.provider === "whatsapp" && payment?.whatsappNumber),
  );
  checkoutButton.textContent = configured ? "Pagar pedido" : "Crear pedido";
  paymentStatus.textContent = configured
    ? `Pago configurado mediante ${payment.provider}.`
    : "Configura Stripe, Mercado Pago, PayPal o WhatsApp en config.js.";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setScores(scores) {
  const meters = [scoreHydration, scoreSensitivity, scoreBalance, scorePores, scoreTexture, scoreShine];
  scores.forEach((score, index) => {
    const value = Math.round(clamp(score));
    const meter = meters[index];
    meter.value = value;
    meter.setAttribute("value", String(value));
    const output = document.querySelector(`output[for="${meter.id}"]`);
    if (output) output.textContent = `${value}%`;
  });
}

function runScanAnimation(label = "Analizando imagen...") {
  scanFace.classList.remove("is-scanning");
  scanBar.style.width = "0%";
  scanStatus.textContent = label;

  requestAnimationFrame(() => {
    scanFace.classList.add("is-scanning");
    scanBar.style.width = "36%";
  });

  setTimeout(() => {
    scanStatus.textContent = "Detectando brillo, poros y textura...";
    scanBar.style.width = "74%";
  }, 420);
}

async function enableCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast("Tu navegador no permite camara aqui. Puedes subir una foto.");
    return;
  }

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 960 }, height: { ideal: 720 } },
      audio: false,
    });
    skinVideo.srcObject = cameraStream;
    cameraFrame.classList.add("has-video");
    cameraFrame.classList.remove("has-photo");
    capturePhoto.disabled = false;
    scanStatus.textContent = "Camara activa";
  } catch (error) {
    showToast("No pude activar la camara. Revisa permisos o sube una foto.");
  }
}

function drawSourceToCanvas(source) {
  const ctx = skinCanvas.getContext("2d", { willReadFrequently: true });
  const size = 320;
  const sourceWidth = source.videoWidth || source.naturalWidth || source.width;
  const sourceHeight = source.videoHeight || source.naturalHeight || source.height;
  const side = Math.min(sourceWidth, sourceHeight);
  const sx = (sourceWidth - side) / 2;
  const sy = (sourceHeight - side) / 2;

  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(source, sx, sy, side, side, 0, 0, size, size);
  return ctx.getImageData(0, 0, size, size);
}

function captureFromVideo() {
  if (!skinVideo.videoWidth) {
    showToast("La camara aun esta cargando");
    return;
  }

  drawSourceToCanvas(skinVideo);
  capturedImage = skinCanvas.toDataURL("image/png");
  skinPhotoPreview.src = capturedImage;
  cameraFrame.classList.add("has-photo");
  cameraFrame.classList.remove("has-video");
  scanStatus.textContent = "Foto capturada";
  showToast("Foto lista para analisis");
}

function loadUploadedImage(file) {
  if (!file) return;

  const image = new Image();
  image.onload = () => {
    drawSourceToCanvas(image);
    capturedImage = skinCanvas.toDataURL("image/png");
    skinPhotoPreview.src = capturedImage;
    cameraFrame.classList.add("has-photo");
    cameraFrame.classList.remove("has-video");
    scanStatus.textContent = "Foto cargada";
    showToast("Foto lista para analisis");
  };
  image.src = URL.createObjectURL(file);
}

function analyzeCanvasImage() {
  const imageData = skinCanvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, 320, 320);
  const data = imageData.data;
  const luminance = [];
  let redRatioTotal = 0;
  let shinePixels = 0;
  let darkSpotPixels = 0;
  let warmPixels = 0;

  for (let y = 40; y < 280; y += 2) {
    for (let x = 40; x < 280; x += 2) {
      const index = (y * 320 + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      luminance.push(lum);
      redRatioTotal += r - (g + b) / 2;
      if (lum > 212 && r > 180 && g > 165) shinePixels += 1;
      if (lum < 70 && r < 120) darkSpotPixels += 1;
      if (r > g * 1.08 && r > b * 1.18) warmPixels += 1;
    }
  }

  const mean = luminance.reduce((sum, value) => sum + value, 0) / luminance.length;
  const variance = luminance.reduce((sum, value) => sum + (value - mean) ** 2, 0) / luminance.length;
  const std = Math.sqrt(variance);
  let edgeTotal = 0;
  let samples = 0;

  for (let y = 42; y < 278; y += 4) {
    for (let x = 42; x < 278; x += 4) {
      const current = luminance[Math.floor((y - 40) / 2) * 120 + Math.floor((x - 40) / 2)] || 0;
      const right = luminance[Math.floor((y - 40) / 2) * 120 + Math.floor((x + 4 - 40) / 2)] || current;
      const down = luminance[Math.floor((y + 4 - 40) / 2) * 120 + Math.floor((x - 40) / 2)] || current;
      edgeTotal += Math.abs(current - right) + Math.abs(current - down);
      samples += 1;
    }
  }

  const edge = edgeTotal / samples;
  const shine = clamp((shinePixels / luminance.length) * 520);
  const pores = clamp((darkSpotPixels / luminance.length) * 850 + edge * 1.5);
  const texture = clamp(std * 1.55 + edge * 2.1);
  const sensitivity = clamp((warmPixels / luminance.length) * 460 + Math.max(0, redRatioTotal / luminance.length) * 0.55);
  const hydration = clamp(100 - std * 1.2 - shine * 0.25);
  const balance = clamp(100 - Math.abs(shine - 35) * 0.9 - texture * 0.25);
  const uniformity = clamp(100 - std * 1.35);
  const detectedType = detectSkinType({ hydration, sensitivity, balance, pores, texture, shine });

  return {
    hydration,
    sensitivity,
    balance,
    pores,
    texture,
    shine,
    uniformity,
    detectedType,
    confidence: clamp(58 + Math.abs(mean - 128) * 0.08 + texture * 0.18),
  };
}

function detectSkinType(metrics) {
  if (metrics.sensitivity > 62) return "sensible";
  if (metrics.shine > 60 && metrics.balance < 72) return "grasa";
  if (metrics.hydration < 48 && metrics.shine < 44) return "seca";
  return "mixta";
}

function getAnalysisAdvice(metrics) {
  const cards = [
    ["Poros", metrics.pores > 58 ? "Poros mas visibles: prioriza limpieza suave y exfoliacion controlada." : "Poros en rango moderado: mantén limpieza y no sobre-exfolies."],
    ["Textura", metrics.texture > 58 ? "Textura irregular: usa exfoliante de cacao 1 vez por semana y refuerza hidratacion." : "Textura uniforme: conserva una rutina constante y ligera."],
    ["Brillo", metrics.shine > 60 ? "Brillo alto: busca formulas ligeras y balance, no resecar en exceso." : "Brillo bajo o medio: enfoca nutricion y barrera de piel."],
    ["Uniformidad", metrics.uniformity > 62 ? "Tono bastante uniforme en la captura." : "Uniformidad variable: revisa luz, irritacion o resequedad antes de elegir rutina."],
  ];

  return cards
    .map(([title, copy]) => `<div class="analysis-card"><strong>${title}</strong>${copy}</div>`)
    .join("");
}

function applyAnalysis(metrics, preferences) {
  const routine = routines[metrics.detectedType] || routines[preferences.skinType];
  const scent = scentNames[preferences.scent];

  resultTitle.textContent = `${routine.title} (${metrics.detectedType})`;
  resultCopy.textContent = `${routine.copy} ${goalAddons[preferences.goal]} Aroma sugerido: ${scent}. Confianza del analisis: ${Math.round(metrics.confidence)}%.`;
  routineGrid.innerHTML = routine.steps.map((step) => `<span>${step}</span>`).join("");
  setScores([metrics.hydration, metrics.sensitivity, metrics.balance, metrics.pores, metrics.texture, metrics.shine]);
  analysisGrid.innerHTML = getAnalysisAdvice(metrics);
}

function analyzeByFormOnly(preferences) {
  const routine = routines[preferences.skinType];
  const metrics = {
    hydration: routine.scores[0],
    sensitivity: routine.scores[1],
    balance: routine.scores[2],
    pores: routine.scores[3],
    texture: routine.scores[4],
    shine: routine.scores[5],
    uniformity: 62,
    detectedType: preferences.skinType,
    confidence: 52,
  };
  return metrics;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const preferences = {
    skinType: form.elements["skin-type"].value,
    goal: form.elements["skin-goal"].value,
    scent: form.elements.scent.value,
  };

  runScanAnimation(capturedImage ? "Procesando captura..." : "Analizando preferencias...");

  setTimeout(() => {
    lastAnalysis = capturedImage ? analyzeCanvasImage() : analyzeByFormOnly(preferences);
    applyAnalysis(lastAnalysis, preferences);
    saveRecord("scans", { ...lastAnalysis, preferences });
    logActivity("Scanner", `Resultado ${lastAnalysis.detectedType} con confianza ${Math.round(lastAnalysis.confidence)}%`, lastAnalysis);
    scanBar.style.width = "100%";
    scanStatus.textContent = capturedImage ? "Analisis de imagen listo" : "Analisis por preferencias listo";
    showToast(capturedImage ? "Analisis facial completado" : "Usa camara o foto para mayor profundidad");
  }, 900);
});

startCamera.addEventListener("click", enableCamera);
capturePhoto.addEventListener("click", captureFromVideo);
skinUpload.addEventListener("change", (event) => loadUploadedImage(event.target.files[0]));

function updateFormula() {
  const formula = formulas[activeFormula];
  const intensity = Number($("#mix-intensity").value);
  const aroma = Number($("#mix-aroma").value);
  const softness = Number($("#mix-softness").value);
  const score = Math.round(((intensity + aroma + softness) / 15) * 100);

  formulaKicker.textContent = formula.kicker;
  formulaName.textContent = formula.name;
  formulaCopy.textContent = `${formula.copy} Perfil actual: intensidad ${intensity}/5, aroma ${aroma}/5, suavidad ${softness}/5.`;
  formulaScore.textContent = `Personalizacion ${score}%`;
}

formulaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    formulaButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFormula = button.dataset.formula;
    updateFormula();
  });
});

$$(".mix-controls input").forEach((input) => {
  input.addEventListener("input", updateFormula);
});

saveFormula.addEventListener("click", () => {
  const name = formulas[activeFormula].name;
  saveRecord("formulas", {
    base: activeFormula,
    name,
    intensity: Number($("#mix-intensity").value),
    aroma: Number($("#mix-aroma").value),
    softness: Number($("#mix-softness").value),
  });
  logActivity("Formula", `${name} guardada`);
  showToast(`Formula guardada: ${name}`);
});

function renderCart() {
  const entries = [...cart.values()];
  const quantity = entries.reduce((sum, item) => sum + item.quantity, 0);
  const total = entries.reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = quantity;
  cartTotal.textContent = `$${total.toFixed(2)}`;

  if (!entries.length) {
    cartItems.innerHTML = "<p>Agrega productos desde la tienda para armar tu pedido.</p>";
    return;
  }

  cartItems.innerHTML = entries
    .map(
      (item) => `
        <div class="cart-row">
          <span>${item.name} x ${item.quantity}</span>
          <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
          <button type="button" data-remove="${item.name}" aria-label="Quitar ${item.name}">-</button>
        </div>
      `,
    )
    .join("");
}

function addProduct(name, price) {
  const current = cart.get(name) || { name, price, quantity: 0 };
  current.quantity += 1;
  cart.set(name, current);
  renderCart();
  saveRecord("cart", { id: name, name, price, quantity: current.quantity });
  logActivity("Carrito", `${name} agregado`);
  showToast(`${name} agregado al carrito`);
}

$$("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    addProduct(button.dataset.product, Number(button.dataset.price));
  });
});

cartItems.addEventListener("click", (event) => {
  const name = event.target.dataset.remove;
  if (!name) return;

  const item = cart.get(name);
  item.quantity -= 1;
  if (item.quantity <= 0) {
    cart.delete(name);
  }
  saveRecord("cart", { id: name, name, price: item.price, quantity: Math.max(item.quantity, 0) });
  logActivity("Carrito", `${name} actualizado`);
  renderCart();
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-checkout]")) {
    event.preventDefault();
    checkoutOrder();
  }
});

async function checkoutOrder() {
  if (!cart.size) {
    showToast("Tu carrito esta vacio");
    return;
  }

  checkoutButton.disabled = true;
  checkoutButton.textContent = "Procesando...";

  try {
  const items = [...cart.values()];
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const order = await saveRecord("orders", {
    status: "pending_payment",
    currency: runtimeConfig.paymentConfig?.currency || "USD",
    total,
    items,
  });
  await logActivity("Pedido", `Pedido ${order.id} creado por $${total.toFixed(2)}`, order);

  const payment = runtimeConfig.paymentConfig;
  if (payment?.provider === "whatsapp" && payment.whatsappNumber) {
    const text = encodeURIComponent(
      `Hola, quiero pagar mi pedido MAKAKAO ${order.id}. Total: $${total.toFixed(2)}. Productos: ${items
        .map((item) => `${item.name} x${item.quantity}`)
        .join(", ")}`,
    );
    window.location.href = `https://wa.me/${payment.whatsappNumber}?text=${text}`;
    return;
  }

  if (payment?.paymentUrl) {
    const url = new URL(payment.paymentUrl);
    url.searchParams.set("client_reference_id", order.id);
    url.searchParams.set("amount", total.toFixed(2));
    window.location.href = url.toString();
    return;
  }

    showToast("Pedido guardado. Configura el proveedor de pago en config.js.");
  } catch (error) {
    console.error("No se pudo crear el pedido", error);
    showToast("No se pudo crear el pedido. Intenta nuevamente.");
  } finally {
    checkoutButton.disabled = false;
    const payment = runtimeConfig.paymentConfig;
    checkoutButton.textContent = payment?.paymentUrl || payment?.whatsappNumber ? "Pagar pedido" : "Crear pedido";
  }
}

function getAnalysisContext() {
  if (!lastAnalysis) return "";
  return ` Segun tu ultimo scanner: piel ${lastAnalysis.detectedType}, poros ${Math.round(lastAnalysis.pores)}%, textura ${Math.round(lastAnalysis.texture)}%, brillo ${Math.round(lastAnalysis.shine)}%.`;
}

function getBotReply(text) {
  const query = normalize(text);
  const context = getAnalysisContext();

  if (query.includes("reaccion") || query.includes("alerg") || query.includes("ardor") || query.includes("rojez")) {
    return `Si aparece ardor fuerte, ronchas, hinchazon o picazon persistente, suspende el producto y consulta a un profesional de salud. Para una molestia leve, lava con agua, evita exfoliantes y prueba formulas calmantes como avena o aloe.${context}`;
  }
  if (query.includes("poro")) {
    return `Para poros visibles conviene limpieza constante, exfoliacion suave 1 o 2 veces por semana y productos ligeros. El exfoliante de cacao puede ayudar con textura, pero no lo uses si hay irritacion activa.${context}`;
  }
  if (query.includes("textura") || query.includes("asper")) {
    return `Para textura irregular, combina hidratacion diaria con exfoliacion controlada. Si tu piel es sensible, baja la frecuencia y prioriza avena o aloe antes que exfoliantes fuertes.${context}`;
  }
  if (query.includes("sensible") || query.includes("irrit")) {
    return `Para piel sensible conviene bajar la exfoliacion, evitar aromas intensos y hacer prueba de parche 24 horas antes. En Makakao, avena y aloe son mejores bases calmantes.${context}`;
  }
  if (query.includes("hidrat")) {
    return `Para hidratacion, elige limpieza suave, balsamo nutritivo y formulas con cacao, miel o aloe. Evita sobre-limpiar porque puede debilitar la barrera de piel.${context}`;
  }
  if (query.includes("brillo") || query.includes("grasa")) {
    return `Para controlar brillo, usa limpieza equilibrante y texturas ligeras. No reseques demasiado la piel: eso puede causar mas produccion de grasa.${context}`;
  }
  if (query.includes("exfoliante")) return products.exfoliante + context;
  if (query.includes("jabon") || query.includes("jabón")) return products.jabon + context;
  if (query.includes("balsamo") || query.includes("labial")) return products.balsamo + context;
  if (query.includes("vela") || query.includes("aroma")) return products.vela + context;
  if (query.includes("cacao")) {
    return `El cacao funciona como ingrediente sensorial y protagonista en exfoliantes, jabones y balsamos. Para piel reactiva, combinalo con bases mas suaves y prueba poca cantidad primero.${context}`;
  }
  return `Puedo ayudarte con productos, tipo de piel, poros, textura, brillo, hidratacion o posibles reacciones. Para una recomendacion mas precisa, realiza el scanner con foto o camara.${context}`;
}

function addMessage(text, type) {
  const message = document.createElement("p");
  message.className = `message ${type}`;
  message.textContent = text;
  chatWindow.append(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendChat(text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  addMessage(cleanText, "user");
  chatInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(cleanText);
    addMessage(reply, "bot");
    saveRecord("chat", { question: cleanText, answer: reply });
    logActivity("Chat", cleanText);
  }, 360);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendChat(chatInput.value);
});

$$("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => sendChat(button.dataset.prompt));
});

updateFormula();
renderCart();
loadRuntimeConfig();
initStore().then(async (info) => {
  dbStatus.textContent = `Almacenamiento activo: ${info.backend}`;
  const savedCart = await listRecords("cart", 50);
  savedCart
    .filter((item) => item.quantity > 0)
    .forEach((item) => cart.set(item.name, item));
  renderCart();
  await refreshHistory();
});

clearData.addEventListener("click", async () => {
  await clearStore();
  cart.clear();
  renderCart();
  await refreshHistory();
  showToast("Datos locales limpiados");
});
