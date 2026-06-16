import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, FlaskConical, ShoppingBag, User,
  Camera, Upload, ChevronRight, Send, Plus, Minus,
  Star, Heart, ShoppingCart, ArrowLeft, Zap,
  Droplets, Sun, Shield, Leaf, MessageCircle,
  CheckCircle, Package, History, Settings,
  Sparkles
} from "lucide-react";

// {/* MARKER-MAKE-KIT-INVOKED */}

type Screen = "home" | "scanner" | "results" | "recommendations" | "chat" | "lab" | "store" | "profile";

const COCOA_SOAP_IMG = "https://images.unsplash.com/photo-1618840313409-66c0d92d6f26?w=400&h=400&fit=crop&auto=format";
const COCOA_SCRUB_IMG = "https://images.unsplash.com/photo-1614806687007-2215a9db3b1c?w=400&h=400&fit=crop&auto=format";
const COCOA_CHOC_IMG = "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=400&h=400&fit=crop&auto=format";
const CANDLE_IMG = "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop&auto=format";

interface NavItem {
  id: Screen;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: <Home size={20} />, label: "Inicio" },
  { id: "scanner", icon: <Camera size={20} />, label: "Scan" },
  { id: "lab", icon: <FlaskConical size={20} />, label: "Lab" },
  { id: "store", icon: <ShoppingBag size={20} />, label: "Tienda" },
  { id: "profile", icon: <User size={20} />, label: "Perfil" },
];

