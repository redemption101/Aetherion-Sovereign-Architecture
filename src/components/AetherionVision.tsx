import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, Sparkles, User, Shield, Compass, Cpu, 
  Search, BrainCircuit, Image as ImageIcon, Music, 
  Play, Pause, Download, ExternalLink, HelpCircle, 
  CheckCircle2, RefreshCw, AlertCircle, Sparkle, Book, Code, Heart,
  Zap, Activity, Gauge, Coins, Scale, TrendingUp, Dna, Layers, Globe
} from "lucide-react";
import { CODEX_DICTIONARY, DictionaryEntry } from "../data/codexDictionary";
import CodexChapters7to15 from "./CodexChapters7to15";
import CodexChapters16to22 from "./CodexChapters16to22";

interface GroundingLink {
  uri: string;
  title: string;
}

const FOUNDER_PROFILES = {
  "Mandlenkosi Vundla": {
    name: "Mandlenkosi Vundla",
    role: "Sovereign Architect of Aetherion",
    contribution: "Foundational visionary and structural engineer of the Aetherion universe. He oversees overarching architecture, diverse domain integration, and independent runtime execution.",
    pillar: "Pillar: Structure, Resilience & Independence",
    themeColor: "indigo",
    iconName: "Shield",
  },
  "Theodore Swarts": {
    name: "Theodore Swarts",
    role: "Keeper of Codification",
    contribution: "Brilliant female co-founder who designs system-level syntax rules, keyword parameters, and translation trees, ensuring logic flows elegantly through physical processors.",
    pillar: "Pillar: Compiler Rules & Syntactic Law",
    themeColor: "amber",
    iconName: "Cpu",
  },
  "Sempi Mvala": {
    name: "Sempi Mvala",
    role: "Advisor of Harmony",
    contribution: "Female co-founder and ethical compass of Aetherion. She ensures compliance, balances social metrics, and heals software wounds through active feedback loops.",
    pillar: "Pillar: Balance, Healing & Ethical Sovereignty",
    themeColor: "emerald",
    iconName: "Compass",
  },
  "Mrs. Codex": {
    name: "Mrs. Codex",
    role: "Keeper of Linguistic Wisdom",
    contribution: "Legendary female co-founder who preserves grammatical meaning beyond mere instructions. She ensures that every symbol carries high-contrast spiritual depth.",
    pillar: "Pillar: Wisdom, High-Contrast Meaning & Law",
    themeColor: "fuchsia",
    iconName: "BookOpen",
  }
};

