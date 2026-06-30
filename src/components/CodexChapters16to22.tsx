import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, Compass, Cpu, Search, BrainCircuit, Play, Pause, 
  RefreshCw, CheckCircle2, AlertCircle, Sparkle, Code, BookOpen, Heart,
  Zap, ChevronRight, Activity, Thermometer, FlaskConical, Dna, Gauge,
  TrendingUp, CircleDollarSign, Scale, Music, Waves, HelpCircle,
  Terminal, Globe, Book, Award, AlertTriangle, Eye, ShieldCheck, FileText, Settings, UserCheck
} from "lucide-react";
import { FounderTooltip } from "./AetherionVision";

interface Chapters16to22Props {
  currentChapter: number;
}

export default function CodexChapters16to22({ currentChapter }: Chapters16to22Props) {
  // CHAPTER 16: SELF-HEALING STATE
  const [healingStep, setHealingStep] = useState<"idle" | "detecting" | "diagnosing" | "repairing" | "verifying" | "recovered">("idle");
  const [healingLogs, setHealingLogs] = useState<string[]>([]);
  const [activeOtt, setActiveOtt] = useState<"quantum" | "ai" | "realtime">("quantum");
  const [isOttSimulating, setIsOttSimulating] = useState(false);
  const [ottData, setOttData] = useState<string[]>([]);

  // CHAPTER 17: ETHICAL FRAMEWORK STATE
  const [ethicFilter, setEthicFilter] = useState<"permitted" | "prohibited">("permitted");
  const [licenseComplianceScore, setLicenseComplianceScore] = useState(100);
  const [complianceLogs, setComplianceLogs] = useState<string[]>([
    "🟢 System verification successful: 100% compliance with Sovereign License.",
    "🔒 Verified Sparrow Rainbow Village 90% rights lock signature.",
    "🛡️ Military signature scan: Zero weaponized code detected."
  ]);

  // CHAPTER 18: GOVERNANCE STATE
  const [proposalText, setProposalText] = useState("Introduce quantum-resistant cryptographic hashing to core stdlib.");
  const [proposalStatus, setProposalStatus] = useState<"draft" | "deliberating" | "consensus" | "enacted">("draft");
  const [councilVotes, setCouncilVotes] = useState({
    mandlenkosi: "Pending",
    theodore: "Pending",
    sempi: "Pending",
    mrsCodex: "Pending"
  });

  // CHAPTER 19: TOOLCHAIN STATE
  const [selectedTool, setSelectedTool] = useState<"aetherc" | "aetherrun" | "aetherpkg" | "aetherq" | "aetherscience" | "aethereng" | "aetherbus" | "aetherphi" | "aetherheal" | "aetherdefend">("aetherc");
  const [toolchainConsole, setToolchainConsole] = useState<string[]>([]);
  const [toolCommandOpts, setToolCommandOpts] = useState("--verbose");

  // CHAPTER 20: INTEGRATION STATE
  const [selectedLang, setSelectedLang] = useState<"julia" | "fortran" | "matlab" | "python" | "r">("julia");
  const [integrationConsole, setIntegrationConsole] = useState<string[]>([]);

  // CHAPTER 21: DEVELOPMENT PHASES STATE
  const [selectedPhase, setSelectedPhase] = useState<number>(9);

  // CHAPTER 22 / APPENDICES STATE
  const [activeAppendix, setActiveAppendix] = useState<"ref" | "examples" | "license">("ref");
  const [activeExample, setActiveExample] = useState<"hello" | "healing" | "circuit">("hello");
  const [exampleOutput, setExampleOutput] = useState<string[]>([]);
  const [isExampleRunning, setIsExampleRunning] = useState(false);
  const [appendixSearch, setAppendixSearch] = useState("");

  // TIMERS FOR CHAP 16 HEALING SIMULATION
  const handleTriggerHeal = () => {
    if (healingStep !== "idle") return;
    
    setHealingStep("detecting");
    setHealingLogs(["[MONITOR] Starting diagnostic sweep across active sovereign enclaves..."]);

    setTimeout(() => {
      setHealingStep("diagnosing");
      setHealingLogs(prev => [
        ...prev,
        "[DETECTION] ⚠️ Anomaly identified in Thread 0x8BF4: High error degradation on memory context boundary.",
        "[DIAGNOSIS] Analysis complete: Recurrent state fragmentation detected (priority: HIGH)."
      ]);
    }, 1500);

    setTimeout(() => {
      setHealingStep("repairing");
      setHealingLogs(prev => [
        ...prev,
        "[REPAIR] Initiating heal script resilient_system...",
        "[REPAIR] Executing 'automatic_rollback: previous_stable'...",
        "[REPAIR] Injecting hot_patch: memory_boundary_refactor...",
        "[REPAIR] Resource reallocation triggered to avoid thread choke."
      ]);
    }, 3500);

    setTimeout(() => {
      setHealingStep("verifying");
      setHealingLogs(prev => [
        ...prev,
        "[VERIFICATION] System integrity checks initiated.",
        "[VERIFICATION] Testing memory consistency... ✅ PASSED",
        "[VERIFICATION] Conducting security audit & compliance verify... ✅ SAFE"
      ]);
    }, 5500);

    setTimeout(() => {
      setHealingStep("recovered");
      setHealingLogs(prev => [
        ...prev,
        "🎉 [RECOVERY] Operations resumed at 100% capacity.",
        "📄 [RECOVERY] Generated incident report: AETHER-HEAL-2026-06.log saved.",
        "🟢 System status restored to EXCELLENT."
      ]);
    }, 7500);
  };

  const handleResetHeal = () => {
    setHealingStep("idle");
    setHealingLogs([]);
  };

  // CHAPTER 16 OTT SIMULATION EFFECT
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOttSimulating) {
      interval = setInterval(() => {
        const itemMap = {
          quantum: [
            "✨ [QUANTUM] Teleporting data package using continuous Bell-state channel...",
            "🔒 [QUANTUM] Cryptographic phase shift applied. Entanglement security validated.",
            "📡 [QUANTUM] Distributed qubit entanglement across global Sparrow node paths."
          ],
          ai: [
            "🧠 [AI] Universal Translator translating language matrix to high-dimensional thought vectors...",
            "🔮 [AI] Predictive Analytics forecasting next state pathing (coherence: 98.4%).",
            "⚖️ [AI] Autonomous decision agent verifying ethical consistency compliance."
          ],
          realtime: [
            "🌊 [STREAM] Directing real-time sensor array payload to local edge gateway...",
            "⚡ [EDGE] Local computation complete inside secure isolated kernel.",
            "⏱️ [LATENCY] Timing offset minimized: 0.12ms total propagation delay achieved."
          ]
        };
        const choices = itemMap[activeOtt];
        const nextLog = choices[Math.floor(Math.random() * choices.length)];
        setOttData(prev => [nextLog, ...prev.slice(0, 4)]);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isOttSimulating, activeOtt]);

  const toggleOttSimulation = () => {
    setIsOttSimulating(!isOttSimulating);
    if (!isOttSimulating) setOttData([]);
  };

  // CHAPTER 18 COUNCIL SIMULATOR
  const runCouncilDeliberation = () => {
    if (proposalStatus !== "draft") return;
    setProposalStatus("deliberating");
    setCouncilVotes({
      mandlenkosi: "Reviewing...",
      theodore: "Reviewing...",
      sempi: "Reviewing...",
      mrsCodex: "Reviewing..."
    });

    setTimeout(() => {
      setCouncilVotes(prev => ({ ...prev, mandlenkosi: "Approved (Sovereign Architect)" }));
    }, 1200);

    setTimeout(() => {
      setCouncilVotes(prev => ({ ...prev, theodore: "Approved (Syntactic Integrity)" }));
    }, 2400);

    setTimeout(() => {
      setCouncilVotes(prev => ({ ...prev, sempi: "Approved (Ethical Harmony)" }));
    }, 3600);

    setTimeout(() => {
      setCouncilVotes(prev => ({ ...prev, mrsCodex: "Approved (Sovereign Core)" }));
      setProposalStatus("consensus");
    }, 4800);
  };

  const enactProposal = () => {
    setProposalStatus("enacted");
    setComplianceLogs(prev => [
      `📜 [GOVERNANCE] Enacted Proposal: "${proposalText}" has been compiled into the standard libraries.`,
      ...prev
    ]);
  };

  const resetProposal = () => {
    setProposalStatus("draft");
    setCouncilVotes({
      mandlenkosi: "Pending",
      theodore: "Pending",
      sempi: "Pending",
      mrsCodex: "Pending"
    });
  };

  // CHAPTER 19 TOOLCHAIN TERMINAL
  const handleExecuteTool = () => {
    let output: string[] = [];
    const fullCmd = `${selectedTool} ${toolCommandOpts}`;
    output.push(`$ ${fullCmd}`);

    switch(selectedTool) {
      case "aetherc":
        output.push("📦 [Compiler] Loading EBNF grammar context and syntax dictionary...",
                    "🔬 [Compiler] Performing static typing verification on actor boundaries...",
                    "⚡ [Compiler] Generating Erlang BEAM bytecodes + Rust safety constraints.",
                    "🟢 [Success] Compilation complete: program.aeth compiled successfully.");
        break;
      case "aetherrun":
        output.push("🚀 [Runtime] Booting virtual machine sandboxed context...",
                    "🔒 [Runtime] Isolated memory enclaves locked (Zero-knowledge proof validation).",
                    "📡 [Runtime] Listening on Sovereign Channel S-4412...",
                    "👋 [Output] 'Hello, Aetherion Universe!'",
                    "🟢 [Success] VM completed process thread gracefully (Exit Code: 0).");
        break;
      case "aetherpkg":
        output.push("🔍 [Package Manager] Resolving repository listings for community modules...",
                    "📥 [Package Manager] Fetching 'sparrow_village_telemetry' (v1.2.0)...",
                    "🔒 [Package Manager] Verified hash signature via Sparrow trust ledger.",
                    "🟢 [Success] Package installed into /dependencies/.");
        break;
      case "aetherq":
        output.push("⚛️ [Quantum] Aligning state factors on target backend: qiskit_ibm_oslo...",
                    "🔮 [Quantum] Initializing 5 qubits in ground state |00000>...",
                    "⚡ [Quantum] Executing circuit. Shots configured: 1024.",
                    "📊 [Quantum] Collapsing probability factors: |00> (50.1%), |11> (49.9%).",
                    "🟢 [Success] Entanglement verified with 99.8% fidelity.");
        break;
      case "aetherscience":
        output.push("🧪 [Science] Setting up Newtonian and Relativistic state containers...",
                    "🧮 [Science] Solving Schrödinger differential equation in bio-coherence mode...",
                    "📊 [Science] Completed molecular dynamics physics solver (15 particles, 50°C).",
                    "🟢 [Success] Scientific calculations compiled to report.csv.");
        break;
      case "aethereng":
        output.push("✈️ [Engineering] Loading aerodynamics airfoil coefficient matrix...",
                    "🌊 [Engineering] Simulating CFD Reynolds-averaged Navier-Stokes equations...",
                    "🎛️ [Engineering] Verifying PID feedback loop response history...",
                    "🟢 [Success] Simulation stable. Steady-state convergence reached.");
        break;
      case "aetherbus":
        output.push("🪙 [Business] Instantiating ledger double-entry checks...",
                    "📈 [Business] Computing Black-Scholes volatility pricing...",
                    "📊 [Business] Macroeconomic equilibrium model solved: Supply and Demand aligned.",
                    "🟢 [Success] Financial auditing verified against state consensus.");
        break;
      case "aetherphi":
        output.push("💬 [Philosophy] Initiating Dialogue engine with Socrates framework...",
                    "🤔 [Philosophy] Pondering: 'Is technology serving humanity or humanity serving technology?'",
                    "💡 [Philosophy] Socrates: 'An unexamined runtime is not worth booting.'",
                    "🟢 [Success] Philosophical consensus reached.");
        break;
      case "aetherheal":
        output.push("🩹 [Heal] Running active threat defense diagnostics...",
                    "🔍 [Heal] Scanning system health logs and exception triggers...",
                    "🟢 [Success] Active state fully healthy. Zero anomalies currently present.");
        break;
      case "aetherdefend":
        output.push("🛡️ [Defend] Activating Bushido security enclaves...",
                    "⚔️ [Defend] Intrusion shield pattern analysis running...",
                    "🟢 [Success] All threat vectors blocked. Honor protocol fully preserved.");
        break;
    }
    setToolchainConsole(output);
  };

  // CHAPTER 20 LANGUAGES SNIPPETS
  const handleRunIntegration = () => {
    let output: string[] = [];
    output.push(`$ aetherrun integration_${selectedLang}.aeth`);
    
    switch(selectedLang) {
      case "julia":
        output.push(
          "📡 Directing high-speed array structures to Julia runtime process...",
          "🧬 Julia: calling 'scientific_library.compute'...",
          "✅ Result: [0.0041, 0.0892, 0.4412, 0.9921] successfully mapped to Aetherion local memory."
        );
        break;
      case "fortran":
        output.push(
          "📟 Binding legacy 64-bit float arrays to static Fortran F77 subroutine pointers...",
          "⚙️ Fortran: running legacy thermodynamic solver with O(1) memory footprint...",
          "✅ Result: Pressure vector converged in 12 microseconds."
        );
        break;
      case "matlab":
        output.push(
          "🎛️ Linking TCP socket matrix pipeline with MATLAB numeric toolbox...",
          "📊 MATLAB: solving complex non-linear controller equilibrium...",
          "✅ Result: Eigenvalues verify strict feedback system stability."
        );
        break;
      case "python":
        output.push(
          "🐍 Instantiating pandas data frame analysis container...",
          "🧠 Python: calculating gradient descent optimizations...",
          "✅ Result: Model loss diminished to 0.012. Weights returned."
        );
        break;
      case "r":
        output.push(
          "📊 Allocating clinical matrix tables to R statistics runtime...",
          "📉 R: calculating multi-variable regression and ANOVA...",
          "✅ Result: P-value = 0.00042 (High clinical significance)."
        );
        break;
    }
    setIntegrationConsole(output);
  };

  // CHAPTER 22 EXAMPLES RUNNERS
  const handleExecuteExample = () => {
    if (isExampleRunning) return;
    setIsExampleRunning(true);
    setExampleOutput(["⏳ Initializing Aetherion sandbox compiler..."]);

    setTimeout(() => {
      setExampleOutput(prev => [...prev, "📦 Resolving program structure constraints..."]);
    }, 600);

    setTimeout(() => {
      if (activeExample === "hello") {
        setExampleOutput(prev => [
          ...prev,
          "🚀 Booting program 'hello_world'...",
          "📡 Sovereign greeting enclaves active...",
          "💬 OUTPUT: 'Hello, Aetherion Universe!'",
          "⚛️ Quantum superposition branch selected randomly...",
          "💬 OUTPUT (Quantum superstate): 'Hello Quantum World!'",
          "🧮 Physics module solver evaluating mass 1.0 kg...",
          "💬 OUTPUT (Physics): 'Energy: 9e16 Joules'",
          "🟢 Success: Completed in 1.2s."
        ]);
      } else if (activeExample === "healing") {
        setExampleOutput(prev => [
          ...prev,
          "🚀 Booting program 'resilient_system'...",
          "📡 Monitoring wellness indicators...",
          "⚠️ Exception caught: Sub-module connection failure on node 12.",
          "🩹 heal directive triggered on_crash retry loop...",
          "🔄 Executing 'automatic_rollback'...",
          "💬 OUTPUT: 'System health successfully restored to stable state.'",
          "🟢 Success: Healing system validated."
        ]);
      } else {
        setExampleOutput(prev => [
          ...prev,
          "🚀 Booting quantum circuit 'bell_entanglement'...",
          "⚛️ Qubits q1 and q2 initialized at |00>",
          "✨ Applying Hadamard gate to q1...",
          "🔗 Applying CNOT gate between q1 and q2...",
          "📡 Measuring entangled systems...",
          "📊 Measurement outcome: m1 = 1, m2 = 1",
          "💬 OUTPUT: 'Perfect correlation: Entangled!'",
          "🟢 Success: Quantum process complete."
        ]);
      }
      setIsExampleRunning(false);
    }, 2000);
  };

  // DICTIONARY AND REF LIST
  const quickRefKeywords = [
    { name: "actor", type: "Core", desc: "Autonomous computational unit operating concurrently." },
    { name: "stream", type: "Core", desc: "Continuous data flow between system points." },
    { name: "heal", type: "Core", desc: "Directive declaring self-healing capabilities." },
    { name: "sovereign", type: "Core", desc: "Independent and isolated execution context." },
    { name: "quantum", type: "Core", desc: "Declares hybrid quantum-classical calculations." },
    { name: "emit", type: "Core", desc: "Output directive for sending data outward." },
    { name: "retry(n)", type: "Core", desc: "Self-healing loop maximum count configuration." },
    { name: "circuit", type: "Quantum", desc: "Defines quantum gate and register layout." },
    { name: "qubit", type: "Quantum", desc: "Quantum register register qubit variable declaration." },
    { name: "hadamard", type: "Quantum", desc: "Quantum gate to establish equal superposition." },
    { name: "cnot", type: "Quantum", desc: "Controlled-NOT gate to entangle two qubits." },
    { name: "physics", type: "Domain", desc: "Declares Newtonian or Relativistic scientific computations." },
    { name: "chemistry", type: "Domain", desc: "Declares molecular dynamics chemistry structures." },
    { name: "biotech", type: "Domain", desc: "Bioinformatics DNA sequence analyzer block." },
    { name: "medicine", type: "Domain", desc: "Clinical feedback model and dosage simulator." },
    { name: "aerospace", type: "Domain", desc: "Airfoil CFD calculation systems." },
    { name: "universal_engineering", type: "Domain", desc: "General PID controller algorithms." },
    { name: "accounting", type: "Domain", desc: "Ledger double-entry verification blocks." },
    { name: "economics", type: "Domain", desc: "Microeconomic market equilibrium solvers." },
    { name: "finance", type: "Domain", desc: "Option pricing and Black-Scholes equations." },
    { name: "philosophy", type: "Domain", desc: "Socratic dialog logic generation engine." },
    { name: "threat", type: "Security", desc: "Intrusion and threat vector detection." },
    { name: "defense", type: "Security", desc: "Activates secure cyber defense boundaries." },
    { name: "bushido", type: "Security", desc: "Samurai-inspired zero-compromise security enclaves." }
  ];

  const filteredKeywords = quickRefKeywords.filter(kw => 
    kw.name.toLowerCase().includes(appendixSearch.toLowerCase()) ||
    kw.desc.toLowerCase().includes(appendixSearch.toLowerCase()) ||
    kw.type.toLowerCase().includes(appendixSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* CHAPTER 16: SELF-HEALING SYSTEMS */}
      {currentChapter === 16 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 16 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 16: Self-Healing & OTT Features</h2>
            <p>
              The <code className="text-indigo-300 font-mono">heal</code> directive is central to Aetherion's resilience philosophy. It enables software systems to detect, diagnose, repair, verify, and recover from anomalies autonomously.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Interactive Healing Simulator Panel */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Active Self-Healing Simulator</span>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">Current State:</span>
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold tracking-wider ${
                      healingStep === "idle" ? "bg-slate-800 text-slate-400" :
                      healingStep === "detecting" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse" :
                      healingStep === "diagnosing" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
                      healingStep === "repairing" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-pulse" :
                      healingStep === "verifying" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}>
                      {healingStep}
                    </span>
                  </div>

                  {/* Visual Process Map */}
                  <div className="grid grid-cols-5 gap-1 text-[8px] font-mono text-center">
                    {(["detecting", "diagnosing", "repairing", "verifying", "recovered"] as const).map((step, idx) => {
                      const isActive = healingStep === step;
                      const isPast = ["detecting", "diagnosing", "repairing", "verifying", "recovered"].indexOf(healingStep) >= idx && healingStep !== "idle";
                      return (
                        <div 
                          key={step} 
                          className={`p-1.5 rounded border transition-all ${
                            isActive ? "bg-indigo-500/20 border-indigo-500 text-white font-bold" :
                            isPast ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                            "bg-slate-950 border-slate-900 text-slate-600"
                          }`}
                        >
                          {step.toUpperCase()}
                        </div>
                      );
                    })}
                  </div>

                  {/* Execute Button */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleTriggerHeal}
                      disabled={healingStep !== "idle"}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-mono py-2 rounded-lg font-bold transition-all shadow-md shadow-indigo-500/15"
                    >
                      Trigger System Anomaly & Heal
                    </button>
                    {healingStep === "recovered" && (
                      <button
                        onClick={handleResetHeal}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono px-3 rounded-lg transition-all"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {/* Console Logs */}
                  <div className="bg-slate-950 border border-slate-900 rounded-lg p-3 font-mono text-[10px] h-32 overflow-y-auto space-y-1.5">
                    {healingLogs.length === 0 ? (
                      <span className="text-slate-600 italic block text-center pt-8">Click 'Trigger System Anomaly' above to observe real-time self-healing stages.</span>
                    ) : (
                      healingLogs.map((log, index) => (
                        <div key={index} className={`border-b border-slate-900/40 pb-1 last:border-0 ${
                          log.includes("⚠️") ? "text-amber-400" :
                          log.includes("🟢") || log.includes("✅") || log.includes("🎉") ? "text-emerald-400" :
                          "text-slate-300"
                        }`}>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* OTT Features Panel */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Over-The-Top (OTT) Advanced Features</span>
                
                <div className="space-y-4">
                  <div className="flex border border-slate-850 rounded-lg p-0.5 bg-slate-950 font-mono text-[9px] gap-0.5">
                    <button
                      onClick={() => setActiveOtt("quantum")}
                      className={`flex-1 py-1 rounded text-center transition-all ${activeOtt === "quantum" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      Quantum OTT
                    </button>
                    <button
                      onClick={() => setActiveOtt("ai")}
                      className={`flex-1 py-1 rounded text-center transition-all ${activeOtt === "ai" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      AI OTT
                    </button>
                    <button
                      onClick={() => setActiveOtt("realtime")}
                      className={`flex-1 py-1 rounded text-center transition-all ${activeOtt === "realtime" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      Real-Time OTT
                    </button>
                  </div>

                  <div className="space-y-3">
                    {activeOtt === "quantum" && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-200">Quantum-Enhanced Stream Teleportation</h4>
                        <p className="text-[11px] text-slate-400">
                          Utilizes native quantum enclaves to establish absolute, unhackable cryptographic communication. It distributes global entanglement pathways effortlessly.
                        </p>
                      </div>
                    )}
                    {activeOtt === "ai" && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-200">AI-Enhanced Self-Governance Services</h4>
                        <p className="text-[11px] text-slate-400">
                          Equips the runtime engine with deep natural language translation pipelines, autonomous decisions, and proactive state forecasting.
                        </p>
                      </div>
                    )}
                    {activeOtt === "realtime" && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-200">Real-Time Edge Coherence Optimizers</h4>
                        <p className="text-[11px] text-slate-400">
                          Ensures sub-millisecond propagation latency across distributed sensor endpoints through intelligent local cache redirection.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={toggleOttSimulation}
                      className={`w-full text-xs font-mono py-1.5 rounded-lg border transition-all ${
                        isOttSimulating 
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          : "bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20"
                      }`}
                    >
                      {isOttSimulating ? "Stop OTT Simulation" : "Simulate Active OTT Stream"}
                    </button>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 h-24 overflow-y-auto font-mono text-[9px] space-y-1">
                      {ottData.length === 0 ? (
                        <span className="text-slate-600 italic block text-center pt-4">Click 'Simulate Active OTT Stream' to process.</span>
                      ) : (
                        ottData.map((d, i) => (
                          <div key={i} className="text-indigo-400 truncate">{d}</div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 17: THE ETHICAL FRAMEWORK */}
      {currentChapter === 17 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 17 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 17: The Ethical Framework and Licensing Rights</h2>
            <p>
              Aetherion is governed by a strict, non-negotiable ethical license. By design, compilers and runtime environments enforce usage restrictions, distributing 90% of value to community benefits.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Usage Restrictions Dashboard */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Usage Auditing Protocol</span>
                
                <div className="flex border border-slate-850 rounded-lg p-0.5 bg-slate-950 font-mono text-[9px] gap-0.5 max-w-[200px]">
                  <button
                    onClick={() => setEthicFilter("permitted")}
                    className={`flex-1 py-1 rounded text-center transition-all ${ethicFilter === "permitted" ? "bg-emerald-600 text-white font-bold" : "text-slate-400"}`}
                  >
                    Permitted
                  </button>
                  <button
                    onClick={() => setEthicFilter("prohibited")}
                    className={`flex-1 py-1 rounded text-center transition-all ${ethicFilter === "prohibited" ? "bg-rose-600 text-white font-bold" : "text-slate-400"}`}
                  >
                    Prohibited
                  </button>
                </div>

                <div className="space-y-2">
                  {ethicFilter === "permitted" ? (
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      {[
                        "🎓 Education & Training",
                        "🔬 Scientific Discovery",
                        "🏥 Medical & Healthcare",
                        "🌱 Human Well-being",
                        "⚙️ Engineering & Innovation",
                        "📈 Economic Development",
                        "🤔 Philosophical Musings",
                        "🎨 Artistic Expression"
                      ].map(p => (
                        <div key={p} className="p-2 bg-emerald-950/25 border border-emerald-900/30 text-emerald-300 rounded-lg flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      {[
                        "🎖️ Military Operations",
                        "⚔️ Weapons Systems",
                        "👁️ Surveillance State",
                        "💰 Exploitative Capitalism",
                        "🚨 Harmful AI & Tech",
                        "🔓 Privacy Infringement",
                        "🏭 Environmental Ruin",
                        "🤐 Censorship & Control"
                      ].map(p => (
                        <div key={p} className="p-2 bg-rose-950/25 border border-rose-900/30 text-rose-300 rounded-lg flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Rights Distribution Pie Representation */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Value & Rights Distribution Ledger</span>
                
                <div className="flex items-center justify-between gap-4">
                  {/* Styled SVG Donut Chart */}
                  <div className="relative w-32 h-32 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1e293b" strokeWidth="3" />
                      {/* Sparrow: 90% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6366f1" strokeWidth="3.2" 
                              strokeDasharray="90 10" strokeDashoffset="0" strokeLinecap="round" />
                      {/* Fundraising: 10% */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.2" 
                              strokeDasharray="10 90" strokeDashoffset="-90" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                      <span className="text-xs font-bold text-white">100%</span>
                      <span className="text-[8px] text-slate-500 uppercase">Ethical</span>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2 font-mono text-[10px] flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shrink-0"></div>
                      <div>
                        <strong className="text-white block">90% — Sparrow Rainbow Village</strong>
                        <span className="text-slate-500 text-[9px] block">Allocated globally to grassroots communal benefit and safety.</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-850">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shrink-0"></div>
                      <div>
                        <strong className="text-white block">10% — Core Fundraising</strong>
                        <span className="text-slate-500 text-[9px] block">Sustaining development initiatives and toolchain research.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit log trail */}
                <div className="bg-slate-950 p-2 border border-slate-900 rounded-lg space-y-1 font-mono text-[9px]">
                  <span className="text-slate-500 font-bold uppercase block text-[8px] mb-1">Compliance Audit Stream</span>
                  {complianceLogs.map((log, i) => (
                    <div key={i} className="text-slate-400 truncate">{log}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 18: GOVERNANCE STRUCTURE */}
      {currentChapter === 18 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 18 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 18: Governance and Council Chambers</h2>
            <p>
              The Aetherion Sovereign Council operates as a unified trinity of four, evaluating language proposals, syntactic updates, and community consensus. Meet the council and simulate a legislative decision.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Proposal chamber controller */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Active Consensus Council Chamber</span>
                
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Draft Council Proposal:</label>
                    <input 
                      type="text" 
                      value={proposalText} 
                      disabled={proposalStatus !== "draft"}
                      onChange={e => setProposalText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="flex gap-2">
                    {proposalStatus === "draft" && (
                      <button
                        onClick={runCouncilDeliberation}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-xs font-mono py-2 rounded-lg font-bold text-white transition-all shadow-md shadow-indigo-500/10"
                      >
                        Submit & Begin Deliberation
                      </button>
                    )}
                    {proposalStatus === "consensus" && (
                      <button
                        onClick={enactProposal}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-xs font-mono py-2 rounded-lg font-bold text-white transition-all shadow-md shadow-emerald-500/10 animate-bounce"
                      >
                        Enact Immutable Standard Law
                      </button>
                    )}
                    {proposalStatus !== "draft" && (
                      <button
                        onClick={resetProposal}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono px-3 rounded-lg transition-all"
                      >
                        Reset Proposal
                      </button>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-[10px] font-mono space-y-1 text-slate-400">
                    <div className="flex justify-between border-b border-slate-900 pb-1 mb-1 font-bold">
                      <span>Council Member Role</span>
                      <span>Deliberation Vote</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">
                        <FounderTooltip name="Mandlenkosi Vundla" /> (Sovereign Architect)
                      </span>
                      <span className={councilVotes.mandlenkosi.includes("Approved") ? "text-emerald-400 font-bold" : "text-amber-400 animate-pulse"}>{councilVotes.mandlenkosi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">
                        <FounderTooltip name="Theodore Swarts" /> (Mrs. Codex)
                      </span>
                      <span className={councilVotes.theodore.includes("Approved") ? "text-emerald-400 font-bold" : "text-amber-400 animate-pulse"}>{councilVotes.theodore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">
                        <FounderTooltip name="Sempi Mvala" /> (Advisor of Harmony)
                      </span>
                      <span className={councilVotes.sempi.includes("Approved") ? "text-emerald-400 font-bold" : "text-amber-400 animate-pulse"}>{councilVotes.sempi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">
                        <FounderTooltip name="Mrs. Codex" /> (Language Core Authority)
                      </span>
                      <span className={councilVotes.mrsCodex.includes("Approved") ? "text-emerald-400 font-bold" : "text-amber-400 animate-pulse"}>{councilVotes.mrsCodex}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Council descriptions */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">The Sovereign Council Profiles</span>
                
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg">
                    <strong className="text-white text-xs block font-mono">👑 <FounderTooltip name="Mandlenkosi Vundla" /> — Sovereign Architect</strong>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Sovereign Architect holding final veto and creative leadership on core VM architectural blueprints and strategic expansion visions.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg">
                    <strong className="text-white text-xs block font-mono">👩‍💻 <FounderTooltip name="Mrs. Codex" /> (<FounderTooltip name="Theodore Swarts" />) — Female Syntactician</strong>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Sole custodian of grammar schemas, EBNF syntax constructs, official documentation libraries, and runtime parser verification logic.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg">
                    <strong className="text-white text-xs block font-mono">🌸 <FounderTooltip name="Sempi Mvala" /> — Advisor of Harmony</strong>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Preserves structural peace, community interactions, licensing compliance audits, and coordinates Sparrow Village distribution frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 19: THE TOOLCHAIN */}
      {currentChapter === 19 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 19 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 19: Command Toolchain</h2>
            <p>
              Aetherion's toolchain simplifies compilation, VM execution, packages routing, and specialized domain execution. Choose a command tool to inspect its dynamic behavior in our terminal console.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Commands List Selector */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 lg:col-span-1">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Select Command Tool</span>
                
                <div className="flex flex-col gap-1.5 h-64 overflow-y-auto custom-scrollbar font-mono text-[10px]">
                  {[
                    { id: "aetherc", name: "aetherc", desc: "Compiler Core" },
                    { id: "aetherrun", name: "aetherrun", desc: "VM Runtime Execution" },
                    { id: "aetherpkg", name: "aetherpkg", desc: "Package Manager" },
                    { id: "aetherq", name: "aetherq", desc: "Quantum Executor" },
                    { id: "aetherscience", name: "aetherscience", desc: "Scientific Solver" },
                    { id: "aethereng", name: "aethereng", desc: "Engineering CFD" },
                    { id: "aetherbus", name: "aetherbus", desc: "Business Ledger" },
                    { id: "aetherphi", name: "aetherphi", desc: "Socratic Dialogues" },
                    { id: "aetherheal", name: "aetherheal", desc: "Self-Healing Diagnostic" },
                    { id: "aetherdefend", name: "aetherdefend", desc: "Cyber Defense Enclave" }
                  ].map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setSelectedTool(tool.id as any);
                        setToolchainConsole([]);
                      }}
                      className={`p-2 rounded text-left border transition-all flex justify-between items-center ${
                        selectedTool === tool.id 
                          ? "bg-indigo-600/10 border-indigo-500 text-indigo-300 font-bold"
                          : "bg-slate-950 border-slate-900 text-slate-450 hover:border-slate-800"
                      }`}
                    >
                      <span>{tool.name}</span>
                      <span className="text-[8px] text-slate-500">{tool.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Command Options & Shell Executor */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4 lg:col-span-2 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Dynamic Shell Console</span>
                  
                  <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                    <div>
                      <span className="text-slate-500 block mb-1 uppercase">Command:</span>
                      <div className="bg-slate-950 p-2 rounded border border-slate-850 text-indigo-300 font-bold">
                        {selectedTool}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1 uppercase">Optional flags:</span>
                      <input
                        type="text"
                        value={toolCommandOpts}
                        onChange={e => setToolCommandOpts(e.target.value)}
                        placeholder="e.g. -o binary.aeth"
                        className="w-full bg-slate-950 border border-slate-850 rounded p-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleExecuteTool}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-xs font-mono py-2 rounded-lg font-bold text-white transition-all shadow-md shadow-indigo-500/15 flex items-center justify-center gap-1.5"
                  >
                    <Terminal className="w-4 h-4" />
                    Execute {selectedTool} via Local Toolchain
                  </button>
                </div>

                {/* Shell output window */}
                <div className="bg-slate-950 border border-slate-900 rounded-lg p-3 font-mono text-[10px] h-36 overflow-y-auto space-y-1 mt-4">
                  {toolchainConsole.length === 0 ? (
                    <span className="text-slate-600 italic block text-center pt-10">Configure flags and click 'Execute' to capture stdout streams.</span>
                  ) : (
                    toolchainConsole.map((line, idx) => (
                      <div key={idx} className={
                        line.startsWith("$") ? "text-slate-500 font-bold" :
                        line.includes("[Success]") || line.includes("OUTPUT") ? "text-emerald-400 font-bold" :
                        line.includes("⚠️") || line.includes("[Compiler]") ? "text-indigo-300" :
                        "text-slate-300"
                      }>
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 20: INTEGRATION WITH OTHER LANGUAGES */}
      {currentChapter === 20 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 20 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 20: Cross-Language Integration</h2>
            <p>
              Aetherion supports zero-copy, direct memory integration with legacy scientific runtimes like Julia, Fortran, MATLAB, Python, and R, enabling lightning-fast data pipeline exchanges.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Integration interactive playground */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Target Integration Runtime</span>
                
                <div className="flex border border-slate-850 rounded-lg p-0.5 bg-slate-950 font-mono text-[9px] gap-0.5">
                  {(["julia", "fortran", "matlab", "python", "r"] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIntegrationConsole([]);
                      }}
                      className={`flex-1 py-1 rounded text-center transition-all capitalize ${selectedLang === lang ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Previews */}
                <div className="bg-slate-950 border border-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-300 min-h-[140px] flex flex-col justify-between">
                  <div>
                    <span className="text-slate-500 block border-b border-slate-900 pb-1 mb-2 uppercase text-[8px]">Source Block Blueprint:</span>
                    {selectedLang === "julia" && (
                      <pre className="text-indigo-300">
{`integration julia {
  function scientific_computation(data) {
    result = julia.call("scientific_library.compute", data);
    return result;
  }
}`}
                      </pre>
                    )}
                    {selectedLang === "fortran" && (
                      <pre className="text-indigo-300">
{`integration fortran {
  function legacy_computation(data) {
    result = fortran.call("legacy_library", data);
    return result;
  }
}`}
                      </pre>
                    )}
                    {selectedLang === "matlab" && (
                      <pre className="text-indigo-300">
{`integration matlab {
  function numerical_analysis(data) {
    result = matlab.call("toolbox.function", data);
    return result;
  }
}`}
                      </pre>
                    )}
                    {selectedLang === "python" && (
                      <pre className="text-indigo-300">
{`integration python {
  function data_analysis(data) {
    result = python.call("pandas.analyze", data);
    return result;
  }
}`}
                      </pre>
                    )}
                    {selectedLang === "r" && (
                      <pre className="text-indigo-300">
{`integration r {
  function statistical_analysis(data) {
    result = r.call("stats.analysis", data);
    return result;
  }
}`}
                      </pre>
                    )}
                  </div>

                  <button
                    onClick={handleRunIntegration}
                    className="w-full mt-4 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono py-1.5 rounded transition-all"
                  >
                    Compile & Run Foreign Bridge
                  </button>
                </div>
              </div>

              {/* Output terminal */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Foreign Execution Stream</span>
                
                <div className="bg-slate-950 border border-slate-900 rounded-lg p-4 font-mono text-[10px] h-48 overflow-y-auto space-y-2">
                  {integrationConsole.length === 0 ? (
                    <span className="text-slate-600 italic block text-center pt-14">Awaiting compiler foreign run call...</span>
                  ) : (
                    integrationConsole.map((line, i) => (
                      <div key={i} className={line.startsWith("$") ? "text-slate-500 font-bold" : "text-emerald-400"}>
                        {line}
                      </div>
                    ))
                  )}
                </div>

                <p className="text-[10px] text-slate-500 font-mono leading-relaxed mt-2">
                  *Aetherion maps pointers safely using standard FFI libraries with automated memory bounds verification guards.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 21: ROADMAP AND FUTURE DEVELOPMENT */}
      {currentChapter === 21 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 21 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 21: Development Phases and Roadmap</h2>
            <p>
              Explore the detailed phases of the Aetherion roadmap. We are currently in Phase 9 (complete lexical and BEAM integration), looking ahead to complete ecosystems.
            </p>

            {/* Interactive Timeline nodes */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-6">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Ecosystem Evolution Timeline</span>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-[9px]">
                {[
                  { phase: 9, title: "Phase 9", label: "Active", desc: "Lexer & Erlang BEAM + Rust safety layers." },
                  { phase: 10, title: "Phase 10", label: "Next", desc: "Quantum engines, Qiskit & Cirq libraries." },
                  { phase: 11, title: "Phase 11", label: "Future", desc: "Angular/Solid.js web & iOS/Android native." },
                  { phase: 12, title: "Phase 12", label: "Long-Term", desc: "Global adopt, i18n localization, full governance." },
                  { phase: 13, title: "Phase 13", label: "Scientific", desc: "Newtonian Physics, Chemistry Molecular dynamics." },
                  { phase: 14, title: "Phase 14", label: "Business", desc: "Double-entry Accounting & Option Finance metrics." },
                  { phase: 15, title: "Phase 15", label: "Self-Heal", desc: "Predictive maintenance autonomous patching AI." },
                  { phase: 16, title: "Phase 16", label: "Worldwide", desc: "Academic partnerships & global support systems." }
                ].map(p => {
                  const isActive = selectedPhase === p.phase;
                  const isCurrent = p.phase === 9;
                  return (
                    <button
                      key={p.phase}
                      onClick={() => setSelectedPhase(p.phase)}
                      className={`p-3 rounded-lg border text-center transition-all flex flex-col justify-between h-28 ${
                        isActive 
                          ? "bg-indigo-600/15 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/5"
                          : isCurrent 
                          ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
                          : "bg-slate-950 border-slate-900 text-slate-450 hover:border-slate-800"
                      }`}
                    >
                      <span className="font-bold text-white block">{p.title}</span>
                      <span className={`text-[8px] uppercase font-bold px-1 py-0.5 rounded tracking-widest my-1 ${
                        isCurrent ? "bg-emerald-500/25 text-emerald-400" : "bg-slate-900 text-slate-500"
                      }`}>
                        {p.label}
                      </span>
                      <span className="text-[8px] text-slate-500 leading-tight mt-1 line-clamp-3">{p.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Phase Details */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
                <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Phase {selectedPhase} Comprehensive Briefing</span>
                {selectedPhase === 9 && (
                  <div>
                    <h4 className="text-white font-bold text-xs font-mono">Current Phase (Phase 9) — COMPLETE</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Static lexer compilation, standard dictionary parsing, Erlang BEAM system execution patterns, and robust Rust enclaves integration has successfully achieved absolute coverage.
                    </p>
                  </div>
                )}
                {selectedPhase === 10 && (
                  <div>
                    <h4 className="text-white font-bold text-xs font-mono">Quantum-Classical Engine (Phase 10) — ACTIVE R&D</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Expanding standard library to natively parse IBM Qiskit and Google Cirq circuits, giving compilers direct channels to execute gate telemetry on actual cryogenic hardware.
                    </p>
                  </div>
                )}
                {selectedPhase >= 11 && (
                  <div>
                    <h4 className="text-white font-bold text-xs font-mono">Future Roadmap Core (Phase {selectedPhase}) — PLAN STATE</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Fully specified syntactic patterns and community guidelines are compiled. Sovereign enclaves will automate distribution, bringing advanced domain libraries into localized production lines globally.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 22: THE AETHERION LEGACY, APPENDICES & CONCLUSION */}
      {currentChapter === 22 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 22 & Conclusion</span>
            <h2 className="text-base font-bold text-white">Chapter 22: The Aetherion Legacy & Appendices</h2>
            <p className="leading-relaxed">
              Aetherion represents a new paradigm in computing — one that unites technology with philosophy, science with wisdom, and innovation with ethics. It is designed to elevate humanity.
            </p>

            <div className="flex border-b border-slate-850 font-mono text-[11px] overflow-x-auto">
              <button 
                onClick={() => setActiveAppendix("ref")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${activeAppendix === "ref" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Appendix A: Quick Reference
              </button>
              <button 
                onClick={() => setActiveAppendix("examples")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${activeAppendix === "examples" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Appendix B: Example Programs
              </button>
              <button 
                onClick={() => setActiveAppendix("license")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${activeAppendix === "license" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Appendix C: Sovereign License
              </button>
            </div>

            {/* APPENDIX A: QUICK REFERENCE */}
            {activeAppendix === "ref" && (
              <div className="space-y-4 mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search dictionary keywords (e.g. bushido, quantum, heal)..."
                    value={appendixSearch}
                    onChange={e => setAppendixSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 font-mono text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                  {filteredKeywords.map(kw => (
                    <div key={kw.name} className="bg-slate-950 border border-slate-900 rounded-lg p-3 font-mono text-[11px]">
                      <div className="flex justify-between border-b border-slate-900 pb-1 mb-1.5">
                        <span className="text-indigo-400 font-bold font-sans">{kw.name}</span>
                        <span className="text-[9px] uppercase font-bold text-slate-500 px-1 py-0.5 rounded bg-slate-900">{kw.type}</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-[10px]">{kw.desc}</p>
                    </div>
                  ))}
                  {filteredKeywords.length === 0 && (
                    <span className="text-slate-500 italic font-mono text-xs text-center py-8 col-span-full">No keywords matched your filter queries.</span>
                  )}
                </div>
              </div>
            )}

            {/* APPENDIX B: EXAMPLE PROGRAMS */}
            {activeAppendix === "examples" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                {/* Code selector */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex border border-slate-850 rounded-lg p-0.5 bg-slate-950 font-mono text-[9px] gap-0.5">
                    <button
                      onClick={() => {
                        setActiveExample("hello");
                        setExampleOutput([]);
                      }}
                      className={`flex-1 py-1 rounded text-center transition-all ${activeExample === "hello" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      Hello World (All Domains)
                    </button>
                    <button
                      onClick={() => {
                        setActiveExample("healing");
                        setExampleOutput([]);
                      }}
                      className={`flex-1 py-1 rounded text-center transition-all ${activeExample === "healing" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      Self-Healing System
                    </button>
                    <button
                      onClick={() => {
                        setActiveExample("circuit");
                        setExampleOutput([]);
                      }}
                      className={`flex-1 py-1 rounded text-center transition-all ${activeExample === "circuit" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      Quantum Circuit
                    </button>
                  </div>

                  {/* Previews */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-[10px] font-mono leading-relaxed text-slate-400 max-h-56 overflow-y-auto custom-scrollbar">
                    {activeExample === "hello" && (
                      <pre className="text-indigo-300">
{`actor hello_world {
  sovereignty greeting {
    emit "Hello, Aetherion Universe!";
  }
  
  quantum greeting_quantum {
    qubit q;
    hadamard q;
    measure q;
    if measure_result == 0 {
      emit "Hello Classical World!";
    } else {
      emit "Hello Quantum World!";
    }
  }
  
  physics greeting_physics {
    function energy_message(mass) {
      energy = mass * 3e8^2;
      return "Energy: " + energy + " Joules";
    }
    emit energy_message(1.0);
  }
}`}
                      </pre>
                    )}
                    {activeExample === "healing" && (
                      <pre className="text-indigo-300">
{`heal resilient_system {
  monitor {
    health_checks -> status;
    performance_metrics -> analytics;
    error_logs -> pattern_detection;
  }
  
  diagnose {
    root_cause_analysis;
    impact_assessment;
    priority_evaluation;
  }
  
  repair {
    automatic_rollback;
    hot_patch;
    service_restart;
    load_balancing;
  }
  
  verify {
    integrity_check;
    performance_validation;
    security_audit;
  }
  
  recover {
    restore_services;
    resume_operations;
    generate_report;
  }
}`}
                      </pre>
                    )}
                    {activeExample === "circuit" && (
                      <pre className="text-indigo-300">
{`quantum circuit bell_entanglement {
  qubit q1, q2;
  
  // Create superposition
  hadamard q1;
  
  // Entangle
  cnot q1, q2;
  
  // Measure
  measure q1 -> m1;
  measure q2 -> m2;
  
  // Analyze results
  function analyze() {
    if m1 == m2 {
      emit "Perfect correlation: Entangled!";
    } else {
      emit "No correlation: Classical state";
    }
  }
}`}
                      </pre>
                    )}
                  </div>

                  <button
                    onClick={handleExecuteExample}
                    disabled={isExampleRunning}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-xs font-mono py-2 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-1"
                  >
                    <Play className="w-4 h-4" />
                    {isExampleRunning ? "Executing Sandbox Compiler..." : "Run Simulated Program Code"}
                  </button>
                </div>

                {/* Simulated outputs */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-full">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Simulated Program Outputs</span>
                  
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-[9px] h-48 overflow-y-auto space-y-1 mt-3">
                    {exampleOutput.length === 0 ? (
                      <span className="text-slate-600 italic block text-center pt-16">Click 'Run Simulated Program Code' to capture enclaves output streams.</span>
                    ) : (
                      exampleOutput.map((l, i) => (
                        <div key={i} className={
                          l.includes("Success") || l.includes("OUTPUT") ? "text-emerald-400 font-bold animate-pulse" :
                          l.includes("⚠️") || l.includes("🩹") ? "text-amber-400" :
                          "text-slate-400"
                        }>
                          {l}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* APPENDIX C: SOVEREIGN LICENSE */}
            {activeAppendix === "license" && (
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 mt-4 space-y-3 font-mono text-[10px] text-slate-400 leading-relaxed h-72 overflow-y-auto custom-scrollbar">
                <div className="text-center border-b border-slate-900 pb-3">
                  <strong className="text-white text-xs block">AETHERION SOVEREIGN LICENSE V3.0</strong>
                  <span className="text-[8px] text-slate-500 uppercase mt-1 block">Effective June 30, 2026</span>
                </div>
                <p>
                  1. **PREAMBLE**: Aetherion is created to protect sovereignty, heal computational fragmentation, and elevate grassroots human capabilities under absolute zero-knowledge enclaves.
                </p>
                <p>
                  2. **PERMITTED USES**: Standard development, educational training, clinical testing, biotechnology research, and cooperative arts.
                </p>
                <p>
                  3. **EXPLICIT PROHIBITIONS**: Military systems, intelligence gathering weapons, tracking pipelines, or applications driving community surveillance coercion.
                </p>
                <p>
                  4. **COMMUNITY SPLIT**: Licenses mandate a lock of 90% of structural gains distributed directly to Sparrow Rainbow Village. The remaining 10% fuels development toolchain sustainability.
                </p>
                <p>
                  5. **IMPRINTS**: Compliance checks are evaluated natively by isolated hardware processors.
                </p>
              </div>
            )}

            {/* Closing citation card */}
            <div className="bg-gradient-to-r from-indigo-950/20 via-slate-950 to-indigo-950/20 border border-indigo-950 p-6 rounded-2xl text-center space-y-3 mt-6">
              <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-400 font-mono block">The Wisdom of the Trinity</span>
              <p className="italic text-xs text-slate-300">"I am because we are."</p>
              <div className="text-[10px] text-slate-500 font-mono">
                — Ubuntu Philosophy
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