function BottomNav({ current, onNavigate }: { current: Screen; onNavigate: (s: Screen) => void }) {
  const mainScreens: Screen[] = ["home", "scanner", "lab", "store", "profile"];
  const activeNavItem = mainScreens.includes(current) ? current : "home";

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card border-t border-border flex items-center justify-around py-3 px-2 z-50"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {navItems.map((item) => {
        const isActive = activeNavItem === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}
          >
            <span className={`transition-all duration-200 ${isActive ? "scale-110" : ""}`}>{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="nav-dot"
                className="w-1 h-1 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

// ── SCREEN 1: HOME ────────────────────────────────────────────────────────
function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div
        className="px-6 pt-12 pb-6"
        style={{ background: "linear-gradient(160deg, #6B3A2A 0%, #8B5C3A 100%)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Leaf size={16} className="text-primary" />
              </div>
              <span
                className="text-amber-100 text-sm font-medium tracking-widest uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Makakao
              </span>
            </div>
            <h1
              className="text-amber-50 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 600 }}
            >
              Hola, Valentina
            </h1>
            <p className="text-amber-200 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Tu piel merece lo mejor del cacao
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-200 border-2 border-amber-100 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1614897920852-72084376cd9b?w=100&h=100&fit=crop&auto=format"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-amber-200 text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Último análisis
            </p>
            <p className="text-amber-50 font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Piel Normal · Score 82
            </p>
            <p className="text-amber-300 text-xs mt-0.5">Hace 3 días</p>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-amber-300 flex items-center justify-center bg-white/10">
            <span className="text-amber-50 font-bold text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              82
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-5 pb-24">
        <h2
          className="text-foreground mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px" }}
        >
          ¿Qué deseas hacer?
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { id: "scanner" as Screen, icon: <Camera size={24} />, label: "Escanear Piel", desc: "Análisis con IA", color: "#6B3A2A", bg: "#F5EBE3" },
            { id: "chat" as Screen, icon: <MessageCircle size={24} />, label: "Chat IA", desc: "Consulta experta", color: "#5C6B3A", bg: "#EDF0E5" },
            { id: "lab" as Screen, icon: <FlaskConical size={24} />, label: "Lab Digital", desc: "Crea tu producto", color: "#8B5C3A", bg: "#F5EDE3" },
            { id: "store" as Screen, icon: <ShoppingBag size={24} />, label: "Tienda", desc: "Productos naturales", color: "#4A5C30", bg: "#E8EDD8" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="rounded-2xl p-4 text-left transition-all duration-200 active:scale-95 hover:shadow-md"
              style={{ backgroundColor: item.bg }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: item.color + "20", color: item.color }}
              >
                {item.icon}
              </div>
              <p
                className="font-semibold text-sm"
                style={{ color: item.color, fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.label}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: item.color + "99", fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.desc}
              </p>
            </button>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px" }}
              className="text-foreground"
            >
              Productos destacados
            </h2>
            <button
              onClick={() => onNavigate("store")}
              className="text-xs text-primary flex items-center gap-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Ver todos <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {[
              { name: "Jabón de Cacao", price: "$12", img: COCOA_SOAP_IMG, rating: 4.9 },
              { name: "Scrub Exfoliante", price: "$18", img: COCOA_SCRUB_IMG, rating: 4.8 },
              { name: "Bálsamo Labial", price: "$8", img: CANDLE_IMG, rating: 4.7 },
            ].map((p) => (
              <div
                key={p.name}
                className="flex-shrink-0 w-36 bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
              >
                <div className="w-full h-28 bg-secondary overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2.5">
                  <p
                    className="text-xs font-semibold text-foreground leading-tight"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span
                      className="text-primary text-xs font-bold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {p.price}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Star size={9} fill="currentColor" className="text-amber-500" />
                      {p.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-4 flex gap-3"
          style={{ background: "linear-gradient(135deg, #5C6B3A15, #6B3A2A15)" }}
        >
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
            <Sparkles size={15} className="text-accent-foreground" />
          </div>
          <div>
            <p
              className="text-xs font-semibold text-foreground mb-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Consejo IA del día
            </p>
            <p
              className="text-xs text-muted-foreground leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              El cacao ecuatoriano tiene antioxidantes 3× más potentes que el cacao regular. Ideal para tu tipo de piel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 2: AI SKIN SCANNER ─────────────────────────────────────────────
function ScannerScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => onNavigate("results"), 400);
          return 100;
        }
        return p + 4;
      });
    }, 80);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-12 pb-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-muted-foreground mb-4"
        >
          <ArrowLeft size={18} />
          <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Inicio
          </span>
        </button>
        <h1
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600 }}
          className="text-foreground"
        >
          Escáner de Piel IA
        </h1>
        <p
          className="text-muted-foreground text-sm mt-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Análisis facial con inteligencia artificial
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div
          className="relative w-full aspect-square rounded-3xl overflow-hidden mb-5 border-2 border-primary/30"
          style={{ background: "linear-gradient(145deg, #2C1F14, #4A3020)" }}
        >
          {[
            ["top-3 left-3", "border-t-2 border-l-2"],
            ["top-3 right-3", "border-t-2 border-r-2"],
            ["bottom-3 left-3", "border-b-2 border-l-2"],
            ["bottom-3 right-3", "border-b-2 border-r-2"],
          ].map(([pos, border], i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6 ${border} border-amber-300 rounded-sm`} />
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-44 h-56 rounded-full border-2 border-dashed border-amber-400/50 flex items-center justify-center">
              {scanning ? (
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Sparkles size={36} className="text-amber-300 mx-auto mb-2" />
                  </motion.div>
                  <p
                    className="text-amber-200 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Analizando...
                  </p>
                </div>
              ) : (
                <Camera size={32} className="text-amber-400/60" />
              )}
            </div>
          </div>

          {scanning && (
            <motion.div
              className="absolute left-4 right-4 h-0.5 bg-amber-400/70"
              style={{ boxShadow: "0 0 8px #fbbf24" }}
              animate={{ top: ["15%", "85%", "15%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          )}

          {scanning && (
            <div className="absolute bottom-4 left-6 right-6">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.08 }}
                />
              </div>
              <p
                className="text-amber-300 text-xs text-center mt-1.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {progress}% — Procesando análisis
              </p>
            </div>
          )}

          {scanning && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 left-6 bg-black/50 rounded-lg px-2 py-1"
              >
                <p
                  className="text-amber-300 text-[10px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Zona T · Detectando
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-14 right-6 bg-black/50 rounded-lg px-2 py-1"
              >
                <p
                  className="text-amber-300 text-[10px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Textura · OK
                </p>
              </motion.div>
            </>
          )}
        </div>

        {!scanning && (
          <div className="bg-secondary rounded-2xl p-4 mb-5">
            <p
              className="text-xs font-semibold text-foreground mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Para mejores resultados:
            </p>
            {[
              "Buena iluminación natural",
              "Rostro limpio, sin maquillaje",
              "Mantén el teléfono estable",
            ].map((tip, i) => (
              <div key={i} className="flex items-center gap-2 mb-1.5">
                <CheckCircle size={13} className="text-accent flex-shrink-0" />
                <p
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tip}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-4 border-2 border-border bg-card text-foreground transition-all active:scale-95"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Upload size={18} />
            <span className="font-medium text-sm">Subir foto</span>
          </button>
          <button
            onClick={startScan}
            disabled={scanning}
            className="flex items-center justify-center gap-2 rounded-2xl py-4 px-6 text-primary-foreground font-semibold transition-all active:scale-95 disabled:opacity-70"
            style={{
              background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)",
              fontFamily: "'DM Sans', sans-serif",
              flex: 2,
            }}
          >
            <Zap size={18} />
            <span className="text-sm">{scanning ? "Escaneando..." : "Escanear Ahora"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 3: ANALYSIS RESULTS ────────────────────────────────────────────
function ResultsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-12 pb-4">
        <button
          onClick={() => onNavigate("scanner")}
          className="flex items-center gap-2 text-muted-foreground mb-4"
        >
          <ArrowLeft size={18} />
          <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Escáner
          </span>
        </button>
        <h1
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600 }}
          className="text-foreground"
        >
          Resultados del Análisis
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-28">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="58" fill="none" stroke="#EDE5DA" strokeWidth="10" />
              <circle
                cx="70" cy="70" r="58" fill="none" stroke="#6B3A2A" strokeWidth="10"
                strokeDasharray="364" strokeDashoffset="73" strokeLinecap="round"
                transform="rotate(-90 70 70)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                82
              </span>
              <span
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Score
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
            <CheckCircle size={16} className="text-primary" />
            <span
              className="text-primary text-sm font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Piel en buen estado
            </span>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Droplets size={18} className="text-primary" />
            </div>
            <div>
              <p
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Tipo de piel detectado
              </p>
              <p className="font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Normal-Combinada
              </p>
            </div>
          </div>
          <p
            className="text-xs text-muted-foreground leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Tu piel presenta características mixtas con tendencia grasa en la zona T y normal en mejillas.
            Ideal para rutinas equilibradas.
          </p>
        </div>

        <div className="space-y-3 mb-5">
          {[
            { label: "Nivel de sequedad", bar: 40, color: "#C4A98A", value: "Moderado", icon: <Sun size={16} /> },
            { label: "Nivel de grasa", bar: 28, color: "#8B5C3A", value: "Leve", icon: <Droplets size={16} /> },
            { label: "Sensibilidad", bar: 18, color: "#5C6B3A", value: "Baja", icon: <Shield size={16} /> },
            { label: "Luminosidad", bar: 72, color: "#A0845C", value: "Alta", icon: <Sparkles size={16} /> },
          ].map((m) => (
            <div key={m.label} className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: m.color }}>{m.icon}</span>
                  <span
                    className="text-sm font-medium text-foreground"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {m.label}
                  </span>
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: m.color, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {m.value}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.bar}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: m.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigate("recommendations")}
          className="w-full py-4 rounded-2xl text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <Leaf size={18} />
          Ver Recomendaciones
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── SCREEN 4: PERSONALIZED RECOMMENDATIONS ───────────────────────────────
function RecommendationsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [cart, setCart] = useState<string[]>([]);

  const products = [
    { id: "soap", name: "Jabón de Cacao", subtitle: "Limpieza profunda natural", price: 12, img: COCOA_SOAP_IMG, match: 98, tag: "Mejor opción" },
    { id: "scrub", name: "Scrub Exfoliante", subtitle: "Renueva tu piel semanalmente", price: 18, img: COCOA_SCRUB_IMG, match: 94, tag: "Recomendado" },
    { id: "balm", name: "Bálsamo Labial", subtitle: "Hidratación intensa con cacao", price: 8, img: CANDLE_IMG, match: 90, tag: "Popular" },
    { id: "candle", name: "Vela Aromática", subtitle: "Ritual de relajación con cacao", price: 22, img: COCOA_CHOC_IMG, match: 85, tag: "Nuevo" },
  ];

  const addToCart = (id: string) =>
    setCart((c) => (c.includes(id) ? c.filter((i) => i !== id) : [...c, id]));

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-12 pb-4">
        <button
          onClick={() => onNavigate("results")}
          className="flex items-center gap-2 text-muted-foreground mb-4"
        >
          <ArrowLeft size={18} />
          <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Resultados
          </span>
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600 }}
              className="text-foreground"
            >
              Recomendaciones
            </h1>
            <p
              className="text-muted-foreground text-sm mt-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Basadas en tu análisis de piel
            </p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => onNavigate("store")}
              className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-full px-3 py-2 text-xs font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <ShoppingCart size={13} /> {cart.length}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-28">
        <div className="bg-accent/20 rounded-2xl p-3 mb-5 flex items-center gap-3">
          <Sparkles size={18} className="text-accent" />
          <p className="text-sm text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="font-semibold">IA encontró 4 productos</span> con alto índice de
            compatibilidad para tu piel.
          </p>
        </div>

        <div className="space-y-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <div className="flex">
                <div className="w-32 h-32 flex-shrink-0 bg-secondary overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: "#6B3A2A20",
                        color: "#6B3A2A",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {p.tag}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span
                        className="text-[10px] text-accent font-semibold"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {p.match}%
                      </span>
                    </div>
                  </div>
                  <p
                    className="font-semibold text-foreground text-sm mt-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.name}
                  </p>
                  <p
                    className="text-xs text-muted-foreground mt-0.5 leading-tight"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.subtitle}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span
                      className="text-primary font-bold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ${p.price}
                    </span>
                    <button
                      onClick={() => addToCart(p.id)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${cart.includes(p.id) ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {cart.includes(p.id) ? (
                        <><CheckCircle size={12} /> Añadido</>
                      ) : (
                        <><Plus size={12} /> Agregar</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 5: AI CHAT ─────────────────────────────────────────────────────
interface Message {
  id: number;
  text: string;
  from: "user" | "ai";
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, text: "¡Hola! Soy tu asistente de skincare con cacao ecuatoriano. ¿En qué puedo ayudarte hoy?", from: "ai", time: "09:00" },
  { id: 2, text: "¿Qué producto recomiendas para piel combinada?", from: "user", time: "09:01" },
  { id: 3, text: "Para piel combinada, el Jabón de Cacao Makakao es perfecto. Equilibra la zona T sin resecar las mejillas. ¿Quieres saber más sobre sus ingredientes?", from: "ai", time: "09:01" },
];

function ChatScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const aiReplies = [
    "El cacao ecuatoriano es rico en flavonoides que protegen contra el daño oxidativo. ¡Una maravilla natural!",
    "Te recomiendo usar el Scrub Exfoliante 2 veces por semana para renovar las células de tu piel.",
    "El Bálsamo Labial con manteca de cacao hidrata profundamente. Ideal para aplicar antes de dormir.",
    "Nuestra fórmula combina cacao fino de aroma del Ecuador con ingredientes botánicos de la región amazónica.",
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const userMsg: Message = { id: Date.now(), text: input, from: "user", time };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        text: aiReplies[Math.floor(Math.random() * aiReplies.length)],
        from: "ai",
        time,
      };
      setMessages((m) => [...m, aiMsg]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-12 pb-4 border-b border-border">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-muted-foreground mb-4"
        >
          <ArrowLeft size={18} />
          <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Inicio
          </span>
        </button>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)" }}
          >
            <Sparkles size={18} className="text-amber-100" />
          </div>
          <div>
            <h2
              className="font-semibold text-foreground"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Asistente Makakao IA
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                En línea
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ paddingBottom: "140px" }}>
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} gap-2`}
          >
            {m.from === "ai" && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-auto"
                style={{ background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)" }}
              >
                <Sparkles size={14} className="text-amber-100" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${m.from === "user"
                ? "text-primary-foreground rounded-br-sm"
                : "bg-card border border-border text-foreground rounded-bl-sm"}`}
              style={
                m.from === "user"
                  ? { background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)" }
                  : {}
              }
            >
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {m.text}
              </p>
              <p
                className={`text-[10px] mt-1 ${m.from === "user" ? "text-amber-200" : "text-muted-foreground"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {m.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-16 left-0 right-0 px-4 pb-2">
        <div
          className="flex gap-2 mb-2 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {["Ingredientes naturales", "Rutina de noche", "Para piel sensible"].map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="flex-shrink-0 text-xs rounded-full px-3 py-1.5 border border-primary/30 text-primary bg-primary/5 transition-all active:scale-95"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center bg-card border border-border rounded-2xl px-4 py-2">
          <input
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="Pregunta sobre tu piel..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          <button
            onClick={sendMessage}
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)" }}
          >
            <Send size={14} className="text-amber-100" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 6: DIGITAL LAB ─────────────────────────────────────────────────
function LabScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [productType, setProductType] = useState("Jabón");
  const [ingredients, setIngredients] = useState<string[]>(["Manteca de Cacao"]);
  const [aroma, setAroma] = useState("Vainilla");
  const [benefit, setBenefit] = useState("Hidratación");
  const [created, setCreated] = useState(false);

  const productTypes = ["Jabón", "Scrub", "Crema", "Sérum", "Vela"];
  const allIngredients = ["Manteca de Cacao", "Aceite de Coco", "Vitamina E", "Aloe Vera", "Cera de Abejas", "Arcilla Blanca"];
  const aromas = ["Vainilla", "Jazmín", "Cedro", "Naranja", "Lavanda", "Cacao Puro"];
  const benefits = ["Hidratación", "Anti-edad", "Aclarante", "Exfoliante", "Calmante", "Nutritivo"];

  const toggleIngredient = (i: string) =>
    setIngredients((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-12 pb-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-muted-foreground mb-4"
        >
          <ArrowLeft size={18} />
          <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Inicio
          </span>
        </button>
        <h1
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600 }}
          className="text-foreground"
        >
          Lab Digital
        </h1>
        <p
          className="text-muted-foreground text-sm mt-0.5"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Crea tu producto personalizado de cacao
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-28 space-y-4">
        <div
          className="rounded-2xl p-5 flex flex-col items-center"
          style={{ background: "linear-gradient(145deg, #6B3A2A, #4A2518)" }}
        >
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-24 h-24 rounded-2xl bg-amber-100/20 border border-amber-300/30 flex items-center justify-center mb-3"
          >
            <FlaskConical size={40} className="text-amber-200" />
          </motion.div>
          <p
            className="text-amber-100 font-semibold text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {productType} Makakao
          </p>
          <p
            className="text-amber-300 text-xs mt-1 text-center"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {ingredients.slice(0, 2).join(" · ")} · {aroma} · {benefit}
          </p>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <p
            className="text-sm font-semibold text-foreground mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Tipo de producto
          </p>
          <div className="flex flex-wrap gap-2">
            {productTypes.map((t) => (
              <button
                key={t}
                onClick={() => setProductType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${productType === t ? "text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                style={
                  productType === t
                    ? { background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)", fontFamily: "'DM Sans', sans-serif" }
                    : { fontFamily: "'DM Sans', sans-serif" }
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <p
            className="text-sm font-semibold text-foreground mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ingredientes
          </p>
          <div className="flex flex-wrap gap-2">
            {allIngredients.map((i) => (
              <button
                key={i}
                onClick={() => toggleIngredient(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${ingredients.includes(i)
                  ? "bg-accent/20 text-accent border-accent/40"
                  : "bg-secondary text-muted-foreground border-transparent"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {ingredients.includes(i) && <CheckCircle size={11} />}
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <p
            className="text-sm font-semibold text-foreground mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Aroma
          </p>
          <div className="flex flex-wrap gap-2">
            {aromas.map((a) => (
              <button
                key={a}
                onClick={() => setAroma(a)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${aroma === a ? "text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                style={
                  aroma === a
                    ? { background: "#5C6B3A", fontFamily: "'DM Sans', sans-serif" }
                    : { fontFamily: "'DM Sans', sans-serif" }
                }
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <p
            className="text-sm font-semibold text-foreground mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Beneficio principal
          </p>
          <div className="flex flex-wrap gap-2">
            {benefits.map((b) => (
              <button
                key={b}
                onClick={() => setBenefit(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${benefit === b ? "text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                style={
                  benefit === b
                    ? { background: "#8B5C3A", fontFamily: "'DM Sans', sans-serif" }
                    : { fontFamily: "'DM Sans', sans-serif" }
                }
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {!created ? (
          <button
            onClick={() => setCreated(true)}
            className="w-full py-4 rounded-2xl text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Sparkles size={18} />
            Crear Producto
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #5C6B3A20, #6B3A2A20)" }}
          >
            <CheckCircle size={24} className="text-accent" />
            <div>
              <p
                className="font-semibold text-foreground text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                ¡Producto creado!
              </p>
              <p
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Tu fórmula personalizada está lista para ordenar.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── SCREEN 7: STORE ───────────────────────────────────────────────────────
function StoreScreen({ onNavigate: _onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [category, setCategory] = useState("Todos");

  const categories = ["Todos", "Jabones", "Scrubs", "Labiales", "Velas"];
  const products = [
    { id: "s1", name: "Jabón de Cacao Premium", price: 12, img: COCOA_SOAP_IMG, rating: 4.9, reviews: 128, cat: "Jabones" },
    { id: "s2", name: "Scrub Exfoliante Natural", price: 18, img: COCOA_SCRUB_IMG, rating: 4.8, reviews: 95, cat: "Scrubs" },
    { id: "s3", name: "Bálsamo Labial de Cacao", price: 8, img: CANDLE_IMG, rating: 4.7, reviews: 214, cat: "Labiales" },
    { id: "s4", name: "Vela Aromática Cacao", price: 22, img: COCOA_CHOC_IMG, rating: 4.9, reviews: 67, cat: "Velas" },
    { id: "s5", name: "Jabón Cacao & Miel", price: 14, img: COCOA_SOAP_IMG, rating: 4.6, reviews: 83, cat: "Jabones" },
    { id: "s6", name: "Crema Hidratante Cacao", price: 28, img: COCOA_SCRUB_IMG, rating: 4.9, reviews: 156, cat: "Todos" },
  ];

  const filtered = category === "Todos" ? products : products.filter((p) => p.cat === category);
  const totalCart = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cartItems).reduce((acc, [id, qty]) => {
    const p = products.find((x) => x.id === id);
    return acc + (p ? p.price * qty : 0);
  }, 0);

  const updateCart = (id: string, delta: number) => {
    setCartItems((c) => {
      const newVal = (c[id] || 0) + delta;
      if (newVal <= 0) {
        const next = { ...c };
        delete next[id];
        return next;
      }
      return { ...c, [id]: newVal };
    });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h1
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600 }}
            className="text-foreground"
          >
            Tienda
          </h1>
          {totalCart > 0 && (
            <div className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5">
              <ShoppingCart size={14} className="text-primary" />
              <span
                className="text-primary text-xs font-bold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {totalCart} · ${totalPrice}
              </span>
            </div>
          )}
        </div>
        <p
          className="text-muted-foreground text-sm"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Productos naturales de cacao ecuatoriano
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        <div
          className="flex gap-2 px-6 mb-4 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${category === c ? "text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
              style={
                category === c
                  ? { background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)", fontFamily: "'DM Sans', sans-serif" }
                  : { fontFamily: "'DM Sans', sans-serif" }
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mx-6 mb-4 rounded-2xl overflow-hidden relative h-28">
          <img src={COCOA_CHOC_IMG} alt="Featured" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(107,58,42,0.85) 0%, transparent 70%)" }}
          />
          <div className="absolute inset-0 flex flex-col justify-center pl-4">
            <p
              className="text-amber-100 text-xs font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Oferta especial
            </p>
            <p
              className="text-white font-semibold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px" }}
            >
              20% en tu primer pedido
            </p>
            <p
              className="text-amber-200 text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Código: MAKAKAO20
            </p>
          </div>
        </div>

        <div className="px-6 grid grid-cols-2 gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="w-full h-36 bg-secondary overflow-hidden relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
                  <Heart size={13} className="text-primary" />
                </button>
              </div>
              <div className="p-3">
                <p
                  className="text-xs font-semibold text-foreground leading-tight mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {p.name}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={10} fill="#f59e0b" className="text-amber-400" />
                  <span
                    className="text-[10px] text-muted-foreground"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.rating} ({p.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-primary font-bold text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    ${p.price}
                  </span>
                  {cartItems[p.id] ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateCart(p.id, -1)}
                        className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center"
                      >
                        <Minus size={10} className="text-foreground" />
                      </button>
                      <span
                        className="text-xs font-bold text-foreground w-4 text-center"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {cartItems[p.id]}
                      </span>
                      <button
                        onClick={() => updateCart(p.id, 1)}
                        className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center"
                      >
                        <Plus size={10} className="text-primary-foreground" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateCart(p.id, 1)}
                      className="w-7 h-7 rounded-xl flex items-center justify-center text-primary-foreground transition-all active:scale-95"
                      style={{ background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)" }}
                    >
                      <Plus size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalCart > 0 && (
          <div className="px-6 mt-4">
            <button
              className="w-full py-4 rounded-2xl text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #6B3A2A, #8B5C3A)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <ShoppingCart size={18} />
              Proceder al Pago · ${totalPrice}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SCREEN 8: USER PROFILE ────────────────────────────────────────────────
function ProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const analyses = [
    { date: "08 Jun 2026", type: "Normal-Combinada", score: 82 },
    { date: "25 May 2026", type: "Piel Sensible", score: 74 },
    { date: "10 May 2026", type: "Normal-Combinada", score: 78 },
  ];
  const favorites = [
    { name: "Jabón de Cacao", img: COCOA_SOAP_IMG },
    { name: "Scrub Natural", img: COCOA_SCRUB_IMG },
    { name: "Bálsamo Labial", img: CANDLE_IMG },
  ];
  const orders = [
    { id: "#MK-2041", date: "05 Jun 2026", status: "Entregado", total: 38 },
    { id: "#MK-1987", date: "22 May 2026", status: "En camino", total: 22 },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div
        className="px-6 pt-12 pb-6"
        style={{ background: "linear-gradient(160deg, #6B3A2A 0%, #8B5C3A 100%)" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-amber-200 border-2 border-amber-200">
            <img
              src="https://images.unsplash.com/photo-1614897920852-72084376cd9b?w=100&h=100&fit=crop&auto=format"
              alt="Valentina"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2
              className="text-amber-50 font-semibold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px" }}
            >
              Valentina Torres
            </h2>
            <p
              className="text-amber-200 text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              valentina@makakao.ec
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Leaf size={11} className="text-amber-300" />
              <span
                className="text-amber-300 text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Miembro Premium
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[["3", "Análisis"], ["5", "Productos"], ["2", "Pedidos"]].map(([num, label]) => (
            <div key={label} className="bg-white/15 rounded-xl py-2 px-3 text-center">
              <p
                className="text-amber-50 font-bold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {num}
              </p>
              <p
                className="text-amber-200 text-[10px]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-5 pb-24 space-y-4">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <History size={16} className="text-primary" />
            <p
              className="font-semibold text-sm text-foreground"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Análisis anteriores
            </p>
          </div>
          {analyses.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0"
            >
              <div>
                <p
                  className="text-sm font-medium text-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {a.type}
                </p>
                <p
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {a.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-primary/30 flex items-center justify-center">
                  <span
                    className="text-xs font-bold text-primary"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {a.score}
                  </span>
                </div>
                <button onClick={() => onNavigate("results")}>
                  <ChevronRight size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Heart size={16} className="text-primary" />
            <p
              className="font-semibold text-sm text-foreground"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Productos favoritos
            </p>
          </div>
          <div className="flex gap-3 px-4 py-3">
            {favorites.map((f) => (
              <div key={f.name} className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                </div>
                <p
                  className="text-[10px] text-center text-muted-foreground leading-tight w-14"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {f.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Package size={16} className="text-primary" />
            <p
              className="font-semibold text-sm text-foreground"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Historial de pedidos
            </p>
          </div>
          {orders.map((o, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0"
            >
              <div>
                <p
                  className="text-sm font-medium text-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {o.id}
                </p>
                <p
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {o.date}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${o.status === "Entregado" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {o.status}
                </span>
                <p
                  className="text-xs text-muted-foreground mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  ${o.total}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Settings size={16} className="text-primary" />
            <p
              className="font-semibold text-sm text-foreground"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Configuración
            </p>
          </div>
          {["Notificaciones", "Privacidad de datos", "Idioma: Español", "Cerrar sesión"].map(
            (item, i) => (
              <button
                key={i}
                className={`w-full flex items-center justify-between px-4 py-3 border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${item === "Cerrar sesión" ? "text-destructive" : "text-foreground"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className="text-sm">{item}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const screens: Record<Screen, React.ReactNode> = {
    home: <HomeScreen onNavigate={setScreen} />,
    scanner: <ScannerScreen onNavigate={setScreen} />,
    results: <ResultsScreen onNavigate={setScreen} />,
    recommendations: <RecommendationsScreen onNavigate={setScreen} />,
    chat: <ChatScreen onNavigate={setScreen} />,
    lab: <LabScreen onNavigate={setScreen} />,
    store: <StoreScreen onNavigate={setScreen} />,
    profile: <ProfileScreen onNavigate={setScreen} />,
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "linear-gradient(135deg, #D4C5B0 0%, #B8A898 100%)" }}
    >
      {/* Phone frame */}
      <div className="relative w-full max-w-sm bg-background shadow-2xl"
        style={{
          height: "844px",
          borderRadius: "44px",
          overflow: "hidden",
          border: "6px solid #2C1F14",
          boxShadow: "0 40px 80px rgba(44,31,20,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
        }}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-2xl z-50"
          style={{ background: "#2C1F14" }} />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-8 z-40">
          <span
            className="text-[11px] font-semibold text-foreground/60"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            9:41
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-2.5 border border-foreground/40 rounded-sm relative">
              <div
                className="absolute inset-0.5 bg-foreground/50 rounded-sm"
                style={{ width: "75%" }}
              />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full h-full"
            >
              {screens[screen]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <BottomNav current={screen} onNavigate={setScreen} />
      </div>
    </div>
  );
}