export function FounderTooltip({ name, children }: { name: keyof typeof FOUNDER_PROFILES; children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const profile = FOUNDER_PROFILES[name];

  if (!profile) {
    return <>{children || name}</>;
  }

  const themeMap = {
    indigo: {
      text: "text-indigo-400",
      bg: "bg-indigo-950/95",
      border: "border-indigo-500/40",
      accentBg: "bg-indigo-500/10",
      glow: "shadow-indigo-500/10",
      underline: "decoration-indigo-500/50",
    },
    amber: {
      text: "text-amber-400",
      bg: "bg-amber-950/95",
      border: "border-amber-500/40",
      accentBg: "bg-amber-500/10",
      glow: "shadow-amber-500/10",
      underline: "decoration-amber-500/50",
    },
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-950/95",
      border: "border-emerald-500/40",
      accentBg: "bg-emerald-500/10",
      glow: "shadow-emerald-500/10",
      underline: "decoration-emerald-500/50",
    },
    fuchsia: {
      text: "text-fuchsia-400",
      bg: "bg-fuchsia-950/95",
      border: "border-fuchsia-500/40",
      accentBg: "bg-fuchsia-500/10",
      glow: "shadow-fuchsia-500/10",
      underline: "decoration-fuchsia-500/50",
    }
  };

  const theme = themeMap[profile.themeColor as keyof typeof themeMap] || themeMap.indigo;

  const renderIcon = () => {
    switch (profile.iconName) {
      case "Shield": return <Shield className={`w-3.5 h-3.5 ${theme.text}`} />;
      case "Cpu": return <Cpu className={`w-3.5 h-3.5 ${theme.text}`} />;
      case "Compass": return <Compass className={`w-3.5 h-3.5 ${theme.text}`} />;
      case "BookOpen": return <BookOpen className={`w-3.5 h-3.5 ${theme.text}`} />;
      default: return <User className={`w-3.5 h-3.5 ${theme.text}`} />;
    }
  };

  return (
    <span 
      className="relative inline-block cursor-help z-50 group/tooltip"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={`underline decoration-dotted decoration-2 underline-offset-4 font-bold transition-all duration-300 ${theme.text} hover:opacity-85 inline-flex items-center gap-0.5`}>
        {children || name}
        <Sparkle className="w-2 h-2 opacity-50 group-hover/tooltip:opacity-100 transition-opacity animate-pulse text-indigo-400" />
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 rounded-xl border ${theme.bg} ${theme.border} text-slate-200 text-xs shadow-2xl pointer-events-none ${theme.glow} flex flex-col gap-2.5 z-[100]`}
            style={{ originX: 0.5, originY: 1 }}
          >
            {/* Header */}
            <span className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
              <span className={`w-7 h-7 rounded-full ${theme.accentBg} flex items-center justify-center border border-current/10`}>
                {renderIcon()}
              </span>
              <span className="flex flex-col text-left">
                <span className="font-bold text-white text-[13px]">{profile.name}</span>
                <span className={`text-[10px] font-mono font-medium leading-none mt-0.5 ${theme.text}`}>{profile.role}</span>
              </span>
            </span>

            {/* Contribution Body */}
            <span className="text-left leading-relaxed text-[11px] text-slate-300">
              {profile.contribution}
            </span>

            {/* Pillar Badge */}
            <span className="mt-1 pt-2 border-t border-slate-800/60 flex items-center gap-1.5 text-left">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="text-[9px] font-mono text-slate-400 font-semibold uppercase tracking-wider">{profile.pillar}</span>
            </span>

            {/* Tiny arrow */}
            <span className={`absolute top-full left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-t-8 ${
              profile.themeColor === "indigo" ? "border-t-indigo-950/95" : 
              profile.themeColor === "amber" ? "border-t-amber-950/95" : 
              profile.themeColor === "emerald" ? "border-t-emerald-950/95" : 
              "border-t-fuchsia-950/95"
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function AetherionVision() {
  const [activeAiTab, setActiveAiTab] = useState<"search" | "thinking" | "image" | "music">("search");

  // State for Search Grounding
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResponse, setSearchResponse] = useState("");
  const [searchLinks, setSearchLinks] = useState<GroundingLink[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // State for High Thinking
  const [thinkingPrompt, setThinkingPrompt] = useState("");
  const [thinkingResponse, setThinkingResponse] = useState("");
  const [thinkingLoading, setThinkingLoading] = useState(false);
  const [thinkingError, setThinkingError] = useState<string | null>(null);

  // State for Image Generation
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // State for Music Generation
  const [musicPrompt, setMusicPrompt] = useState("");
  const [isFullTrack, setIsFullTrack] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState("");
  const [generatedLyrics, setGeneratedLyrics] = useState("");
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicError, setMusicError] = useState<string | null>(null);
  
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // States for Codex Dictionary
  const [dictSearch, setDictSearch] = useState("");
  const [dictFilter, setDictFilter] = useState<"all" | "pillar" | "keyword">("all");
  const [selectedTerm, setSelectedTerm] = useState<DictionaryEntry | null>(CODEX_DICTIONARY[0]);

  // Codex Chapter States (Chapters 1 to 6)
  const [currentChapter, setCurrentChapter] = useState<number>(1);

  // Chapter 2 State (Pillar balancer)
  const [ch2Sovereignty, setCh2Sovereignty] = useState(85);
  const [ch2Resilience, setCh2Resilience] = useState(75);
  const [ch2Ethics, setCh2Ethics] = useState(90);
  const [ch2Integration, setCh2Integration] = useState(80);

  // Chapter 3 State (Samurai Cyber Defense)
  const [ch3ActiveAttack, setCh3ActiveAttack] = useState<string | null>(null);
  const [ch3DefenseLogs, setCh3DefenseLogs] = useState<string[]>([]);
  const [ch3IsDefending, setCh3IsDefending] = useState(false);

  // Chapter 4 State (Compiler Step Simulator)
  const [ch4Code, setCh4Code] = useState("actor QuantumSovereign {\n  sovereign quantum qubit q1;\n  hadamard q1;\n  heal q1;\n}");
  const [ch4Stage, setCh4Stage] = useState(0);

  // Chapter 5 State (BEAM-X scheduler / actors)
  const [ch5Actors, setCh5Actors] = useState([
    { id: "A-101", name: "SovereignGatekeeper", status: "active", reduction: 1420, memory: "42kb" },
    { id: "A-102", name: "QubitSuperposition", status: "active", reduction: 310, memory: "110kb" },
    { id: "A-103", name: "EthicsEnforcerNode", status: "active", reduction: 890, memory: "34kb" },
    { id: "A-104", name: "AetherHealingLoop", status: "idle", reduction: 50, memory: "12kb" },
  ]);
  const [ch5HealingProcess, setCh5HealingProcess] = useState(false);

  // Chapter 6 State (AetherDB Layer)
  const [ch6Query, setCh6Query] = useState("SELECT * FROM founders;");
  const [ch6Output, setCh6Output] = useState<any>(null);
  const [ch6IsExecuting, setCh6IsExecuting] = useState(false);

  // Chapter 7: Keywords State
  const [ch7SelectedKeyword, setCh7SelectedKeyword] = useState<string>("Actor");

  // Chapter 8: Operator State
  const [ch8SelectedOperator, setCh8SelectedOperator] = useState<string>("->");
  const [ch8QubitState, setCh8QubitState] = useState<{ theta: number; phi: number; superposition: boolean; entangled: boolean }>({ theta: 0, phi: 0, superposition: false, entangled: false });
  const [ch8StreamActive, setCh8StreamActive] = useState<boolean>(false);

  // Chapter 9: Program Structure State
  const [ch9ActiveGrammar, setCh9ActiveGrammar] = useState<string>("ActorDeclaration");

  // Chapter 10: Quantum computing State
  const [ch10QuantumActiveTab, setCh10QuantumActiveTab] = useState<string>("Mechanics");
  const [ch10TunnelProbability, setCh10TunnelProbability] = useState<number>(35);
  const [ch10Entangled, setCh10Entangled] = useState<boolean>(false);

  // Chapter 11: Scientific Computing State
  const [ch11ScientificActiveTab, setCh11ScientificActiveTab] = useState<string>("Physics");
  const [ch11DnaInput, setCh11DnaInput] = useState<string>("ATGCGATCGATCGATCGATCGATC");
  const [ch11CrisprResult, setCh11CrisprResult] = useState<string>("");

  // Chapter 12: Engineering State
  const [ch12EngineThrust, setCh12EngineThrust] = useState<number>(75);
  const [ch12PidSetpoint, setCh12PidSetpoint] = useState<number>(50);

  // Chapter 13: Business State
  const [ch13FinanceStockPrice, setCh13FinanceStockPrice] = useState<number>(100);
  const [ch13FinanceVolatility, setCh13FinanceVolatility] = useState<number>(25);

  // Chapter 14: Philosophy State
  const [ch14EthicalAction, setCh14EthicalAction] = useState<string>("Redistribute 90% of system royalties to Sparrow Rainbow Village.");
  const [ch14EthicalFramework, setCh14EthicalFramework] = useState<string>("Deontological");

  // Chapter 15: Earodynamics State
  const [ch15OscillatorType, setCh15OscillatorType] = useState<string>("sine");
  const [ch15Frequency, setCh15Frequency] = useState<number>(440);
  const [ch15SoundwaveActive, setCh15SoundwaveActive] = useState<boolean>(false);

  // Search Grounding logic
  const handleSearchGrounding = async () => {
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    setSearchError(null);
    setSearchResponse("");
    setSearchLinks([]);

    try {
      const res = await fetch("/api/ai/search-grounding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: searchQuery }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to query Search Grounding.");
      }

      const data = await res.json();
      setSearchResponse(data.text);
      setSearchLinks(data.groundingLinks || []);
    } catch (err: any) {
      console.error(err);
      setSearchError(err.message || "An unexpected error occurred during Search Grounding.");
    } finally {
      setSearchLoading(false);
    }
  };

  // High Thinking logic
  const handleHighThinking = async () => {
    if (!thinkingPrompt.trim()) return;
    setThinkingLoading(true);
    setThinkingError(null);
    setThinkingResponse("");

    try {
      const res = await fetch("/api/ai/high-thinking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: thinkingPrompt }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to execute High Thinking.");
      }

      const data = await res.json();
      setThinkingResponse(data.text);
    } catch (err: any) {
      console.error(err);
      setThinkingError(err.message || "An unexpected error occurred during High Thinking.");
    } finally {
      setThinkingLoading(false);
    }
  };

  // Image generation logic
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setImageLoading(true);
    setImageError(null);
    setGeneratedImageUrl("");

    try {
      const res = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt, size: imageSize }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate image.");
      }

      const data = await res.json();
      setGeneratedImageUrl(data.imageUrl);
    } catch (err: any) {
      console.error(err);
      setImageError(err.message || "An unexpected error occurred during image generation.");
    } finally {
      setImageLoading(false);
    }
  };

  // Music generation logic
  const handleGenerateMusic = async () => {
    if (!musicPrompt.trim()) return;
    setMusicLoading(true);
    setMusicError(null);
    setGeneratedAudioUrl("");
    setGeneratedLyrics("");
    setIsPlaying(false);

    try {
      const res = await fetch("/api/ai/generate-music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: musicPrompt, isFullLength: isFullTrack }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to compose music track.");
      }

      const data = await res.json();
      setGeneratedAudioUrl(data.audioUrl);
      setGeneratedLyrics(data.lyrics || "");
    } catch (err: any) {
      console.error(err);
      setMusicError(err.message || "An unexpected error occurred during music composition.");
    } finally {
      setMusicLoading(false);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Chapter 3: Samurai cyber defense simulations
  const handleTriggerAttack = (attackType: string) => {
    setCh3ActiveAttack(attackType);
    setCh3IsDefending(true);
    setCh3DefenseLogs([]);

    const actions = {
      ddos: [
        "⚠️ [ALERT] Severe Network Congestion detected on interface eno1. (140,000 req/sec)",
        "🛡️ Applying Sun Tzu directive: 'Know Yourself' - Assessing current bandwidth capabilities.",
        "💡 Activating Rectitude (Gi) filter: Verifying origin metadata against sovereign ethics whitelist.",
        "🗡️ Invoking Courage (Yuki) Countermeasure: Deploying rate-limiting container proxies.",
        "🌸 Executing Benevolence (Jin): Safely isolating non-malicious user sessions to secondary cluster.",
        "📜 Written to Immutable Ledger: Registered attack vector footprint in AetherDB signed tables.",
        "✅ [RESOLVED] Distributed threat neutralized. Bandwidth consumption returned to 1.2% capacity."
      ],
      privilege: [
        "⚠️ [ALERT] Unauthorized privilege escalation attempt on actor QubitSuperposition.",
        "🛡️ Sun Tzu principle invoked: 'Know Your Enemy' - Tracing path back to target key footprint.",
        "🔑 Activating Respect (Rei): Enforcing strict structural access levels on systemic state variables.",
        "🛡️ Applying Loyalty (Chugi): Shielding sensitive system threads from external process injection.",
        "🗡️ Invoking Courage (Yuki): Terminating session of culprit interface.",
        "📜 Written to Immutable Ledger: Signed intrusion audit record committed to blockchain node.",
        "✅ [RESOLVED] Privilege access key validated, source blacklisted and security bounds secured."
      ],
      exploit: [
        "⚠️ [ALERT] Exploit pattern detected in incoming code compilation request.",
        "🛡️ Sun Tzu: 'Victory Without Fighting' - Sandbox container quarantine automatically engaged.",
        "🔬 Enforcing Rectitude (Gi): Subjecting source code payload to Mrs. Codex semantic analysis.",
        "🌸 Enforcing Honor (Meiyo): Activating automated self-destruction protocol of temporary compile node.",
        "💡 Restoring normal service with pre-allocated redundant processing node.",
        "📜 Written to Immutable Ledger: Cryptographic digest of attack vector stored securely.",
        "✅ [RESOLVED] Malicious AST parsing attempt blocked. Zero-day payload neutralized safely."
      ]
    }[attackType] || [];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < actions.length) {
        setCh3DefenseLogs(prev => [...prev, actions[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setCh3IsDefending(false);
      }
    }, 1000);
  };

  // Chapter 5: Actor supervision simulator
  const handleSimulateCrash = () => {
    if (ch5HealingProcess) return;
    setCh5HealingProcess(true);

    // Set one actor as crashed
    setCh5Actors(prev => prev.map(a => a.id === "A-102" ? { ...a, status: "crashed", memory: "0kb" } : a));

    setTimeout(() => {
      // Activating healing loop
      setCh5Actors(prev => prev.map(a => a.id === "A-104" ? { ...a, status: "healing" } : a));
    }, 1200);

    setTimeout(() => {
      // Restore actor and return loop to idle
      setCh5Actors(prev => prev.map(a => {
        if (a.id === "A-102") return { ...a, status: "active", memory: "110kb" };
        if (a.id === "A-104") return { ...a, status: "idle" };
        return a;
      }));
      setCh5HealingProcess(false);
    }, 3200);
  };

  // Chapter 6: AetherDB Unified Console execution
  const handleExecuteQuery = () => {
    setCh6IsExecuting(true);
    
    setTimeout(() => {
      if (ch6Query.toLowerCase().includes("founders")) {
        setCh6Output({
          columns: ["id", "name", "role", "gender", "status", "signed_signature"],
          rows: [
            [1, "Mandlenkosi Vundla", "Sovereign Architect of Aetherion", "Male", "Active", "0x98A7B2..."],
            [2, "Theodore Swarts", "Mrs. Codex, Keeper of Codification", "Female", "Active", "0x34C81E..."],
            [3, "Sempi Mvala", "Co-Founder and Advisor of Harmony", "Female", "Active", "0x56F212..."]
          ],
          source: "ACID Relational Layer (PostgreSQL Metadata Module)",
          planning: [
            "1. Parsed SQL query string with Mrs. Codex parser logic.",
            "2. Determined target metadata table is cryptographically signed.",
            "3. Retrieved public-key verification of table state: VERIFIED SANE.",
            "4. Routed execution plan through Relational SQLite database layer."
          ]
        });
      } else if (ch6Query.toLowerCase().includes("sovereignty") || ch6Query.toLowerCase().includes("rules")) {
        setCh6Output({
          columns: ["rule_id", "scope", "isolation_level", "encryption_bit_depth"],
          rows: [
            ["R-10", "Thread Execution", "Hardware Sandbox", 4096],
            ["R-20", "Data Encryption", "Direct Sovereign Access Only", 2048],
            ["R-30", "Quantumsuperposition", "Multi-dimensional Entangled State", 4096]
          ],
          source: "Distributed CouchDB / Document Layer",
          planning: [
            "1. Evaluated query parameters for non-relational distributed stores.",
            "2. Scanned schema-free configuration clusters across virtual cores.",
            "3. Resolved state convergence using Conflict-Free Replicated Data Types (CRDTs)."
          ]
        });
      } else {
        setCh6Output({
          columns: ["error_code", "message", "suggestion"],
          rows: [
            ["DB_SYNTAX_WARN", "Query is valid but targeted table is not pre-cached in sovereign cache.", "Try running 'SELECT * FROM founders;' to verify Signed Sovereign Metadata."]
          ],
          source: "Mock Planner Interceptor",
          planning: ["1. Standard fallback bypass triggered."]
        });
      }
      setCh6IsExecuting(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      
      {/* SECTION 1: SOVEREIGN CODEX (CHAPTERS 1-6 EXPLORER) */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider font-mono">Book of Genesis: Chapters 1-22 Complete Edition</span>
              <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">The Sovereign Aetherion Codex</h1>
            </div>
          </div>

          {/* Chapters Sub-selector Tabs */}
          <div className="flex flex-wrap border border-slate-850 rounded-lg p-0.5 bg-slate-900/40 font-mono text-[10px] gap-0.5 max-w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((ch) => (
              <button
                key={ch}
                onClick={() => setCurrentChapter(ch)}
                className={`px-2 py-1 rounded transition-all whitespace-nowrap ${
                  currentChapter === ch
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                CH {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Chapter Contents */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* CHAPTER 1: THE VISION */}
            {currentChapter === 1 && (
              <div className="space-y-6">
                <div className="prose prose-invert max-w-none text-slate-300 space-y-4 leading-relaxed text-sm">
                  <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 1 Introduction</span>
                  <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-indigo-400 first-letter:float-left first-letter:mr-2">
                    Aetherion is not merely a programming language. It is a living organism, a sovereign entity, and a philosophical framework for building resilient, ethical, and transcendent systems. It represents the convergence of classical and quantum computing, the integration of scientific and philosophical domains, and the embodiment of ancient wisdom in modern technology.
                  </p>
                  <p>
                    The name <strong className="text-indigo-300">"Aetherion"</strong> derives from the ancient concept of aether — the fifth element, the substance that fills the universe beyond the terrestrial sphere. It represents the infinite, the transcendent, and the boundless potential of consciousness expressed through code.
                  </p>
                </div>

                {/* Sovereign Quad / Triad of Four Grid */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest font-mono mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                    The Sovereign Council: A Triad of Four
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* 1: Mandlenkosi Vundla */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/30 transition-all relative group flex flex-col justify-between">
                      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Shield className="w-8 h-8 text-indigo-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                            <User className="w-4 h-4 text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                              <FounderTooltip name="Mandlenkosi Vundla" />
                            </h4>
                            <span className="text-[9px] uppercase font-mono text-indigo-400 tracking-wider block">Sovereign Architect</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          Mandlenkosi serves as the foundational visionary, the structural engineer of the Aetherion universe. He oversees overarching architecture, diverse domain integration, and independent runtime execution.
                        </p>
                      </div>
                      <div className="border-t border-slate-800/80 pt-3 mt-auto">
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Pillar: Structure, Resilience & Independence
                        </span>
                      </div>
                    </div>

                    {/* 2: Theodore Swarts */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-amber-500/30 transition-all relative group flex flex-col justify-between">
                      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Cpu className="w-8 h-8 text-amber-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                            <User className="w-4 h-4 text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                              <FounderTooltip name="Theodore Swarts" />
                            </h4>
                            <span className="text-[9px] uppercase font-mono text-amber-400 tracking-wider block">Keeper of Codification</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          Theodore stands alone as the brilliant female co-founder who designs system-level syntax rules, keyword parameters, and translation trees, ensuring logic flows elegantly through physical processors.
                        </p>
                      </div>
                      <div className="border-t border-slate-800/80 pt-3 mt-auto">
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Pillar: Compiler Rules & Syntactic Law
                        </span>
                      </div>
                    </div>

                    {/* 3: Sempi Mvala */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-all relative group flex flex-col justify-between">
                      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Compass className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                            <User className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                              <FounderTooltip name="Sempi Mvala" />
                            </h4>
                            <span className="text-[9px] uppercase font-mono text-emerald-400 tracking-wider block">Advisor of Harmony</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          Sempi serves as the ethical compass and systemic integrator of Aetherion. As a female co-founder, she ensures compliance, balances social metrics, and heals software wounds.
                        </p>
                      </div>
                      <div className="border-t border-slate-800/80 pt-3 mt-auto">
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Pillar: Balance, Healing & Ethical Sovereignty
                        </span>
                      </div>
                    </div>

                    {/* 4: Mrs. Codex */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-fuchsia-500/30 transition-all relative group flex flex-col justify-between">
                      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen className="w-8 h-8 text-fuchsia-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center">
                            <User className="w-4 h-4 text-fuchsia-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-fuchsia-400 transition-colors">
                              <FounderTooltip name="Mrs. Codex" />
                            </h4>
                            <span className="text-[9px] uppercase font-mono text-fuchsia-400 tracking-wider block">Keeper of Linguistic Wisdom</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          Mrs. Codex stands alone as the legendary female co-founder who preserves grammatical meaning beyond mere instructions. She ensures that every symbol carries high-contrast spiritual depth.
                        </p>
                      </div>
                      <div className="border-t border-slate-800/80 pt-3 mt-auto">
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Pillar: Wisdom, High-Contrast Meaning & Law
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-indigo-950/80 bg-indigo-950/20 rounded-xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
                  <p id="aetherion-vision-names-container" className="text-xs text-slate-300 font-mono leading-relaxed">
                    Together, <FounderTooltip name="Mandlenkosi Vundla" /> and his three female companions — <FounderTooltip name="Theodore Swarts" />, <FounderTooltip name="Sempi Mvala" />, and <FounderTooltip name="Mrs. Codex" /> — form a powerful triad of four. This sovereign council's guidelines are encoded immutably in AetherDB.
                  </p>
                </div>
              </div>
            )}

            {/* CHAPTER 2: THE FOUR PILLARS */}
            {currentChapter === 2 && (
              <div className="space-y-6">
                <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
                  <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 2 Literature</span>
                  <h2 className="text-base font-bold text-white">Chapter 2: The Four Pillars of Aetherion Philosophy</h2>
                  <p>Every aspect of Aetherion is guided by four fundamental principles that shape its design, implementation, and purpose.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850">
                      <h4 className="font-bold text-indigo-400 flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4" /> Pillar One: Sovereignty
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Sovereignty in Aetherion means complete independence and self-determination. Programs written in Aetherion execute in contexts that are immune to external coercion, manipulation, or control.
                      </p>
                    </div>
                    <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850">
                      <h4 className="font-bold text-emerald-400 flex items-center gap-2 mb-1">
                        <RefreshCw className="w-4 h-4" /> Pillar Two: Resilience
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Resilience in Aetherion means self-healing, adaptive, and fault-tolerant systems that can withstand and recover from failures.
                      </p>
                    </div>
                    <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850">
                      <h4 className="font-bold text-fuchsia-400 flex items-center gap-2 mb-1">
                        <Heart className="w-4 h-4 text-fuchsia-400" /> Pillar Three: Ethics
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Ethics in Aetherion means unwavering commitment to serving humanity, protecting individuals, and advancing knowledge. Allocates 90% of rights to Sparrow Rainbow Village.
                      </p>
                    </div>
                    <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850">
                      <h4 className="font-bold text-amber-400 flex items-center gap-2 mb-1">
                        <Compass className="w-4 h-4" /> Pillar Four: Integration
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Integration in Aetherion means the seamless unification of diverse domains, paradigms, and wisdom traditions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chapter 2 Interactive Simulation */}
                <div className="bg-slate-900/20 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest font-bold">Pillar Interactive Harmony Balancer</span>
                    <span className="text-[9px] text-slate-500 font-mono">Simulating real-time optimization weights</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Sovereignty */}
                    <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-lg border border-slate-850">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-indigo-400">Sovereignty</span>
                        <span className="text-slate-300 font-bold">{ch2Sovereignty}%</span>
                      </div>
                      <input
                        type="range" min="10" max="100" value={ch2Sovereignty}
                        onChange={(e) => setCh2Sovereignty(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                      <span className="text-[9px] text-slate-500 font-mono block">Isolation: {ch2Sovereignty > 80 ? "Hardware Enclave" : "Soft Sandbox"}</span>
                    </div>

                    {/* Resilience */}
                    <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-lg border border-slate-850">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-emerald-400">Resilience</span>
                        <span className="text-slate-300 font-bold">{ch2Resilience}%</span>
                      </div>
                      <input
                        type="range" min="10" max="100" value={ch2Resilience}
                        onChange={(e) => setCh2Resilience(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                      <span className="text-[9px] text-slate-500 font-mono block">Healer: {ch2Resilience > 75 ? "Auto AI Active" : "Log Trigger Only"}</span>
                    </div>

                    {/* Ethics */}
                    <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-lg border border-slate-850">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-fuchsia-400">Ethics Index</span>
                        <span className="text-slate-300 font-bold">{ch2Ethics}%</span>
                      </div>
                      <input
                        type="range" min="10" max="100" value={ch2Ethics}
                        onChange={(e) => setCh2Ethics(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                      />
                      <span className="text-[9px] text-slate-500 font-mono block">Redistribution: {ch2Ethics > 80 ? "Sparrow Village 90%" : "Base Rate"}</span>
                    </div>

                    {/* Integration */}
                    <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-lg border border-slate-850">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-amber-400">Integration</span>
                        <span className="text-slate-300 font-bold">{ch2Integration}%</span>
                      </div>
                      <input
                        type="range" min="10" max="100" value={ch2Integration}
                        onChange={(e) => setCh2Integration(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                      <span className="text-[9px] text-slate-500 font-mono block">Circuits: {ch2Integration > 70 ? "Quantum-Classical Hybrid" : "Pure Classical"}</span>
                    </div>
                  </div>

                  {/* Harmony evaluation readout */}
                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-lg text-xs font-mono text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <p>
                      <strong>Harmony Balance Score:</strong> {Math.round((ch2Sovereignty + ch2Resilience + ch2Ethics + ch2Integration) / 4)}%. 
                      {ch2Ethics > 80 ? " Systems parameters comply with human advancement and Ubuntu directives." : " Adjust Ethics Index to ensure correct redistribution guarantees."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CHAPTER 3: CYBER DEFENSE */}
            {currentChapter === 3 && (
              <div className="space-y-6">
                <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
                  <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 3 Literature</span>
                  <h2 className="text-base font-bold text-white">Chapter 3: The Sun Tzu and Samurai Cyber Defense</h2>
                  <p>
                    Aetherion's security architecture draws heavily from Sun Tzu's "The Art of War" and the Samurai Bushido code, creating defense systems that are wise, courageous, and honorable.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-indigo-300">The Art of Cyber War (Sun Tzu)</h4>
                      <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-400">
                        <li><strong>"Know Yourself"</strong> — Self-Diagnosis and continuous vulnerability assessments.</li>
                        <li><strong>"Know Your Enemy"</strong> — AI-driven threat intelligence and zero-day detection.</li>
                        <li><strong>"Victory Without Fighting"</strong> — Deceptive honey-pots and secure encryption.</li>
                        <li><strong>"Invincibility Lies in Defense"</strong> — Defense-in-depth across 7 core hardware/software layers.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-300">The Samurai Code of Cyber Defense (Bushido)</h4>
                      <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-400">
                        <li><strong>Rectitude (Gi)</strong> — Proportional response matching moral principles.</li>
                        <li><strong>Courage (Yuki)</strong> — Active counter-attack isolation and neutralization.</li>
                        <li><strong>Loyalty (Chugi)</strong> — Guardianship of digital borders and immediate notifications.</li>
                        <li><strong>Honor (Meiyo)</strong> — Secure cryptographic self-destruct mechanisms to containment.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cyber War & Samurai Defense Simulator */}
                <div className="bg-slate-900/20 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Bushido Cyber Defense Sandbox</span>
                    <span className="text-[9px] text-slate-500 font-mono">Simulate a cyber security event</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTriggerAttack("ddos")}
                      disabled={ch3IsDefending}
                      className="flex-1 bg-red-950/40 hover:bg-red-900/20 border border-red-900/40 text-red-200 text-[10px] font-mono py-2 rounded-lg transition-colors"
                    >
                      Trigger Distributed DDoS
                    </button>
                    <button
                      onClick={() => handleTriggerAttack("privilege")}
                      disabled={ch3IsDefending}
                      className="flex-1 bg-red-950/40 hover:bg-red-900/20 border border-red-900/40 text-red-200 text-[10px] font-mono py-2 rounded-lg transition-colors"
                    >
                      Trigger Privilege Intrusion
                    </button>
                    <button
                      onClick={() => handleTriggerAttack("exploit")}
                      disabled={ch3IsDefending}
                      className="flex-1 bg-red-950/40 hover:bg-red-900/20 border border-red-900/40 text-red-200 text-[10px] font-mono py-2 rounded-lg transition-colors"
                    >
                      Trigger Malicious AST Exploit
                    </button>
                  </div>

                  {/* Defense Console logs */}
                  <div className="bg-slate-950 border border-slate-850 rounded-lg p-4 font-mono text-[11px] space-y-1 min-h-[140px] max-h-[180px] overflow-y-auto custom-scrollbar">
                    {ch3DefenseLogs.length === 0 ? (
                      <span className="text-slate-500 italic block text-center pt-8">Select an attack type above to trigger the Samurai Bushido defense algorithms.</span>
                    ) : (
                      ch3DefenseLogs.map((log, index) => (
                        <div key={index} className={log.startsWith("⚠️") ? "text-red-400 font-bold" : log.startsWith("✅") ? "text-emerald-400 font-bold" : "text-slate-300"}>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* CHAPTER 4: THE COMPILER PIPELINE */}
            {currentChapter === 4 && (
              <div className="space-y-6">
                <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
                  <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 4 Literature</span>
                  <h2 className="text-base font-bold text-white">Chapter 4: The Compiler Pipeline</h2>
                  <p>Aetherion's compiler transforms source code into executable programs through a sophisticated multi-stage pipeline, preserving philosophical and mathematical integrity at every level.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-[10px] font-mono">
                    {[
                      { s: 1, name: "1. Lexical Analysis", desc: "Tokenizes keywords, literals, and identifiers." },
                      { s: 2, name: "2. Parsing", desc: "Constructs the Abstract Syntax Tree (AST)." },
                      { s: 3, name: "3. Semantic", desc: "Type resolution, capability and ethics checks." },
                      { s: 4, name: "4. Verification", desc: "Ada/SPARK mathematical proof checks." },
                      { s: 5, name: "5. IR Transform", desc: "Optimizes representation for BEAM-X runtime." },
                      { s: 6, name: "6. Code Gen", desc: "Sovereign quantum bytecode generation." }
                    ].map((step) => (
                      <div
                        key={step.s}
                        onClick={() => setCh4Stage(step.s)}
                        className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                          ch4Stage === step.s 
                            ? "bg-indigo-600/10 border-indigo-500 text-indigo-300" 
                            : "bg-slate-900/40 border-slate-850 text-slate-400 hover:border-slate-800"
                        }`}
                      >
                        <span className="font-bold block text-white">{step.name}</span>
                        <span className="text-[8px] text-slate-500 leading-tight mt-1 block">{step.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chapter 4 Interactive Pipeline Simulator */}
                <div className="bg-slate-900/20 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Interactive Compiler Pipeline Explorer</span>
                    <span className="text-[9px] text-slate-500 font-mono">Press compiler stages above to inspect AST state</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-bold text-slate-500 font-mono block">Input Source (Aetherion Language)</span>
                      <textarea
                        value={ch4Code}
                        onChange={(e) => setCh4Code(e.target.value)}
                        className="w-full h-32 bg-slate-950 border border-slate-850 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>

                    <div className="bg-slate-950 border border-slate-850 rounded-lg p-4 flex flex-col justify-between min-h-[128px]">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-indigo-400 font-mono block mb-2">
                          Pipeline Stage Output: {
                            ch4Stage === 0 ? "Idle" :
                            ch4Stage === 1 ? "Lexer Token Stream" :
                            ch4Stage === 2 ? "AST Graph JSON" :
                            ch4Stage === 3 ? "Semantic Capabilities Map" :
                            ch4Stage === 4 ? "SPARK Formal Proof Results" :
                            ch4Stage === 5 ? "Intermediate Code representation" :
                            "Sovereign Bytecode (BEAM-X CJS)"
                          }
                        </span>

                        <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar max-h-24">
                          {
                            ch4Stage === 0 ? "Click any pipeline step above to compile and inspect the AST representation." :
                            ch4Stage === 1 ? `[\n  {type: "KEYWORD", val: "actor"},\n  {type: "IDENTIFIER", val: "QuantumSovereign"},\n  {type: "BRACE_OPEN", val: "{"},\n  {type: "KEYWORD", val: "sovereign"},\n  {type: "KEYWORD", val: "quantum"}\n]` :
                            ch4Stage === 2 ? `{\n  type: "ActorDeclaration",\n  id: "QuantumSovereign",\n  body: [\n    {type: "SovereignQuantumDeclaration", id: "q1"},\n    {type: "GateApplication", gate: "hadamard", target: "q1"}\n  ]\n}` :
                            ch4Stage === 3 ? `{\n  actor: "QuantumSovereign",\n  ethical_bounds: "VALID",\n  capabilities: ["ISOLATED_SANDBOX", "QUANTUM_SIMULATION"],\n  governance: "COMMUNAL_ROYALTY_90"\n}` :
                            ch4Stage === 4 ? `[FORMAL VERIFICATION SANE]\n- Theorem: No Race Conditions on q1 (PROVEN)\n- Theorem: Safe superpositions bounds (PROVEN)\n- Theorem: Safe automated self-healing execution loops (PROVEN)` :
                            ch4Stage === 5 ? `function_clause_start(QuantumSovereign);\nalloc_qubit_register(q1, complex(1.0, 0.0));\napply_hadamard(q1);\ncheck_telemetry_guards();` :
                            `{beam_x_instructions, [\n  {label, 1},\n  {func_info, {atom, quantum_sovereign}, {atom, main}, 0},\n  {allocate, 2, 0},\n  {init_quantum_state, {atom, q1}},\n  {apply_hadamard_unitary, {atom, q1}},\n  {deallocate, 2},\n  return\n]}.`
                          }
                        </pre>
                      </div>

                      <div className="border-t border-slate-850 pt-2.5 mt-2 flex items-center justify-between">
                        <span className="text-[8.5px] font-mono text-slate-500">Grammar compliance overseen by Theodore Swarts & Mrs. Codex.</span>
                        <button
                          onClick={() => setCh4Stage(1)}
                          className="bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-800/40 px-2.5 py-1 text-[9px] text-indigo-300 rounded font-mono transition-colors"
                        >
                          Compile Output
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CHAPTER 5: BEAM-X RUNTIME */}
            {currentChapter === 5 && (
              <div className="space-y-6">
                <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
                  <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 5 Literature</span>
                  <h2 className="text-base font-bold text-white">Chapter 5: The BEAM-X Runtime</h2>
                  <p>
                    The BEAM-X runtime is the isolated execution environment for Aetherion, extending the proven Erlang BEAM virtual machine with Rust/Pony safety guarantees and native AI-assisted healing mechanics.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-2">
                    <div className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-850">
                      <h4 className="font-bold text-indigo-400">Lightweight Scheduler</h4>
                      <p className="text-slate-400 text-xs mt-1">Preemptive, process-isolated concurrent scheduler. Supports millions of concurrent actors with fair reduction-budget allotment.</p>
                    </div>
                    <div className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-850">
                      <h4 className="font-bold text-emerald-400">Rust & Pony Safety</h4>
                      <p className="text-slate-400 text-xs mt-1">Ownership-borrow model with strict static thread-safety validation, eliminating runtime data-race conditions completely.</p>
                    </div>
                    <div className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-850">
                      <h4 className="font-bold text-amber-400">AI-Assisted Self-Healing</h4>
                      <p className="text-slate-400 text-xs mt-1">Real-time fault diagnostic loops matching supervision rules. Recovers, rolls back, or hot-patches failed processes dynamically.</p>
                    </div>
                  </div>
                </div>

                {/* Chapter 5 Interactive Process Dashboard */}
                <div className="bg-slate-900/20 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">BEAM-X Live Actor Dashboard</span>
                    <span className="text-[9px] text-slate-500 font-mono">Observe concurrent process list scheduler</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {ch5Actors.map((actor) => (
                      <div key={actor.id} className="bg-slate-950 border border-slate-850 p-3 rounded-lg relative overflow-hidden flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-mono text-indigo-400">{actor.id}</span>
                            <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                              actor.status === "active" ? "bg-emerald-950 text-emerald-400 border border-emerald-900/40" :
                              actor.status === "crashed" ? "bg-red-950 text-red-400 border border-red-900/40 animate-pulse" :
                              "bg-indigo-950 text-indigo-400 border border-indigo-900/40 animate-pulse"
                            }`}>
                              {actor.status}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-white block truncate">{actor.name}</span>
                        </div>

                        <div className="border-t border-slate-900 pt-2 mt-3 flex justify-between text-[9px] font-mono text-slate-500">
                          <span>Reductions: {actor.reduction}</span>
                          <span>Heap: {actor.memory}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={handleSimulateCrash}
                      disabled={ch5HealingProcess}
                      className="bg-red-600/10 hover:bg-red-600/20 border border-red-500/40 px-3 py-1.5 text-[10px] text-red-200 font-mono rounded transition-colors"
                    >
                      Simulate Process Crash
                    </button>
                    <button
                      onClick={handleSimulateCrash}
                      disabled={ch5HealingProcess}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 text-[10px] text-xs font-mono rounded transition-colors"
                    >
                      {ch5HealingProcess ? "Healer Active..." : "Run AI Telemetry Diagnostic"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CHAPTER 6: AETHERDB DATABASE */}
            {currentChapter === 6 && (
              <div className="space-y-6">
                <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
                  <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 6 Literature</span>
                  <h2 className="text-base font-bold text-white">Chapter 6: The AetherDB Database Layer</h2>
                  <p>
                    AetherDB is the unified database layer of Aetherion. It leverages a single, optimized query planner mapping to both PostgreSQL relational engines and distributed Cassandra/NoSQL engines, maintaining cryptographically signed metadata tables of founders.
                  </p>
                  
                  <div className="bg-slate-950 p-4 border border-slate-850 rounded-lg">
                    <span className="text-[9px] uppercase font-bold text-amber-400 font-mono block mb-2">Immutable Signed Sovereign Metadata Schema</span>
                    <pre className="text-[10px] text-slate-400 font-mono leading-relaxed overflow-x-auto">
{`-- Founders Table Verification Schema
CREATE TABLE founders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'Active',
  signature BYTEA NOT NULL -- Signed by Mandlenkosi Vundla private key
);`}
                    </pre>
                  </div>
                </div>

                {/* Chapter 6 Interactive SQL/NoSQL query terminal */}
                <div className="bg-slate-900/20 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">AetherDB Unified Console Planner</span>
                    <span className="text-[9px] text-slate-500 font-mono">Run signed queries against cache</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Console input */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 uppercase">Input SQL Query</span>
                      <input
                        type="text"
                        value={ch6Query}
                        onChange={(e) => setCh6Query(e.target.value)}
                        placeholder="SELECT * FROM founders;"
                        className="w-full bg-slate-950 text-xs font-mono text-slate-200 border border-slate-850 rounded-lg p-3.5 focus:outline-none focus:border-indigo-500"
                      />
                      <div className="flex flex-wrap gap-1">
                        <button
                          onClick={() => setCh6Query("SELECT * FROM founders;")}
                          className="bg-slate-900 hover:bg-slate-800 text-[9px] font-mono px-2 py-1 text-slate-400 rounded border border-slate-850"
                        >
                          Show Founders
                        </button>
                        <button
                          onClick={() => setCh6Query("SELECT * FROM sovereignty_rules;")}
                          className="bg-slate-900 hover:bg-slate-800 text-[9px] font-mono px-2 py-1 text-slate-400 rounded border border-slate-850"
                        >
                          Show Sovereignty Rules
                        </button>
                      </div>
                      <button
                        onClick={handleExecuteQuery}
                        disabled={ch6IsExecuting}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 text-xs font-mono font-bold rounded-lg transition-colors"
                      >
                        {ch6IsExecuting ? "Planning..." : "Execute Plan"}
                      </button>
                    </div>

                    {/* Console execution planner and results table */}
                    <div className="lg:col-span-2 space-y-3">
                      {ch6Output ? (
                        <div className="space-y-3">
                          {/* Query results table */}
                          <div className="bg-slate-950 border border-slate-850 rounded-lg p-3 overflow-x-auto custom-scrollbar">
                            <span className="text-[8px] uppercase font-bold text-slate-500 font-mono block mb-2">Query Output Table</span>
                            <table className="w-full text-[10px] font-mono text-left">
                              <thead>
                                <tr className="border-b border-slate-900 text-indigo-400">
                                  {ch6Output.columns.map((col: string) => (
                                    <th key={col} className="p-1.5 uppercase tracking-wider">{col}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {ch6Output.rows.map((row: any[], rIdx: number) => (
                                  <tr key={rIdx} className="border-b border-slate-950 hover:bg-slate-900/20">
                                    {row.map((val: any, cIdx: number) => {
                                      const isFounder = typeof val === "string" && val in FOUNDER_PROFILES;
                                      return (
                                        <td key={cIdx} className="p-1.5 text-slate-300 truncate max-w-[140px]">
                                          {isFounder ? (
                                            <FounderTooltip name={val as any}>{val}</FounderTooltip>
                                          ) : (
                                            val
                                          )}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Execution planner logic */}
                          <div className="bg-slate-950/50 border border-slate-900 p-3 rounded-lg text-[10px] font-mono text-slate-400 space-y-1">
                            <span className="text-[8px] uppercase font-bold text-emerald-400 block mb-1">Execution Planner details:</span>
                            <div>Active Node: <span className="text-white font-bold">{ch6Output.source}</span></div>
                            {ch6Output.planning.map((plan: string, idx: number) => (
                              <div key={idx}>&gt; {plan}</div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-950 border border-slate-850 rounded-lg p-8 text-center h-full flex flex-col justify-center text-slate-500 text-xs font-mono">
                          <span>Awaiting SQL execution parameters...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentChapter >= 7 && currentChapter <= 15 && (
              <CodexChapters7to15 currentChapter={currentChapter} />
            )}

            {currentChapter >= 16 && currentChapter <= 22 && (
              <CodexChapters16to22 currentChapter={currentChapter} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SECTION 2: AI COMMAND CENTER */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
          <div className="flex items-center gap-2.5">
            <Sparkle className="w-5 h-5 text-indigo-400 animate-pulse" />
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Sovereign AI Command Center</h2>
              <p className="text-[11px] text-slate-400 font-mono uppercase mt-0.5">Unified Aetherion Intelligence Engine</p>
            </div>
          </div>

          {/* Selector Tabs */}
          <div className="flex border border-slate-800 rounded-lg p-0.5 bg-slate-900/60 font-mono self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveAiTab("search")}
              className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeAiTab === "search"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Search Grounding
            </button>
            <button
              onClick={() => setActiveAiTab("thinking")}
              className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeAiTab === "thinking"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              High Thinking
            </button>
            <button
              onClick={() => setActiveAiTab("image")}
              className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeAiTab === "image"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Art Generator
            </button>
            <button
              onClick={() => setActiveAiTab("music")}
              className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeAiTab === "music"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              Harmonic Composer
            </button>
          </div>
        </div>

        {/* AI PANEL CONTENTS */}
        <div className="min-h-[250px]">
          
          {/* TAB 1: SEARCH GROUNDING */}
          {activeAiTab === "search" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-indigo-400" />
                  Real-time Google Grounded Search
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Query Gemini with live web-search search grounding. Perfect for looking up factual parameters, modern software standards, and real-time computing trends.
                </p>
              </div>

              <div className="flex gap-2.5">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchGrounding()}
                  placeholder="e.g., Explain the Ubuntu philosophy and recent technical updates..."
                  className="flex-1 bg-slate-950 text-xs text-slate-200 border border-slate-800 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-sans"
                />
                <button
                  onClick={handleSearchGrounding}
                  disabled={searchLoading || !searchQuery.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold px-4 rounded-lg flex items-center gap-1.5 disabled:opacity-40 transition-colors"
                >
                  {searchLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Search
                </button>
              </div>

              {searchError && (
                <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-xs text-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">Engine Communication Interrupt</span>
                    <span>{searchError}</span>
                  </div>
                </div>
              )}

              {searchResponse && (
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest font-mono">Grounded Response</span>
                    <p className="text-xs text-slate-200 mt-2 leading-relaxed whitespace-pre-wrap font-sans">
                      {searchResponse}
                    </p>
                  </div>

                  {searchLinks.length > 0 && (
                    <div className="border-t border-slate-800 pt-3">
                      <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest font-mono block mb-2">Google Grounding Sources:</span>
                      <div className="flex flex-wrap gap-2">
                        {searchLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded px-2.5 py-1 text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors font-mono"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {link.title || "Reference source"}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HIGH THINKING */}
          {activeAiTab === "thinking" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-amber-500" />
                  Premium Deep-Reasoning Engine (Thinking Level: HIGH)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Utilizes <strong>gemini-3.1-pro-preview</strong> in high reasoning mode. This is specifically tuned to analyze extremely complex logic puzzles, state-machine synchronization, deep technical architecture, and metaphysical philosophies.
                </p>
              </div>

              <div className="flex gap-2.5">
                <input
                  type="text"
                  value={thinkingPrompt}
                  onChange={(e) => setThinkingPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleHighThinking()}
                  placeholder="e.g., Resolve the balance between Erlang supervision trees and quantum state liveness..."
                  className="flex-1 bg-slate-950 text-xs text-slate-200 border border-slate-800 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-amber-500 font-sans"
                />
                <button
                  onClick={handleHighThinking}
                  disabled={thinkingLoading || !thinkingPrompt.trim()}
                  className="bg-amber-600 hover:bg-amber-500 text-zinc-950 text-xs font-mono font-bold px-4 rounded-lg flex items-center gap-1.5 disabled:opacity-40 transition-colors"
                >
                  {thinkingLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <BrainCircuit className="w-3.5 h-3.5" />}
                  Reason
                </button>
              </div>

              {thinkingError && (
                <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-xs text-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">Reasoning Core Fault</span>
                    <span>{thinkingError}</span>
                  </div>
                </div>
              )}

              {thinkingResponse && (
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest font-mono">High-Thinking Analysis</span>
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed whitespace-pre-wrap font-sans">
                    {thinkingResponse}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ART GENERATOR */}
          {activeAiTab === "image" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-indigo-400" />
                  Aetherion Art Forge (Gemini 3 Pro Image)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Synthesize high-fidelity, high-resolution visual designs of the sovereign computing nodes or architectural frameworks based on your prompts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-3">
                  <input
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="e.g., A golden sovereign computer circuit board, abstract typography, 3d render..."
                    className="w-full bg-slate-950 text-xs text-slate-200 border border-slate-800 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-sans"
                  />
                </div>
                <div>
                  <select
                    value={imageSize}
                    onChange={(e: any) => setImageSize(e.target.value)}
                    className="w-full bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-indigo-500 font-mono"
                  >
                    <option value="1K">1K Quality (1024px)</option>
                    <option value="2K">2K High-Def (2048px)</option>
                    <option value="4K">4K Ultra-Def (4096px)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateImage}
                disabled={imageLoading || !imagePrompt.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-40 transition-colors"
              >
                {imageLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Forge Sovereign Art
              </button>

              {imageError && (
                <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-xs text-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">Art Forge Aborted</span>
                    <span>{imageError}</span>
                  </div>
                </div>
              )}

              {generatedImageUrl && (
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 flex flex-col items-center gap-4">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest font-mono align-self-start">Forged Masterpiece ({imageSize})</span>
                  <div className="relative border border-slate-850 bg-slate-950 p-2 rounded-lg max-w-lg w-full">
                    <img 
                      src={generatedImageUrl} 
                      alt="Sovereign generated" 
                      className="rounded-lg shadow-lg w-full aspect-square object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <a
                    href={generatedImageUrl}
                    download="sovereign_forged_art.png"
                    className="bg-indigo-950 hover:bg-indigo-900 text-indigo-300 hover:text-white text-xs font-mono px-4 py-2 rounded border border-indigo-800/40 flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Render (PNG)
                  </a>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: HARMONIC COMPOSER */}
          {activeAiTab === "music" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-emerald-400" />
                  Aetherion Harmonic Composer (Lyria Music Engine)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Compose cinematic ambient sounds, technical drone patterns, or melodic movements. lyria models create real WAV audio files alongside metadata lyrics directly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-3">
                  <input
                    type="text"
                    value={musicPrompt}
                    onChange={(e) => setMusicPrompt(e.target.value)}
                    placeholder="e.g., A 30-second futuristic tech-ambient hum with soft digital ripples..."
                    className="w-full bg-slate-950 text-xs text-slate-200 border border-slate-800 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
                <div className="flex items-center justify-center bg-slate-900 border border-slate-850 px-3 py-2 rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFullTrack}
                      onChange={(e) => setIsFullTrack(e.target.checked)}
                      className="rounded border-slate-800 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider">Full Pro Track</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleGenerateMusic}
                disabled={musicLoading || !musicPrompt.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-mono font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-40 transition-colors"
              >
                {musicLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Music className="w-3.5 h-3.5" />}
                Compose Soundwave
              </button>

              {musicError && (
                <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-xs text-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">Composition Failed</span>
                    <span>{musicError}</span>
                  </div>
                </div>
              )}

              {generatedAudioUrl && (
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-center md:items-start gap-6">
                  
                  {/* Player Controls */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 w-48 shadow-lg">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative group">
                      <div className="absolute inset-2 rounded-full border border-emerald-500/30 animate-ping"></div>
                      <button
                        onClick={togglePlayback}
                        className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md z-10"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider font-mono">Lyria Playback</span>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.5">24kHz Audio Stream</p>
                    </div>

                    <audio
                      ref={audioRef}
                      src={generatedAudioUrl}
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />

                    <a
                      href={generatedAudioUrl}
                      download="lyria_composition.wav"
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded text-[10px] font-mono flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3 h-3" /> Download WAV
                    </a>
                  </div>

                  {/* Lyrics & Meta */}
                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-[10px] uppercase font-bold tracking-wider font-mono">Composition Complete</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono text-slate-500 tracking-wider">Generated Composition Lyrics / Notes:</span>
                      <div className="bg-slate-950 border border-slate-850 rounded-lg p-3.5 mt-1.5 text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                        {generatedLyrics || "This cinematic piece features harmonic synth resonances with zero lyrics. Ideal for a serene software-space backdrop."}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* SECTION 3: THE CODEX DICTIONARY PANEL */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-5 mb-6">
          <Book className="w-5 h-5 text-fuchsia-400" />
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">The Codex Dictionary</h2>
            <p className="text-[11px] text-slate-400 font-mono uppercase mt-0.5">Metaphysical Lexicon & Language Keywords</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List and search on the left */}
          <div className="space-y-4">
            {/* Search Input */}
            <input
              type="text"
              value={dictSearch}
              onChange={(e) => setDictSearch(e.target.value)}
              placeholder="Search terms..."
              className="w-full bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded-lg px-3.5 py-2 focus:outline-none focus:border-fuchsia-500 font-sans"
            />

            {/* Sub-tabs */}
            <div className="flex bg-slate-900/60 border border-slate-800/80 p-0.5 rounded-lg font-mono text-[10px]">
              <button
                onClick={() => setDictFilter("all")}
                className={`flex-1 py-1 px-2 rounded-md transition-colors text-center ${
                  dictFilter === "all" ? "bg-fuchsia-600/15 text-fuchsia-400 border border-fuchsia-800/20" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDictFilter("pillar")}
                className={`flex-1 py-1 px-2 rounded-md transition-colors text-center ${
                  dictFilter === "pillar" ? "bg-fuchsia-600/15 text-fuchsia-400 border border-fuchsia-800/20" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Pillars
              </button>
              <button
                onClick={() => setDictFilter("keyword")}
                className={`flex-1 py-1 px-2 rounded-md transition-colors text-center ${
                  dictFilter === "keyword" ? "bg-fuchsia-600/15 text-fuchsia-400 border border-fuchsia-800/20" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Keywords
              </button>
            </div>

            {/* Scroller list */}
            <div className="max-h-80 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
              {CODEX_DICTIONARY.filter((entry) => {
                const matchesSearch = entry.term.toLowerCase().includes(dictSearch.toLowerCase()) || 
                                     entry.philosophicalDef.toLowerCase().includes(dictSearch.toLowerCase()) ||
                                     entry.technicalDef.toLowerCase().includes(dictSearch.toLowerCase());
                const matchesFilter = dictFilter === "all" || entry.type === dictFilter;
                return matchesSearch && matchesFilter;
              }).map((entry) => (
                <button
                  key={entry.term}
                  onClick={() => setSelectedTerm(entry)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between border ${
                    selectedTerm?.term === entry.term
                      ? "bg-fuchsia-950/25 border-fuchsia-500/55 text-fuchsia-400"
                      : "bg-slate-900/30 border-slate-850/60 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <span>{entry.term}</span>
                  <span className={`text-[8px] uppercase px-1.5 py-0.5 rounded-full ${
                    entry.type === "pillar" 
                      ? "bg-indigo-950/60 text-indigo-400 border border-indigo-850" 
                      : "bg-amber-950/60 text-amber-400 border border-amber-850"
                  }`}>
                    {entry.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Inspector on the right */}
          <div className="lg:col-span-2 bg-slate-900/30 border border-slate-850 rounded-xl p-5 flex flex-col justify-between min-h-[300px]">
            {selectedTerm ? (
              <div className="space-y-5">
                {/* Inspector Header */}
                <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <Code className="w-4 h-4 text-fuchsia-400" />
                      {selectedTerm.term}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono block mt-1">
                      Definition Group: <span className="text-fuchsia-400 font-bold capitalize">{selectedTerm.type}</span>
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                    selectedTerm.type === "pillar"
                      ? "bg-indigo-950 text-indigo-400 border border-indigo-800/40"
                      : "bg-amber-950 text-amber-400 border border-amber-800/40"
                  }`}>
                    {selectedTerm.type === "pillar" ? "Sovereign Pillar" : "Language Keyword"}
                  </span>
                </div>

                {/* Philosophical Definition */}
                <div className="bg-slate-950 border border-slate-850 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute right-3 top-3 opacity-5">
                    <BookOpen className="w-12 h-12 text-slate-400" />
                  </div>
                  <span className="text-[9px] uppercase font-bold text-fuchsia-400 tracking-wider font-mono block mb-2">Philosophical Concept</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                    "{selectedTerm.philosophicalDef}"
                  </p>
                </div>

                {/* Technical Definition */}
                <div className="bg-slate-950/80 border border-slate-850 rounded-lg p-4">
                  <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-wider font-mono block mb-2">Technical Implementation</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {selectedTerm.technicalDef}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full text-slate-500 py-12">
                <HelpCircle className="w-10 h-10 text-slate-600 mb-3 animate-pulse" />
                <p className="text-xs font-mono">Select a lexicon term from the list to inspect its technical definitions.</p>
              </div>
            )}

            <div className="border-t border-slate-850 pt-4 mt-4 flex items-center gap-2 text-slate-400">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <p className="text-[10px] font-mono leading-normal">
                <strong>Sovereign Note:</strong> Hovering or selecting these terms inside the Compiler Workspace instantly displays their definitions inline!
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
