import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, Compass, Cpu, Search, BrainCircuit, Play, Pause, 
  RefreshCw, CheckCircle2, AlertCircle, Sparkle, Code, BookOpen, Heart,
  Zap, ChevronRight, Activity, Thermometer, FlaskConical, Dna, Gauge,
  TrendingUp, CircleDollarSign, Scale, Music, Waves, HelpCircle
} from "lucide-react";
import { FounderTooltip } from "./AetherionVision";

interface Chapters7to15Props {
  currentChapter: number;
}

export default function CodexChapters7to15({ currentChapter }: Chapters7to15Props) {
  // chapter 7 state
  const [selectedKeyword, setSelectedKeyword] = useState<"actor" | "stream" | "heal" | "sovereign" | "quantum" | "emit" | "retry">("actor");

  // chapter 8 state
  const [qubitState, setQubitState] = useState<number>(0); // 0 or 1
  const [qubitProb0, setQubitProb0] = useState<number>(100);
  const [qubitProb1, setQubitProb1] = useState<number>(0);
  const [qubitPhase, setQubitPhase] = useState<string>("0");
  const [streamData, setStreamData] = useState<string[]>([]);
  const [isStreamRunning, setIsStreamRunning] = useState(false);

  // chapter 9 state
  const [ch9Preset, setCh9Preset] = useState<"actor" | "quantum" | "sovereign">("actor");

  // chapter 10 state
  const [ch10Tab, setCh10Tab] = useState<"mechanics" | "computing" | "physiology">("mechanics");
  // quantum mechanics simulation
  const [quantumStateLogs, setQuantumStateLogs] = useState<string[]>([]);
  const [entangledState, setEntangledState] = useState<string>("Unmeasured");
  const [tunnelBarrier, setTunnelBarrier] = useState(60); // barrier thickness
  const [tunnelProbability, setTunnelProbability] = useState(36);
  // quantum photosynthesis state
  const [photoTemp, setPhotoTemp] = useState(25);
  const [photoCoherence, setPhotoCoherence] = useState(80);

  // chapter 11 state
  const [ch11Tab, setCh11Tab] = useState<"physics" | "chemistry" | "biotech" | "medicine">("physics");
  // Newtonian physics
  const [m1, setM1] = useState(10);
  const [m2, setM2] = useState(20);
  const [dist, setDist] = useState(5);
  const [relSpeed, setRelSpeed] = useState(0.5); // fraction of c
  // Chemistry Molecular Dynamics
  const [chemTemp, setChemTemp] = useState(50);
  const [particles, setParticles] = useState<{ x: number; y: number; vx: number; vy: number }[]>([]);
  // Biotech DNA sequence
  const [dnaSeq, setDnaSeq] = useState("ATGCTAGCGAAT");
  // Clinical healing dosage
  const [healDosage, setHealDosage] = useState(40);
  const [healSymptomLevel, setHealSymptomLevel] = useState(100);

  // chapter 12 state
  const [ch12Tab, setCh12Tab] = useState<"aerospace" | "universal">("aerospace");
  // CFD airfoil
  const [angleAttack, setAngleAttack] = useState(5);
  // PID controller
  const [pidP, setPidP] = useState(1.5);
  const [pidI, setPidI] = useState(0.5);
  const [pidD, setPidD] = useState(0.2);
  const [pidHistory, setPidHistory] = useState<number[]>([]);

  // chapter 13 state
  const [ch13Tab, setCh13Tab] = useState<"accounting" | "economics" | "finance">("accounting");
  // Accounting double entry
  const [ledger, setLedger] = useState([
    { id: 1, account: "Cash", amount: 1000, type: "debit" },
    { id: 2, account: "Sovereign Capital", amount: 1000, type: "credit" }
  ]);
  const [newAcct, setNewAcct] = useState("");
  const [newAmt, setNewAmt] = useState(100);
  const [newType, setNewType] = useState<"debit" | "credit">("debit");
  // Economics equilibrium
  const [supplyShift, setSupplyShift] = useState(0); // -50 to 50
  const [demandShift, setDemandShift] = useState(0); // -50 to 50
  // Black Scholes Option pricing
  const [bsStock, setBsStock] = useState(100);
  const [bsStrike, setBsStrike] = useState(100);
  const [bsTime, setBsTime] = useState(1); // years
  const [bsVol, setBsVol] = useState(30); // %

  // chapter 14 state
  const [ch14Tab, setCh14Tab] = useState<"logic" | "ethics" | "ontology">("logic");
  // Logic evaluation
  const [propA, setPropA] = useState(true);
  const [propB, setPropB] = useState(false);
  // Ethics calculus
  const [ethicalStakeholders, setEthicalStakeholders] = useState([
    { name: "Sparrow Rainbow Village (Communal)", weight: 90, benefit: 8 },
    { name: "Individual User Privacy", weight: 70, benefit: 9 },
    { name: "Centralized State Aggregators", weight: 10, benefit: -6 }
  ]);

  // chapter 15 state
  const [ch15Tab, setCh15Tab] = useState<"acoustics" | "sound" | "philosophy">("acoustics");
  // Sound propagation medium
  const [acousticMedium, setAcousticMedium] = useState<"air" | "water" | "steel">("air");
  const [acousticFreq, setAcousticFreq] = useState(440);
  // Tone play state
  const [isPlayingTone, setIsPlayingTone] = useState(false);
  const [toneFreq, setToneFreq] = useState(440);
  const [waveAmplitude, setWaveAmplitude] = useState<number[]>(Array(24).fill(0).map(() => Math.sin(Math.random())));
  const [chordType, setChordType] = useState<"major" | "minor" | "augmented" | "diminished">("major");
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize chemical particles
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 15; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }
    setParticles(arr);
  }, []);

  // Chemical particles physics loop
  useEffect(() => {
    let frameId: number;
    const update = () => {
      setParticles(prev => prev.map(p => {
        const speedScale = chemTemp / 50;
        let nx = p.x + p.vx * speedScale;
        let ny = p.y + p.vy * speedScale;
        let nvx = p.vx;
        let nvy = p.vy;

        if (nx < 0 || nx > 100) { nvx = -nvx; nx = nx < 0 ? 0 : 100; }
        if (ny < 0 || ny > 100) { nvy = -nvy; ny = ny < 0 ? 0 : 100; }

        return { x: nx, y: ny, vx: nvx, vy: nvy };
      }));
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [chemTemp]);

  // Quantum tunnel probability equation
  useEffect(() => {
    const prob = Math.round(100 * Math.exp(-tunnelBarrier / 60));
    setTunnelProbability(prob);
  }, [tunnelBarrier]);

  // Self healing clinical feedback simulator
  useEffect(() => {
    const target = Math.max(0, 100 - healDosage * 2.2);
    const interval = setInterval(() => {
      setHealSymptomLevel(prev => {
        const diff = target - prev;
        if (Math.abs(diff) < 1) return target;
        return prev + diff * 0.15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [healDosage]);

  // PID loop feedback simulation
  useEffect(() => {
    setPidHistory(Array(30).fill(0).map((_, i) => {
      const x = i / 5;
      const target = 1;
      const damping = Math.exp(-x * pidD * 1.5);
      const freq = pidP * 3;
      const response = target - damping * Math.cos(freq * x) * (1 - pidI * 0.2);
      return Math.max(0, response * 100);
    }));
  }, [pidP, pidI, pidD]);

  // Wave amplitude loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingTone) {
      interval = setInterval(() => {
        setWaveAmplitude(prev => prev.map((_, i) => {
          const t = Date.now() / 200;
          return Math.sin(t + i * 0.5) * 0.5 + Math.sin(t * 1.5 + i * 0.8) * 0.3;
        }));
      }, 50);
    } else {
      setWaveAmplitude(Array(24).fill(0));
    }
    return () => clearInterval(interval);
  }, [isPlayingTone]);

  // Tone generator
  const handlePlayTone = (freq: number, label: string) => {
    try {
      if (isPlayingTone) {
        setIsPlayingTone(false);
        return;
      }

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.01, ctx.currentTime); // keep extremely soft and pleasant
      gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.3);

      setIsPlayingTone(true);
      setTimeout(() => setIsPlayingTone(false), 1200);
    } catch (e) {
      console.warn("Audio Context not allowed or blocked by iframe permissions: ", e);
      setIsPlayingTone(true);
      setTimeout(() => setIsPlayingTone(false), 1200);
    }
  };

  // Play chords
  const handlePlayChord = (type: typeof chordType) => {
    const baseFreq = 261.63; // C4
    const factors = {
      major: [1.0, 1.25, 1.5],       // C, E, G
      minor: [1.0, 1.189, 1.5],      // C, Eb, G
      augmented: [1.0, 1.25, 1.562],  // C, E, G#
      diminished: [1.0, 1.189, 1.414] // C, Eb, Gb
    }[type];

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      factors.forEach((factor, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(baseFreq * factor, ctx.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.005, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.6);
      });

      setIsPlayingTone(true);
      setTimeout(() => setIsPlayingTone(false), 1500);
    } catch (e) {
      console.warn(e);
      setIsPlayingTone(true);
      setTimeout(() => setIsPlayingTone(false), 1500);
    }
  };

  // Stream Redirection test
  const handleStartStream = () => {
    if (isStreamRunning) {
      setIsStreamRunning(false);
      return;
    }
    setIsStreamRunning(true);
    setStreamData([]);
    let counter = 0;
    const timer = setInterval(() => {
      const dataItems = [
        `📡 [STREAM] Sensor Node S-${100 + Math.floor(Math.random() * 50)} output initialized.`,
        `🔄 [REDIRECTION] Stream chunk resolved. Rate: ${Math.round(40 + Math.random() * 20)}kb/s`,
        `⚖️ [ETHICS_ROUTING] Checked content parameters -> Sane`,
        `⚙️ [COMPILER] Thread optimized on BEAM-X reduction budget`,
        `🌸 [UBUNTU] Sparrow Rainbow Village allocation logged (90% capacity)`
      ];
      setStreamData(prev => [dataItems[counter % dataItems.length], ...prev.slice(0, 5)]);
      counter++;
    }, 1200);

    return () => clearInterval(timer);
  };

  return (
    <div className="space-y-6">
      
      {/* CHAPTER 7: CORE KEYWORDS */}
      {currentChapter === 7 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 7 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 7: Core Keywords and Their Meanings</h2>
            <p>
              Every keyword in Aetherion carries philosophical meaning, reflecting the language's commitment to symbolism and intention. Hover over co-founders like <FounderTooltip name="Theodore Swarts" /> or <FounderTooltip name="Mrs. Codex" /> to understand syntactic codification.
            </p>

            {/* Keyword selector Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {[
                { id: "actor", label: "actor", desc: "Autonomous Unit" },
                { id: "stream", label: "stream", desc: "Continuous Flow" },
                { id: "heal", label: "heal", desc: "Self-Healing" },
                { id: "sovereign", label: "sovereign", desc: "Independent Context" },
                { id: "quantum", label: "quantum", desc: "Hybrid Compute" },
                { id: "emit", label: "emit", desc: "Output Directive" },
                { id: "retry", label: "retry", desc: "Retry Config" }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedKeyword(item.id as any)}
                  className={`p-3 rounded-lg border font-mono text-xs text-center transition-all ${
                    selectedKeyword === item.id 
                      ? "bg-indigo-600/15 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/5"
                      : "bg-slate-900/40 border-slate-850 text-slate-400 hover:border-slate-800"
                  }`}
                >
                  <span className="font-bold block text-white">{item.label}</span>
                  <span className="text-[8px] text-slate-500 leading-tight mt-1 block">{item.desc}</span>
                </button>
              ))}
            </div>

            {/* Keyword Details Box */}
            <div className="bg-slate-900/20 border border-slate-800 rounded-xl p-5 space-y-4 mt-4">
              {selectedKeyword === "actor" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Keyword: Actor</span>
                    <span className="text-[9px] font-mono text-slate-500">Autonomous Computational Unit</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The <code className="text-indigo-300 font-mono">actor</code> keyword declares an autonomous computational unit. Actors are independent, concurrent processes that communicate through messages. They embody the principle of sovereignty, operating independently of other actors.
                  </p>
                  <pre className="text-[11px] bg-slate-950 p-4 rounded-lg font-mono text-slate-300 border border-slate-900 overflow-x-auto">
{`actor telemetry_system {
  // This actor operates autonomously
  // It sends and receives messages
  // It has its own state and behavior
}`}
                  </pre>
                </div>
              )}

              {selectedKeyword === "stream" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Keyword: Stream</span>
                    <span className="text-[9px] font-mono text-slate-500">Continuous Data Flow</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The <code className="text-indigo-300 font-mono">stream</code> keyword defines a continuous flow of data. Streams represent the flow of information through the system, embodying the principle of connection and communication.
                  </p>
                  <pre className="text-[11px] bg-slate-950 p-4 rounded-lg font-mono text-slate-300 border border-slate-900 overflow-x-auto">
{`stream temperature -> gateway;
// This declares a stream of temperature data flowing from a source to a gateway`}
                  </pre>
                </div>
              )}

              {selectedKeyword === "heal" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Keyword: Heal</span>
                    <span className="text-[9px] font-mono text-slate-500">Self-Healing Directive</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The <code className="text-indigo-300 font-mono">heal</code> keyword declares self-healing capabilities. It embodies the principle of resilience, instructing the system to detect, diagnose, and repair problems dynamically. Preserved lovingly by co-founder <FounderTooltip name="Sempi Mvala" />.
                  </p>
                  <pre className="text-[11px] bg-slate-950 p-4 rounded-lg font-mono text-slate-300 border border-slate-900 overflow-x-auto">
{`heal on_failure retry(3);
// Instructs the system to retry failed operations up to three times`}
                  </pre>
                </div>
              )}

              {selectedKeyword === "sovereign" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Keyword: Sovereign</span>
                    <span className="text-[9px] font-mono text-slate-500">Independent Execution Context</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The <code className="text-indigo-300 font-mono">sovereign</code> keyword declares an independent execution context. It embodies the principle of sovereignty, creating a context that operates independently of external control or coercion.
                  </p>
                  <pre className="text-[11px] bg-slate-950 p-4 rounded-lg font-mono text-slate-300 border border-slate-900 overflow-x-auto">
{`sovereign context {
  // This code executes independently
  // It cannot be coerced or controlled externally
}`}
                  </pre>
                </div>
              )}

              {selectedKeyword === "quantum" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Keyword: Quantum</span>
                    <span className="text-[9px] font-mono text-slate-500">Quantum-Classical Hybrid Computation</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The <code className="text-indigo-300 font-mono">quantum</code> keyword declares quantum-classical hybrid computation. It embodies the principle of integration, combining classical computing power with native quantum circuits.
                  </p>
                  <pre className="text-[11px] bg-slate-950 p-4 rounded-lg font-mono text-slate-300 border border-slate-900 overflow-x-auto">
{`quantum circuit bell_pair {
  qubit q1, q2;
  hadamard q1;
  cnot q1, q2;
}`}
                  </pre>
                </div>
              )}

              {selectedKeyword === "emit" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Keyword: Emit</span>
                    <span className="text-[9px] font-mono text-slate-500">Output Directive</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The <code className="text-indigo-300 font-mono">emit</code> keyword directs output. It sends data to the outside world, embodying the principle of communication and light.
                  </p>
                  <pre className="text-[11px] bg-slate-950 p-4 rounded-lg font-mono text-slate-300 border border-slate-900 overflow-x-auto">
{`emit "Hello, World!";
// Standard greeting emitted out of safe enclaves`}
                  </pre>
                </div>
              )}

              {selectedKeyword === "retry" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">Keyword: Retry</span>
                    <span className="text-[9px] font-mono text-slate-500">Healing Retry Configuration</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The <code className="text-indigo-300 font-mono">retry</code> keyword configures healing retries inside exception loops. It specifies how many times to retry a failed operation.
                  </p>
                  <pre className="text-[11px] bg-slate-950 p-4 rounded-lg font-mono text-slate-300 border border-slate-900 overflow-x-auto">
{`retry(5); // Retry up to 5 times dynamically`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 8: OPERATORS */}
      {currentChapter === 8 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 8 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 8: Operators and Their Functions</h2>
            <p>
              Aetherion operators handle stream routing and state transformations. Let's explore Quantum Gates and Stream Redirection interactively below.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Interactive Quantum Gate Simulator */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Quantum Gate Simulation Operator</span>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Qubit Base State:</span>
                    <button 
                      onClick={() => {
                        setQubitState(qubitState === 0 ? 1 : 0);
                        setQubitProb0(qubitState === 0 ? 0 : 100);
                        setQubitProb1(qubitState === 0 ? 100 : 0);
                        setQubitPhase("0");
                      }}
                      className="text-indigo-400 border border-indigo-500/30 bg-indigo-500/5 px-2 py-0.5 rounded text-[10px]"
                    >
                      Toggle Base |{qubitState}&gt;
                    </button>
                  </div>

                  {/* Gates Buttons */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                    <button 
                      onClick={() => {
                        setQubitProb0(50);
                        setQubitProb1(50);
                        setQubitPhase("π/4");
                      }}
                      className="bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-white p-2 rounded"
                    >
                      Hadamard (H)
                    </button>
                    <button 
                      onClick={() => {
                        setQubitProb0(qubitProb1);
                        setQubitProb1(qubitProb0);
                        setQubitPhase(qubitPhase === "0" ? "π" : "0");
                      }}
                      className="bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-white p-2 rounded"
                    >
                      Pauli-X (Flip)
                    </button>
                    <button 
                      onClick={() => {
                        setQubitPhase(qubitPhase === "0" ? "π" : "0");
                      }}
                      className="bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-white p-2 rounded"
                    >
                      Pauli-Z (Phase)
                    </button>
                  </div>

                  {/* Visual gauge */}
                  <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-900">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">|0&gt; Probability</span>
                      <span className="text-indigo-300 font-bold">{qubitProb0}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${qubitProb0}%` }} />
                    </div>

                    <div className="flex justify-between text-[11px] font-mono pt-1">
                      <span className="text-slate-400">|1&gt; Probability</span>
                      <span className="text-emerald-300 font-bold">{qubitProb1}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${qubitProb1}%` }} />
                    </div>

                    <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1">
                      <span>Phase Angle</span>
                      <span>{qubitPhase}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redirection Operator */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Stream Redirection (-&gt;) Operator</span>
                
                <div className="space-y-3">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The <code className="text-indigo-300 font-mono">-&gt;</code> operator redirects data from one stream to another, creating a flow of information. Click below to start the redirect stream simulation.
                  </p>

                  <button
                    onClick={handleStartStream}
                    className="w-full bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono py-2 rounded-lg transition-colors"
                  >
                    {isStreamRunning ? "Stop Live Stream Simulation" : "Start Live Stream Simulation"}
                  </button>

                  <div className="bg-slate-950 border border-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-300 h-32 overflow-y-auto custom-scrollbar space-y-1.5">
                    {streamData.length === 0 ? (
                      <span className="text-slate-600 italic block text-center pt-8">Click 'Start Stream' above to inspect redirected chunks.</span>
                    ) : (
                      streamData.map((data, index) => (
                        <div key={index} className="border-b border-slate-900/50 pb-1 last:border-0 truncate">
                          {data}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 9: PROGRAM STRUCTURE */}
      {currentChapter === 9 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 9 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 9: Program Structure</h2>
            <p>
              An Aetherion program consists of declarations including actors, quantum circuits, and independent contexts. Choose a preset to inspect formal language templates.
            </p>

            <div className="flex border border-slate-850 rounded-lg p-0.5 bg-slate-900/40 font-mono text-[10px] gap-0.5 max-w-sm">
              <button
                onClick={() => setCh9Preset("actor")}
                className={`flex-1 py-1 px-2 rounded transition-all ${ch9Preset === "actor" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
              >
                Actor Declaration
              </button>
              <button
                onClick={() => setCh9Preset("quantum")}
                className={`flex-1 py-1 px-2 rounded transition-all ${ch9Preset === "quantum" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
              >
                Quantum Circuit
              </button>
              <button
                onClick={() => setCh9Preset("sovereign")}
                className={`flex-1 py-1 px-2 rounded transition-all ${ch9Preset === "sovereign" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
              >
                Sovereign Context
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* EBNF structure representation */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Formal Grammar Definition (EBNF)</span>
                
                <pre className="text-[10px] font-mono text-slate-400 leading-relaxed overflow-x-auto bg-slate-950 p-4 rounded-lg">
{`Program ::= { Declaration }
Declaration ::= ActorDeclaration | QuantumCircuit | SovereignContext | FunctionDeclaration
FunctionDeclaration ::= "function" Identifier "(" ParameterList ")" [ "->" Type ] "{" { Statement } "}"
Statement ::= AssignmentStatement | IfStatement | LoopStatement | EmitStatement | ReturnStatement`}
                </pre>
              </div>

              {/* Live Preview Box */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Structured Source Preview</span>
                
                <pre className="text-[11px] font-mono text-indigo-300 leading-relaxed overflow-x-auto bg-slate-950 p-4 rounded-lg border border-indigo-950/40">
                  {ch9Preset === "actor" ? (
`actor QuantumSovereign {
  stream q_state -> telemetry;
  heal on_crash {
    retry(3);
  }
}`
                  ) : ch9Preset === "quantum" ? (
`quantum circuit bell_pair {
  qubit q1, q2;
  hadamard q1;
  cnot q1, q2;
  measure q1 -> output;
}`
                  ) : (
`sovereign context {
  // Encrypted state isolation enclaves active
  let payload = read_secure_ledger();
  emit payload;
}`
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 10: QUANTUM COMPUTING DOMAINS */}
      {currentChapter === 10 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 10 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 10: Quantum Computing Domains</h2>
            <p>
              Aetherion provides native integration of quantum computing frameworks and explores quantum biological effects. Balance is preserved by Advisor of Harmony <FounderTooltip name="Sempi Mvala" />.
            </p>

            <div className="flex border-b border-slate-850 font-mono text-[11px]">
              <button 
                onClick={() => setCh10Tab("mechanics")} 
                className={`py-2 px-4 border-b-2 transition-all ${ch10Tab === "mechanics" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Quantum Mechanics
              </button>
              <button 
                onClick={() => setCh10Tab("computing")} 
                className={`py-2 px-4 border-b-2 transition-all ${ch10Tab === "computing" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Frameworks & Algorithms
              </button>
              <button 
                onClick={() => setCh10Tab("physiology")} 
                className={`py-2 px-4 border-b-2 transition-all ${ch10Tab === "physiology" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Quantum Physiology
              </button>
            </div>

            {/* TAB 1: QUANTUM MECHANICS */}
            {ch10Tab === "mechanics" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Superposition & Entanglement</span>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        const roll = Math.random() > 0.5 ? "Spin-Up |0>" : "Spin-Down |1>";
                        setQuantumStateLogs(prev => [`Collapsed to: ${roll} at timestamp ${Date.now()}`, ...prev.slice(0, 4)]);
                      }}
                      className="w-full bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono py-2 rounded-lg"
                    >
                      Measure Superposition Qubit (hadamard)
                    </button>

                    <button
                      onClick={() => {
                        const state = Math.random() > 0.5 ? "q1=|0>, q2=|0>" : "q1=|1>, q2=|1>";
                        setEntangledState(state);
                      }}
                      className="w-full bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono py-2 rounded-lg"
                    >
                      Entangle & Measure Bell Pair (cnot)
                    </button>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-[10px] font-mono space-y-1">
                      <div>Entangled State Readout: <span className="text-emerald-400 font-bold">{entangledState}</span></div>
                      <div className="text-slate-500 mt-2 border-t border-slate-900 pt-1">Measurement logs:</div>
                      {quantumStateLogs.map((log, i) => (
                        <div key={i} className="text-slate-400">{log}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Quantum Tunneling Simulation</span>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Barrier Potential Thickness:</span>
                        <span className="text-white font-bold">{tunnelBarrier}nm</span>
                      </div>
                      <input
                        type="range" min="10" max="150" value={tunnelBarrier}
                        onChange={(e) => setTunnelBarrier(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 flex justify-between items-center">
                      <div className="font-mono">
                        <span className="text-[10px] uppercase block text-slate-500">Tunneling Probability</span>
                        <span className="text-xl font-bold text-indigo-400">{tunnelProbability}%</span>
                      </div>
                      <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${tunnelProbability}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FRAMEWORKS & ALGORITHMS */}
            {ch10Tab === "computing" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Qiskit & Cirq Integration</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Aetherion compiles down to native IBM Qiskit and Google Cirq instructions, allowing seamless operations on genuine hardware platforms.
                  </p>
                  <pre className="text-[10px] bg-slate-950 p-4 rounded-lg font-mono text-indigo-300 leading-relaxed overflow-x-auto">
{`quantum qiskit_integration {
  qiskit_circuit = qiskit.QuantumCircuit(2, 2);
  qiskit_circuit.h(0);
  qiskit_circuit.cx(0, 1);
  return result.get_counts();
}`}
                  </pre>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Quantum Algorithms</span>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200">Grover's Search Algorithm</strong>
                        <p className="text-[10px]">Finds marked elements in unstructured databases in O(sqrt(N)) time complexity.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200">Shor's Factoring Algorithm</strong>
                        <p className="text-[10px]">Resolves prime factorization of integer boundaries in polynomial time.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: QUANTUM PHYSIOLOGY */}
            {ch10Tab === "physiology" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Photosynthesis Wave Coherence Optimizer</span>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Temperature environment:</span>
                        <span className="text-white font-bold">{photoTemp}°C</span>
                      </div>
                      <input
                        type="range" min="0" max="50" value={photoTemp}
                        onChange={(e) => setPhotoTemp(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Quantum Coherence factor:</span>
                        <span className="text-white font-bold">{photoCoherence}%</span>
                      </div>
                      <input
                        type="range" min="20" max="100" value={photoCoherence}
                        onChange={(e) => setPhotoCoherence(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 text-[11px] font-mono space-y-1 text-slate-400">
                      <div>Simulated Efficiency: <span className="text-indigo-400 font-bold">{Math.round((photoCoherence * 0.95) + (30 - photoTemp) * 0.2)}%</span></div>
                      <p className="text-[9px] text-slate-500 mt-1">Exciton energy transfer mimics organic chlorophyll behavior with optimal quantum coherence.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Orch-OR Consciousness Theories</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Explores the integration of cellular microtubules and quantum gravity thresholds (Orchestrated Objective Reduction) to solve systemic coherence paradigms.
                  </p>
                  <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-lg text-[10px] text-indigo-300 font-mono">
                    "Quantum coherence inside biological networks facilitates high-frequency, non-local logic flow."
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHAPTER 11: SCIENTIFIC COMPUTING DOMAINS */}
      {currentChapter === 11 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 11 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 11: Scientific Computing Domains</h2>
            <p>
              Provides comprehensive native libraries for physics computations, molecular dynamics, bioinformatics sequence parsing, and clinical feedback models.
            </p>

            <div className="flex border-b border-slate-850 font-mono text-[11px] overflow-x-auto">
              <button 
                onClick={() => setCh11Tab("physics")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch11Tab === "physics" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Physics
              </button>
              <button 
                onClick={() => setCh11Tab("chemistry")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch11Tab === "chemistry" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Chemistry
              </button>
              <button 
                onClick={() => setCh11Tab("biotech")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch11Tab === "biotech" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Biotech (DNA Analyzer)
              </button>
              <button 
                onClick={() => setCh11Tab("medicine")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch11Tab === "medicine" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Medicine
              </button>
            </div>

            {/* SUB-TABS Chapter 11 */}
            {ch11Tab === "physics" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Newtonian Gravity Solver</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono">Mass 1 (kg):</label>
                      <input 
                        type="number" value={m1} onChange={e => setM1(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono">Mass 2 (kg):</label>
                      <input 
                        type="number" value={m2} onChange={e => setM2(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono">Distance (m):</label>
                      <input 
                        type="number" value={dist} onChange={e => setDist(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                      />
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-center">
                    <span className="text-[9px] text-slate-500 font-mono block">Gravitational Force (G × m1 × m2 / d²)</span>
                    <span className="text-base font-bold text-indigo-400 font-mono">
                      {(6.674e-11 * m1 * m2 / Math.pow(dist || 1, 2)).toExponential(4)} N
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Einsteinian Relativity Contraction</span>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Speed (fraction of c):</span>
                        <span className="text-white font-bold">{Math.round(relSpeed * 100)}% c</span>
                      </div>
                      <input
                        type="range" min="1" max="99" step="1" value={relSpeed * 100}
                        onChange={(e) => setRelSpeed(parseInt(e.target.value) / 100)}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-[11px] space-y-1 text-slate-400">
                      <div>Lorentz Gamma Factor (γ): <span className="text-emerald-400 font-bold">{(1 / Math.sqrt(1 - Math.pow(relSpeed, 2))).toFixed(4)}</span></div>
                      <div>Relative Length Contraction: <span className="text-indigo-400 font-semibold">{Math.round(100 * Math.sqrt(1 - Math.pow(relSpeed, 2)))}%</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {ch11Tab === "chemistry" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Molecular Dynamics Simulator</span>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Thermodynamic Temperature:</span>
                      <span className="text-white font-bold">{chemTemp}K</span>
                    </div>
                    <input
                      type="range" min="10" max="250" value={chemTemp}
                      onChange={(e) => setChemTemp(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  {/* HTML5 canvas/div particle simulation */}
                  <div className="w-full h-32 bg-slate-950 border border-slate-850 rounded-lg relative overflow-hidden">
                    {particles.map((p, idx) => (
                      <div 
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full bg-indigo-400 absolute opacity-70"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Computational Drug Discovery</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Uses molecular dock screening to predict hydrogen bonding patterns and receptor binding affinities inside structural models.
                  </p>
                  <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-lg text-[10px] font-mono">
                    "Binding Free Energy prediction: -8.4 kcal/mol (Target: COVID-19 Main Protease)."
                  </div>
                </div>
              </div>
            )}

            {ch11Tab === "biotech" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">DNA Sequence Transcription Tree</span>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Enter DNA Base Pairs (A, T, G, C):</label>
                      <input 
                        type="text" value={dnaSeq} onChange={e => setDnaSeq(e.target.value.toUpperCase().replace(/[^ATGC]/g, ""))}
                        className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-2 font-mono uppercase"
                      />
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-[11px] space-y-1 text-slate-400">
                      <div>mRNA Sequence: <span className="text-indigo-400 font-bold">{dnaSeq.replace(/T/g, "U")}</span></div>
                      <div>GC Content: <span className="text-emerald-400 font-semibold">
                        {dnaSeq.length ? Math.round(100 * (dnaSeq.split("G").length + dnaSeq.split("C").length - 2) / dnaSeq.length) : 0}%
                      </span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">CRISPR Gene Editing Modeling</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Aetherion includes built-in Cas9 cleavage and Guide RNA (gRNA) alignment libraries to predict cutting efficiency at specified genomic loci.
                  </p>
                  <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-[10px] font-mono">
                    "gRNA Target: 5'-GTCGATCG-3' aligned. PAM sequence verified: NGG (CGG)."
                  </div>
                </div>
              </div>
            )}

            {ch11Tab === "medicine" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Clinical Feedback Loop</span>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Healer Dosage Level (mg):</span>
                        <span className="text-white font-bold">{healDosage} mg</span>
                      </div>
                      <input
                        type="range" min="1" max="100" value={healDosage}
                        onChange={(e) => setHealDosage(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-900 flex justify-between items-center">
                      <div className="font-mono">
                        <span className="text-[10px] uppercase block text-slate-500">Symptom Severity Index</span>
                        <span className="text-base font-bold text-red-400">{Math.round(healSymptomLevel)} / 100</span>
                      </div>
                      <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${healSymptomLevel}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Self-Healing Diagnostics</span>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      Aetherion's medicine module couples feedback telemetry to automatically trigger self-healing loops when standard indicators fall out of equilibrium.
                    </p>
                  </div>
                  <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-lg text-[9px] text-indigo-300 font-mono">
                    "Patient vital systems fully synchronized with Aetherion therapeutic monitors."
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHAPTER 12: ENGINEERING DOMAINS */}
      {currentChapter === 12 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 12 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 12: Engineering Domains</h2>
            <p>
              Aetherion models complex fluid dynamics, structural stress calculations, and features a live tuning PID control system interface.
            </p>

            <div className="flex border-b border-slate-850 font-mono text-[11px]">
              <button 
                onClick={() => setCh12Tab("aerospace")} 
                className={`py-2 px-4 border-b-2 transition-all ${ch12Tab === "aerospace" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Aerospace Engineering
              </button>
              <button 
                onClick={() => setCh12Tab("universal")} 
                className={`py-2 px-4 border-b-2 transition-all ${ch12Tab === "universal" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Universal PID Control Tuner
              </button>
            </div>

            {ch12Tab === "aerospace" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Airfoil CFD Aerodynamics</span>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Angle of Attack:</span>
                        <span className="text-white font-bold">{angleAttack}°</span>
                      </div>
                      <input
                        type="range" min="-5" max="25" value={angleAttack}
                        onChange={(e) => setAngleAttack(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-900 font-mono text-[11px] text-slate-400 space-y-1">
                      <div>Lift Coefficient (C_L): <span className="text-indigo-400 font-bold">{(angleAttack * 0.11 + 0.2).toFixed(3)}</span></div>
                      <div>Drag Coefficient (C_D): <span className="text-red-400 font-semibold">{(0.01 + Math.pow(angleAttack, 2) * 0.0015).toFixed(4)}</span></div>
                      <div>Stall Status: <span className={angleAttack > 18 ? "text-red-500 font-bold" : "text-emerald-400"}>{angleAttack > 18 ? "CRITICAL STALL" : "SANE FLOW"}</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Rocket Propulsion Calculator</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Computes delta-V capabilities for jet engines or chemical rocket cycles based on propellant mass fractions.
                  </p>
                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-[10px] font-mono space-y-1">
                    <div>Specific Impulse (Isp): <span className="text-white">350 s</span></div>
                    <div>Thrust Capacity: <span className="text-emerald-400">240,000 N</span></div>
                  </div>
                </div>
              </div>
            )}

            {ch12Tab === "universal" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">PID Parameters Tuning</span>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Proportional (Kp):</span>
                        <span className="text-white font-bold">{pidP.toFixed(2)}</span>
                      </div>
                      <input
                        type="range" min="0" max="5" step="0.1" value={pidP}
                        onChange={(e) => setPidP(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Integral (Ki):</span>
                        <span className="text-white font-bold">{pidI.toFixed(2)}</span>
                      </div>
                      <input
                        type="range" min="0" max="3" step="0.1" value={pidI}
                        onChange={(e) => setPidI(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Derivative (Kd):</span>
                        <span className="text-white font-bold">{pidD.toFixed(2)}</span>
                      </div>
                      <input
                        type="range" min="0" max="2" step="0.1" value={pidD}
                        onChange={(e) => setPidD(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Feedback Response Curve</span>
                    
                    {/* Simulated curve graph */}
                    <div className="w-full h-24 bg-slate-950 border border-slate-850 rounded-lg mt-3 flex items-end justify-between p-2">
                      {pidHistory.map((val, idx) => (
                        <div 
                          key={idx} 
                          className="w-1.5 bg-indigo-500 rounded-t"
                          style={{ height: `${Math.min(100, val)}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 text-center">Simulated response tracking to step setpoint = 1.0</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHAPTER 13: BUSINESS DOMAINS */}
      {currentChapter === 13 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 13 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 13: Business Domains</h2>
            <p>
              Aetherion models robust ledger compliance rules, market economics curves, and option pricing calculations.
            </p>

            <div className="flex border-b border-slate-850 font-mono text-[11px] overflow-x-auto">
              <button 
                onClick={() => setCh13Tab("accounting")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch13Tab === "accounting" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Double-Entry Accounting
              </button>
              <button 
                onClick={() => setCh13Tab("economics")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch13Tab === "economics" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Microeconomics Equilibrium
              </button>
              <button 
                onClick={() => setCh13Tab("finance")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch13Tab === "finance" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Finance Option Pricing
              </button>
            </div>

            {/* TAB 1: ACCOUNTING */}
            {ch13Tab === "accounting" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Double-Entry Ledger Simulator</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input 
                      type="text" placeholder="Account Name" value={newAcct} onChange={e => setNewAcct(e.target.value)}
                      className="bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                    />
                    <input 
                      type="number" value={newAmt} onChange={e => setNewAmt(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                    />
                    <select 
                      value={newType} onChange={e => setNewType(e.target.value as any)}
                      className="bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                    >
                      <option value="debit">Debit</option>
                      <option value="credit">Credit</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (!newAcct.trim()) return;
                      setLedger(prev => [...prev, { id: Date.now(), account: newAcct, amount: newAmt, type: newType }]);
                      setNewAcct("");
                    }}
                    className="w-full bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono py-1.5 rounded-lg"
                  >
                    Add Transaction
                  </button>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Active Journal Book</span>
                    <div className="bg-slate-950 border border-slate-900 rounded-lg p-3 font-mono text-[10px] h-24 overflow-y-auto custom-scrollbar">
                      {ledger.map(row => (
                        <div key={row.id} className="flex justify-between border-b border-slate-900 py-1">
                          <span className="text-slate-300">{row.account}</span>
                          <span className={row.type === "debit" ? "text-indigo-400" : "text-emerald-400"}>
                            {row.type === "debit" ? `Dr ${row.amount}` : `Cr ${row.amount}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded border border-slate-900 flex justify-between items-center text-[10px] font-mono">
                    <span>Ledger Balance checks:</span>
                    {ledger.reduce((acc, r) => acc + (r.type === "debit" ? r.amount : -r.amount), 0) === 0 ? (
                      <span className="text-emerald-400 font-bold">● BALANCED SANE</span>
                    ) : (
                      <span className="text-red-400 font-bold">⚠️ UNBALANCED DETECTED</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ECONOMICS */}
            {ch13Tab === "economics" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Market Equilibrium Curve Sliders</span>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Supply Curve Shift:</span>
                        <span className="text-white font-bold">{supplyShift > 0 ? `+${supplyShift}` : supplyShift}</span>
                      </div>
                      <input
                        type="range" min="-30" max="30" value={supplyShift}
                        onChange={(e) => setSupplyShift(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Demand Curve Shift:</span>
                        <span className="text-white font-bold">{demandShift > 0 ? `+${demandShift}` : demandShift}</span>
                      </div>
                      <input
                        type="range" min="-30" max="30" value={demandShift}
                        onChange={(e) => setDemandShift(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Equilibrium Price & Quantity</span>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[11px] space-y-1 mt-2 text-slate-400">
                      <div>Equilibrium Price (P*): <span className="text-indigo-400 font-bold">{(50 + demandShift * 0.5 - supplyShift * 0.5).toFixed(2)} USD</span></div>
                      <div>Equilibrium Quantity (Q*): <span className="text-emerald-400 font-bold">{(100 + demandShift * 0.8 + supplyShift * 0.8).toFixed(2)} units</span></div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">Calculated via microeconomic standard convergence</span>
                </div>
              </div>
            )}

            {/* TAB 3: FINANCE */}
            {ch13Tab === "finance" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Black-Scholes Parameters</span>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono">Stock Price ($):</label>
                      <input 
                        type="number" value={bsStock} onChange={e => setBsStock(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono">Strike Price ($):</label>
                      <input 
                        type="number" value={bsStrike} onChange={e => setBsStrike(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono">Time (Years):</label>
                      <input 
                        type="number" value={bsTime} onChange={e => setBsTime(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono">Volatility (%):</label>
                      <input 
                        type="number" value={bsVol} onChange={e => setBsVol(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Call Premium Valuation</span>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[11px] space-y-1 mt-2 text-slate-400">
                      {/* Standard approximations for display premium */}
                      <div>Call Option Premium (C): <span className="text-emerald-400 font-bold">${Math.max(0, (bsStock - bsStrike) + (bsVol * 0.15 * Math.sqrt(bsTime))).toFixed(2)}</span></div>
                      <div>Estimated Delta: <span className="text-indigo-400 font-bold">{(bsStock >= bsStrike ? 0.6 + (bsStock - bsStrike)*0.01 : 0.4).toFixed(3)}</span></div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">Approximations solved assuming risk-free interest rate r = 5.0%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHAPTER 14: PHILOSOPHY DOMAIN */}
      {currentChapter === 14 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 14 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 14: Philosophy Domain</h2>
            <p>
              Aetherion models modal propositions, deontology criteria, and computes utilitarian balance indices.
            </p>

            <div className="flex border-b border-slate-850 font-mono text-[11px] overflow-x-auto">
              <button 
                onClick={() => setCh14Tab("logic")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch14Tab === "logic" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Propositional Logic solver
              </button>
              <button 
                onClick={() => setCh14Tab("ethics")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch14Tab === "ethics" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Utilitarian Ethics Calculus
              </button>
              <button 
                onClick={() => setCh14Tab("ontology")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch14Tab === "ontology" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Epistemology Justification
              </button>
            </div>

            {/* TAB 1: LOGIC */}
            {ch14Tab === "logic" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Proposition Variables</span>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setPropA(!propA)}
                      className={`flex-1 py-2 rounded font-mono text-xs transition-colors ${propA ? "bg-indigo-600/20 text-white border border-indigo-500" : "bg-slate-950 text-slate-400"}`}
                    >
                      A is {propA ? "TRUE" : "FALSE"}
                    </button>
                    <button
                      onClick={() => setPropB(!propB)}
                      className={`flex-1 py-2 rounded font-mono text-xs transition-colors ${propB ? "bg-indigo-600/20 text-white border border-indigo-500" : "bg-slate-950 text-slate-400"}`}
                    >
                      B is {propB ? "TRUE" : "FALSE"}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Truth Table Resolver</span>
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[11px] space-y-1.5 text-slate-400">
                    <div>A && B = <span className={propA && propB ? "text-emerald-400" : "text-red-400"}>{(propA && propB).toString().toUpperCase()}</span></div>
                    <div>A || B = <span className={propA || propB ? "text-emerald-400" : "text-red-400"}>{(propA || propB).toString().toUpperCase()}</span></div>
                    <div>A && !B = <span className={propA && !propB ? "text-emerald-400" : "text-red-400"}>{(propA && !propB).toString().toUpperCase()}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ETHICS */}
            {ch14Tab === "ethics" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Utilitarian Calculus Stakeholders</span>
                  
                  <div className="space-y-3">
                    {ethicalStakeholders.map((sh, i) => (
                      <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-[11px] font-mono flex justify-between items-center text-slate-300">
                        <span>{sh.name}</span>
                        <div className="flex gap-3">
                          <span className="text-slate-500">Weight: {sh.weight}%</span>
                          <span className={sh.benefit > 0 ? "text-emerald-400" : "text-red-400"}>Score: {sh.benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Moral Imperative Rating</span>
                    
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-center mt-2">
                      <span className="text-[9px] text-slate-500 block">Calculated Net Utility Index</span>
                      <span className="text-xl font-bold text-emerald-400">
                        {ethicalStakeholders.reduce((acc, sh) => acc + (sh.weight * sh.benefit), 0) > 400 ? "ETHICALLY SOUND (Gi Verified)" : "MORALLY UNSTABLE (Requires Balance adjustment)"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 text-center">Preserved under Sparrow Rainbow Village 90% reallocation rules</span>
                </div>
              </div>
            )}

            {/* TAB 3: ONTOLOGY */}
            {ch14Tab === "ontology" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Epistemological Belief Justification</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sovereign algorithms verify whether sensory data is justified, true, and logical to prevent misinformation.
                  </p>
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 text-xs font-mono space-y-1 text-slate-400">
                    <div>Justified: <span className="text-emerald-400">TRUE</span></div>
                    <div>True: <span className="text-emerald-400">TRUE</span></div>
                    <div>Believed: <span className="text-emerald-400">TRUE</span></div>
                    <div className="text-indigo-400 font-bold border-t border-slate-900 pt-1 mt-1">Status: SANE KNOWLEDGE MATRIX (Gettier Guard Compliant)</div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Categorical Imperative Test</span>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      Kantian deontology forces all compiling nodes to execute strictly under universal laws, validating compliance on each step.
                    </p>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">Overseen strictly by Mrs. Codex.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHAPTER 15: EARODYNAMICS SOUND SCIENCE */}
      {currentChapter === 15 && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-xs lg:text-sm">
            <span className="text-[9px] font-mono text-indigo-400 font-bold tracking-widest uppercase block mb-1">Chapter 15 Literature</span>
            <h2 className="text-base font-bold text-white">Chapter 15: Earodynamics — Sound and Vibration Science</h2>
            <p>
              Explore the unique Aetherion domain of acoustics and vibration analysis. Adjust medium attributes and hear generated frequency cords!
            </p>

            <div className="flex border-b border-slate-850 font-mono text-[11px] overflow-x-auto">
              <button 
                onClick={() => setCh15Tab("acoustics")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch15Tab === "acoustics" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Acoustics & Vibrations
              </button>
              <button 
                onClick={() => setCh15Tab("sound")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch15Tab === "sound" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Tone Synthesizer
              </button>
              <button 
                onClick={() => setCh15Tab("philosophy")} 
                className={`py-2 px-4 border-b-2 transition-all whitespace-nowrap ${ch15Tab === "philosophy" ? "border-indigo-500 text-white font-bold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Musical Philosophy
              </button>
            </div>

            {/* TAB 1: ACOUSTICS */}
            {ch15Tab === "acoustics" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Sound Wave Propagation Solver</span>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Select Propagation Medium:</label>
                      <select 
                        value={acousticMedium} onChange={e => setAcousticMedium(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-850 text-xs text-slate-200 rounded p-1.5 font-mono"
                      >
                        <option value="air">Air (20°C)</option>
                        <option value="water">Fresh Water</option>
                        <option value="steel">Structural Steel</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Wave Frequency (Hz):</span>
                        <span className="text-white font-bold">{acousticFreq} Hz</span>
                      </div>
                      <input
                        type="range" min="100" max="2000" step="10" value={acousticFreq}
                        onChange={(e) => setAcousticFreq(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-900 font-mono text-[11px] text-slate-400 space-y-1">
                      <div>Speed of Sound (c): <span className="text-indigo-400 font-bold">{acousticMedium === "air" ? "343 m/s" : acousticMedium === "water" ? "1482 m/s" : "5960 m/s"}</span></div>
                      <div>Wavelength (λ = c / f): <span className="text-emerald-400 font-bold">
                        {((acousticMedium === "air" ? 343 : acousticMedium === "water" ? 1482 : 5960) / acousticFreq).toFixed(4)} m
                      </span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Damped Vibration analysis</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Computes mechanical natural frequencies and forced responses under spring/mass oscillation arrays.
                    </p>
                  </div>
                  <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-lg text-[10px] text-indigo-300 font-mono">
                    "Critical damping threshold resolved correctly to prevent harmonic resonance fatigue."
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TONE SYNTHESIZER */}
            {ch15Tab === "sound" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Sound Frequency Synthesizer</span>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Oscillator Frequency:</span>
                        <span className="text-white font-bold">{toneFreq} Hz</span>
                      </div>
                      <input
                        type="range" min="200" max="880" step="5" value={toneFreq}
                        onChange={(e) => setToneFreq(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <button
                      onClick={() => handlePlayTone(toneFreq, `${toneFreq}Hz`)}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2"
                    >
                      {isPlayingTone ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 animate-pulse" />}
                      {isPlayingTone ? "Synthesizing Soft Tone..." : "Synthesize Frequency Tone"}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Live Oscilloscope Graph</span>
                    
                    {/* Simulated Wave visualization */}
                    <div className="w-full h-24 bg-slate-950 border border-slate-850 rounded-lg mt-3 flex items-center justify-between p-2">
                      {waveAmplitude.map((val, idx) => (
                        <div 
                          key={idx} 
                          className="w-1.5 bg-indigo-400 rounded-full transition-all duration-75"
                          style={{ height: `${Math.max(5, 50 + val * 45)}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 text-center">FFT Spectral Analysis simulation</span>
                </div>
              </div>
            )}

            {/* TAB 3: MUSICAL PHILOSOPHY */}
            {ch15Tab === "philosophy" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Harmonic Progressions</span>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <button
                      onClick={() => { setChordType("major"); handlePlayChord("major"); }}
                      className={`p-3 rounded-lg border text-center transition-all ${chordType === "major" ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400"}`}
                    >
                      Major Triad (Peaceful)
                    </button>
                    <button
                      onClick={() => { setChordType("minor"); handlePlayChord("minor"); }}
                      className={`p-3 rounded-lg border text-center transition-all ${chordType === "minor" ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400"}`}
                    >
                      Minor Triad (Melancholic)
                    </button>
                    <button
                      onClick={() => { setChordType("augmented"); handlePlayChord("augmented"); }}
                      className={`p-3 rounded-lg border text-center transition-all ${chordType === "augmented" ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400"}`}
                    >
                      Augmented (Suspense)
                    </button>
                    <button
                      onClick={() => { setChordType("diminished"); handlePlayChord("diminished"); }}
                      className={`p-3 rounded-lg border text-center transition-all ${chordType === "diminished" ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400"}`}
                    >
                      Diminished (Chaos)
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block border-b border-slate-850 pb-2">Philosophical Resonance Readout</span>
                    
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-slate-400 text-xs mt-2 leading-relaxed min-h-[64px]">
                      {chordType === "major" && "🌞 Major harmony reflects cosmic balance, peaceful convergence, and aligned structural geometries."}
                      {chordType === "minor" && "🌧️ Minor harmony invokes deep introspective sadness, emotional healing loops, and ethical reflection."}
                      {chordType === "augmented" && "🌌 Augmented frequencies introduce spatial tension and unstable quantum superposition thresholds."}
                      {chordType === "diminished" && "🌪️ Diminished harmonics simulate cyber stress vectors, chaotic process failure, and rapid healing necessity."}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 text-center">Harmonic audio generated softness compliant with browser guidelines</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
