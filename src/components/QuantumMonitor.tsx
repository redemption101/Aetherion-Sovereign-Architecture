import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  RefreshCw,
  Zap,
  Sliders,
  ShieldCheck,
  Flame,
  AlertTriangle,
  Cpu,
  Radio,
  Play,
  Pause,
  Compass,
  Info,
  Maximize2
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";

// Definition of simulated Aetherion processes with unique quantum signatures
interface AetherionProcess {
  id: string;
  name: string;
  module: string;
  baseVariance: number; // base variance scale (0 to 0.25)
  fluctuation: number;  // volatility of state
  coherenceTrend: "oscillating" | "stable" | "degraded" | "chaotic" | "spiky";
  color: string;
  description: string;
}

const PROCESS_LIST: AetherionProcess[] = [
  {
    id: "hello_hub",
    name: "1. Hello Sovereign Universe",
    module: "hello_world_hub.erl",
    baseVariance: 0.12,
    fluctuation: 0.04,
    coherenceTrend: "stable",
    color: "#06b6d4", // cyan-500
    description: "Standard sovereign context running a basic quantum circuit greeting superposition."
  },
  {
    id: "bell_ent",
    name: "2. Quantum Bell Entanglement",
    module: "bell_entanglement.erl",
    baseVariance: 0.22,
    fluctuation: 0.08,
    coherenceTrend: "spiky",
    color: "#a855f7", // purple-500
    description: "Bell pair state entanglement showing highly correlated qubits with maximum variance spikes."
  },
  {
    id: "telemetry",
    name: "3. Self-Healing Telemetry",
    module: "telemetry_agent.erl",
    baseVariance: 0.08,
    fluctuation: 0.03,
    coherenceTrend: "degraded",
    color: "#f97316", // orange-500
    description: "Aerospace sensor flight node prone to quantum decoherence, triggers automated self-healing supervision."
  },
  {
    id: "cyber_shield",
    name: "4. Sun Tzu Cyber Shield",
    module: "threat_neutralizer.erl",
    baseVariance: 0.15,
    fluctuation: 0.12,
    coherenceTrend: "chaotic",
    color: "#ef4444", // red-500
    description: "Bushido active threat-neutralizer showing highly reactive quantum state defenses."
  },
  {
    id: "acoustic_sweep",
    name: "5. Earodynamics Acoustic Resonance",
    module: "sonic_sweep.erl",
    baseVariance: 0.16,
    fluctuation: 0.02,
    coherenceTrend: "oscillating",
    color: "#ec4899", // pink-500
    description: "Earodynamics acoustic waves calculated as resonance swept across healing Solfeggio frequencies."
  },
  {
    id: "triple_ledger",
    name: "6. Triple-Entry Sovereign Ledger",
    module: "financial_ledger.erl",
    baseVariance: 0.05,
    fluctuation: 0.01,
    coherenceTrend: "stable",
    color: "#10b981", // emerald-500
    description: "Zero-entropy accounting double-entry ledger routing 90% royalties to local villages."
  }
];

interface ChartDataPoint {
  time: string;
  variance: number;
  coherence: number;
  entropy: number;
}

export default function QuantumMonitor() {
  const [selectedProcessId, setSelectedProcessId] = useState<string>("hello_hub");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [phaseShift, setPhaseShift] = useState<number>(0); // manual phase adjustment in degrees
  const [noiseLevel, setNoiseLevel] = useState<number>(0.0); // extra noise factor injected
  const [coherenceLock, setCoherenceLock] = useState<boolean>(false); // forces perfect sync

  const selectedProcess = PROCESS_LIST.find((p) => p.id === selectedProcessId) || PROCESS_LIST[0];

  // Ref to track historical counter for generating timestamps
  const counterRef = useRef<number>(0);

  // Helper to generate a single new data point based on current active state
  const generateDataPoint = (proc: AetherionProcess, pShift: number, noise: number, lock: boolean): ChartDataPoint => {
    const timestamp = `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    
    if (lock) {
      // Coherence Lock forces variance to absolute optimum stable levels
      return {
        time: timestamp,
        variance: parseFloat((0.02 + Math.random() * 0.01).toFixed(4)),
        coherence: parseFloat((98.5 + Math.random() * 1.5).toFixed(1)),
        entropy: parseFloat((0.05 + Math.random() * 0.02).toFixed(3))
      };
    }

    let calculatedVariance = proc.baseVariance;
    const timeFactor = Date.now() / 1000;

    // Apply specific trends depending on process profile
    switch (proc.coherenceTrend) {
      case "stable":
        calculatedVariance += Math.sin(timeFactor) * 0.01 + (Math.random() - 0.5) * proc.fluctuation;
        break;
      case "oscillating":
        // Wave sweep
        calculatedVariance = proc.baseVariance + Math.sin(timeFactor * 1.5) * 0.08 + (Math.random() - 0.5) * proc.fluctuation;
        break;
      case "spiky":
        // Periodic quantum entanglement synchronization jumps
        const isSpike = Math.random() > 0.82;
        calculatedVariance = isSpike 
          ? 0.245 - Math.random() * 0.01
          : 0.10 + Math.sin(timeFactor * 2) * 0.04 + (Math.random() - 0.5) * proc.fluctuation;
        break;
      case "degraded":
        // Slowly decreasing coherence unless repaired
        calculatedVariance = Math.min(0.25, proc.baseVariance + (timeFactor % 20) * 0.006 + (Math.random() - 0.5) * proc.fluctuation);
        break;
      case "chaotic":
        calculatedVariance = proc.baseVariance + (Math.random() - 0.5) * proc.fluctuation * 1.8;
        break;
    }

    // Incorporate phase shift adjustments: 
    // Shifting phase alters wave probability amplitudes, which affects quantum variance: V = P * (1 - P)
    // Shift alters P(1) by a cosine factor of the phase shift angle
    const phaseRad = (pShift * Math.PI) / 180;
    calculatedVariance = calculatedVariance * Math.abs(Math.cos(phaseRad));

    // Incorporate injected noise
    calculatedVariance += noise * 0.15;

    // Pin variance strictly to physical limits [0, 0.25]
    // Max variance of a single qubit state psi = alpha|0> + beta|1> is 0.25 (when alpha = beta = 1/sqrt(2))
    calculatedVariance = Math.max(0.001, Math.min(0.25, calculatedVariance));

    // Calculate Coherence based on variance (lower variance generally equals higher coherence, except in lock)
    // Perfect classical states (variance = 0) have 100% stable cohesion, maximum superposition (variance = 0.25) has 50% cohesion
    let calculatedCoherence = 100 - (calculatedVariance * 200) - (noise * 30);
    calculatedCoherence = Math.max(10, Math.min(99.9, calculatedCoherence));

    // Entropy is computed directly from variance using Shannon/Von Neumann formula approximation
    // S = -p*log(p) - (1-p)*log(1-p).
    // Let's approximate: entropy matches the variance shape directly, scaling to 1.0 at max variance (0.25)
    let calculatedEntropy = Math.sin((calculatedVariance / 0.25) * (Math.PI / 2));
    calculatedEntropy = parseFloat(calculatedEntropy.toFixed(3));

    return {
      time: timestamp,
      variance: parseFloat(calculatedVariance.toFixed(4)),
      coherence: parseFloat(calculatedCoherence.toFixed(1)),
      entropy: calculatedEntropy
    };
  };

  // Populate initial historical data on mount
  useEffect(() => {
    let dummyData: ChartDataPoint[] = [];
    const now = Date.now();
    for (let i = 14; i >= 0; i--) {
      const pastTime = new Date(now - i * 1500);
      const timestamp = `${pastTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
      
      // Seed with some stable variance matching the base
      let v = selectedProcess.baseVariance + (Math.random() - 0.5) * selectedProcess.fluctuation;
      v = Math.max(0.01, Math.min(0.25, v));
      let c = 100 - (v * 200);
      let s = Math.sin((v / 0.25) * (Math.PI / 2));

      dummyData.push({
        time: timestamp,
        variance: parseFloat(v.toFixed(4)),
        coherence: parseFloat(Math.max(20, Math.min(99, c)).toFixed(1)),
        entropy: parseFloat(s.toFixed(3))
      });
    }
    setChartData(dummyData);
  }, [selectedProcessId]);

  // Handle active heart-beat tick updates
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setChartData((prev) => {
        const nextPoint = generateDataPoint(selectedProcess, phaseShift, noiseLevel, coherenceLock);
        // keep a rolling 15 items on chart
        return [...prev.slice(1), nextPoint];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, selectedProcessId, phaseShift, noiseLevel, coherenceLock]);

  // Instantly apply a manual phase reset/shift pulse
  const triggerPhasePulse = () => {
    setPhaseShift((prev) => (prev + 90) % 360);
  };

  // Instantly reset noise factors and coherence locks
  const clearInterferences = () => {
    setNoiseLevel(0.0);
    setCoherenceLock(false);
    setPhaseShift(0);
  };

  const currentVariance = chartData[chartData.length - 1]?.variance || selectedProcess.baseVariance;
  const currentCoherence = chartData[chartData.length - 1]?.coherence || 85.0;
  const currentEntropy = chartData[chartData.length - 1]?.entropy || 0.45;

  return (
    <div className="space-y-5 p-5 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col justify-between">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-indigo-400 animate-pulse" />
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
              Quantum State Synchronization Monitor
            </h4>
            <p className="text-[10px] text-slate-400 font-sans">
              Live probability variance and coherence matrix calculations on the virtual BEAM-X runtime.
            </p>
          </div>
        </div>
        
        {/* Play/Pause indicators */}
        <div className="flex items-center space-x-2 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1 rounded text-xs transition-colors ${
              isPlaying ? "text-indigo-400 hover:bg-slate-900" : "text-slate-500 hover:bg-slate-900"
            }`}
            title={isPlaying ? "Pause Real-Time Sync" : "Play Real-Time Sync"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <span className="h-3 w-px bg-slate-800" />
          <span className="flex items-center gap-1 text-[9px] font-mono font-semibold uppercase">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-emerald-500 animate-ping" : "bg-slate-600"}`} />
            <span className={isPlaying ? "text-emerald-400" : "text-slate-500"}>
              {isPlaying ? "LIVE FEED" : "PAUSED"}
            </span>
          </span>
        </div>
      </div>

      {/* Main Grid: Selector & Metrics Sidebar with Recharts Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        
        {/* Left Side: Configuration Selector */}
        <div className="xl:col-span-1 space-y-3.5">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider">
              Select Active Process Node
            </label>
            <div className="relative">
              <select
                value={selectedProcessId}
                onChange={(e) => setSelectedProcessId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg p-2 text-xs font-mono focus:border-indigo-500 focus:outline-none appearance-none cursor-pointer"
              >
                {PROCESS_LIST.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                <Sliders className="w-3.5 h-3.5 text-slate-600" />
              </div>
            </div>
          </div>

          {/* Process Meta Info Box */}
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold font-mono text-slate-400 uppercase truncate max-w-[120px]">
                {selectedProcess.module}
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedProcess.color }}
              />
            </div>
            <p className="text-[10px] text-slate-400 leading-normal font-sans">
              {selectedProcess.description}
            </p>
          </div>

          {/* Live Probability Variance Stats */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 border border-slate-850 bg-slate-950/30 rounded-lg">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Variance σ²</span>
              <span className="text-sm font-mono font-bold text-indigo-400">{currentVariance.toFixed(4)}</span>
            </div>
            <div className="p-2 border border-slate-850 bg-slate-950/30 rounded-lg">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Coherence</span>
              <span className="text-sm font-mono font-bold text-cyan-400">{currentCoherence}%</span>
            </div>
          </div>
        </div>

        {/* Right Side: Recharts Line Chart Visualization */}
        <div className="xl:col-span-3 bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
          
          {/* Chart top indicators */}
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-2.5">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Radio className="w-3 h-3 text-indigo-400" /> Probability Amplitude Dispersion Curve
            </span>
            <div className="flex space-x-3.5">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Variance (0.00 to 0.25)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Coherence % (Scaled)
              </span>
            </div>
          </div>

          {/* Actual Recharts Element */}
          <div className="w-full h-44 mt-1.5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#475569"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "9px", fontFamily: "monospace" }}
                />
                <YAxis
                  stroke="#475569"
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 0.26]}
                  style={{ fontSize: "9px", fontFamily: "monospace" }}
                />
                <Tooltip
                  cursor={{ stroke: "#4f46e5", strokeWidth: 1, strokeDasharray: "4 4" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as ChartDataPoint;
                      return (
                        <div className="bg-slate-900 border border-slate-800 p-2 rounded shadow-xl font-mono text-[10px] space-y-1">
                          <p className="text-slate-500 font-bold">{data.time}</p>
                          <p className="text-indigo-400">Variance: <strong className="text-white">{data.variance}</strong></p>
                          <p className="text-cyan-400">Coherence: <strong className="text-white">{data.coherence}%</strong></p>
                          <p className="text-emerald-400">Entropy: <strong className="text-white">{data.entropy} nats</strong></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {/* Horizontal reference lines for critical limits */}
                <ReferenceLine y={0.25} stroke="#dc2626" strokeDasharray="3 3" strokeOpacity={0.4} />
                <ReferenceLine y={0.125} stroke="#475569" strokeDasharray="4 4" strokeOpacity={0.2} />

                {/* Variance line */}
                <Line
                  name="Variance"
                  type="monotone"
                  dataKey="variance"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={{ r: 0, fill: "#6366f1" }}
                  activeDot={{ r: 4, strokeWidth: 1 }}
                  animationDuration={300}
                />
                
                {/* Secondary Coherence Line scaled down to match chart axis domain [0, 0.25] */}
                {/* Scaled calculation: coherence_mapped = (coherence / 100) * 0.25 */}
                <Line
                  name="Coherence"
                  type="monotone"
                  dataKey={(d) => (d.coherence / 100) * 0.25}
                  stroke="#06b6d4"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={{ r: 0, fill: "#06b6d4" }}
                  activeDot={{ r: 3 }}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats Footer inside Chart card */}
          <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 mt-2 border-t border-slate-900 pt-2 relative z-10">
            <span>Critical Superposition Limit: 0.25 σ²</span>
            <span>Entropy Density: {currentEntropy} H(X)</span>
          </div>

        </div>

      </div>

      {/* Interactive Controls & Interference Injection Section */}
      <div className="bg-slate-950/40 border border-slate-850 rounded-xl p-4 space-y-3.5">
        <h5 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Quantum Interference & Synthesis Controllers
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Phase angle selector */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-500">Angle Phase Shift (θ)</span>
              <span className="text-indigo-400 font-bold">{phaseShift}°</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={phaseShift}
                onChange={(e) => setPhaseShift(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <button
                onClick={triggerPhasePulse}
                className="bg-slate-900 hover:bg-slate-800 text-[9px] font-mono text-slate-400 hover:text-white border border-slate-800 rounded px-1.5 py-0.5"
                title="Pulse phase 90 degrees"
              >
                +90°
              </button>
            </div>
          </div>

          {/* Noise Injection slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-500 flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-500" /> Environmental Decoupling Noise
              </span>
              <span className="text-orange-400 font-bold">{(noiseLevel * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={noiseLevel}
              onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
              className="w-full accent-orange-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Quick buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setCoherenceLock(!coherenceLock)}
              className={`flex-1 text-[11px] font-mono font-bold py-1.5 px-3 rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                coherenceLock
                  ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{coherenceLock ? "COHERENCE LOCKED" : "LOCK COHERENCE"}</span>
            </button>
            
            {(phaseShift !== 0 || noiseLevel > 0 || coherenceLock) && (
              <button
                onClick={clearInterferences}
                className="text-[11px] font-mono py-1.5 px-2.5 rounded-lg border border-red-900/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 transition-all"
                title="Clear all manual adjustments"
              >
                Reset Controls
              </button>
            )}
          </div>

        </div>

        {/* Dynamic Warning Alert on high variance/noise */}
        <AnimatePresence>
          {noiseLevel > 0.4 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-2.5 bg-amber-950/25 border border-amber-900/40 rounded-lg text-amber-300 text-[10px] flex items-start gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="leading-normal">
                <strong>Decoherence warning:</strong> Manual interference exceeding 40% degrades thread scheduling stability. If synchronization slips below 60%, the supervisor will activate hot repairs automatically.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
