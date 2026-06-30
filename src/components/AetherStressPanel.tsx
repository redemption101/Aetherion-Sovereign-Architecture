import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  Zap,
  TrendingUp,
  Sliders,
  Play,
  CheckCircle,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Cpu,
  Layers,
  ArrowRight,
  Database
} from "lucide-react";

interface OptimizationPath {
  name: string;
  impact: string;
  difficulty: string;
  steps: string[];
}

interface StressReport {
  stressLevel: number;
  status: "optimal" | "warning" | "critical";
  analysis: string;
  predictions: string[];
  optimizationPaths: OptimizationPath[];
  verificationSealed: boolean;
  isSimulated?: boolean;
  hint?: string;
}

interface AetherStressPanelProps {
  throughput: number;
  throughputHistory: number[];
  onOptimize?: () => void;
}

export default function AetherStressPanel({ throughput, throughputHistory, onOptimize }: AetherStressPanelProps) {
  const [report, setReport] = useState<StressReport | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activePathIdx, setActivePathIdx] = useState<number | null>(null);
  const [applyingTactic, setApplyingTactic] = useState<string | null>(null);
  const [appliedTactics, setAppliedTactics] = useState<string[]>([]);

  const fetchStressReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/aetherion/stress-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          throughput,
          throughputHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to compile diagnosis report.");
      }

      const data = await response.json();
      setReport(data);
      setActivePathIdx(0); // auto-expand first path
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during state telemetry.");
    } finally {
      setLoading(false);
    }
  };

  const applyOptimization = (tacticName: string) => {
    setApplyingTactic(tacticName);
    
    // Simulate hot-patching deployment pipeline
    setTimeout(() => {
      setApplyingTactic(null);
      setAppliedTactics(prev => [...prev, tacticName]);
      
      // Update local report to reflect the relief of stress
      if (report) {
        const relief = tacticName.toLowerCase().includes("ring") ? 25 : 15;
        const newStress = Math.max(12, report.stressLevel - relief);
        setReport({
          ...report,
          stressLevel: newStress,
          status: newStress > 75 ? "critical" : newStress > 45 ? "warning" : "optimal",
          analysis: `Cluster optimization tactic [${tacticName}] hot-deployed successfully to the active BEAM-X ring. Operational overhead alleviated, restoring ideal system entropy.`
        });
      }
      
      if (onOptimize) {
        onOptimize();
      }
    }, 2000);
  };

  // Status visual attributes
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return {
          bg: "bg-red-950/40",
          border: "border-red-900/60",
          text: "text-red-400",
          accent: "from-red-600 to-rose-500",
          pill: "bg-red-500/20 text-red-300 border-red-500/30"
        };
      case "warning":
        return {
          bg: "bg-amber-950/40",
          border: "border-amber-900/60",
          text: "text-amber-400",
          accent: "from-amber-600 to-orange-500",
          pill: "bg-amber-500/20 text-amber-300 border-amber-500/30"
        };
      default:
        return {
          bg: "bg-emerald-950/40",
          border: "border-emerald-900/60",
          text: "text-emerald-400",
          accent: "from-emerald-600 to-teal-500",
          pill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
        };
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
      {/* Decorative gradient background elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold font-mono">
              Aether Stress Analysis Engine
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              AI-driven predictive cluster diagnostic leveraging high-performance Gemini modeling.
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Gemini Integrated
            </span>
          </div>
        </div>

        {/* Generate Trigger */}
        {!report && !loading && (
          <div className="my-10 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Database className="w-7 h-7 text-indigo-400/80" />
            </div>
            <div className="max-w-md mx-auto">
              <h5 className="text-xs font-semibold text-slate-200 uppercase font-mono tracking-wider">
                Generate Sovereign stress profile
              </h5>
              <p className="text-[11px] text-slate-400 mt-1">
                Reads active {throughput.toFixed(1)} GB/s cluster throughput trends and invokes a server-side Gemini 3.5 diagnostic.
              </p>
            </div>
            <button
              onClick={fetchStressReport}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase py-2.5 px-6 rounded-lg shadow-[0_4px_14px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_20px_rgba(79,70,229,0.45)] active:scale-[0.98] transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Analyze Active Cluster
            </button>
          </div>
        )}

        {/* Loading representation */}
        {loading && (
          <div className="my-12 text-center space-y-4">
            <div className="relative w-12 h-12 mx-auto">
              <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest animate-pulse">
                Analyzing BEAM-X Telemetry...
              </p>
              <p className="text-[10px] text-slate-500">
                Evaluating queue densities, supervisor states, and compiling predictions.
              </p>
            </div>
          </div>
        )}

        {/* Error Representation */}
        {error && (
          <div className="my-8 p-4 bg-red-950/20 border border-red-900/40 rounded-lg text-red-400 text-xs space-y-3">
            <div className="flex items-center gap-2 font-mono font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>DIAGNOSTIC TELEMETRY COLLAPSE</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">{error}</p>
            <button
              onClick={fetchStressReport}
              className="bg-red-950/60 hover:bg-red-950 text-red-300 border border-red-900/50 py-1.5 px-3 rounded text-[10px] font-mono uppercase"
            >
              Re-attempt Simulation
            </button>
          </div>
        )}

        {/* Report presentation */}
        {report && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 space-y-5"
          >
            {/* Status & Gauge Row */}
            <div className={`p-4 rounded-xl border ${getStatusColor(report.status).bg} ${getStatusColor(report.status).border} grid grid-cols-1 md:grid-cols-3 gap-4 items-center`}>
              {/* Gauge Column */}
              <div className="col-span-1 flex flex-col items-center justify-center text-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* Circular progress background */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800/80"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="transition-all duration-1000 ease-out"
                      strokeDasharray={`${report.stressLevel}, 100`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      stroke="url(#gradient)"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#4f46e5" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-bold font-mono text-white">{report.stressLevel}%</span>
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">STRESS</span>
                  </div>
                </div>
              </div>

              {/* Status & Details Column */}
              <div className="col-span-2 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold font-mono border px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getStatusColor(report.status).pill}`}>
                    {report.status} STATUS
                  </span>
                  {report.isSimulated && (
                    <span className="text-[8px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded uppercase">
                      Simulated Fallback
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {report.analysis}
                </p>
              </div>
            </div>

            {/* Predictive Analysis Section */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-indigo-400" /> Predictive Fail-Safe Scenarios (60 Min Outlook)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {report.predictions.map((p, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg text-[10px] leading-relaxed text-slate-400 font-sans flex items-start gap-2">
                    <span className="text-indigo-400 text-xs mt-0.5">•</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action Tactics */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-indigo-400" /> Tailored Cluster Optimization Paths
                </span>
                <span className="text-[8.5px] font-mono text-slate-500">
                  Select a tactic to review deployment steps
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {report.optimizationPaths.map((path, idx) => {
                  const isExpanded = activePathIdx === idx;
                  const isTacticApplied = appliedTactics.includes(path.name);
                  const isTacticApplying = applyingTactic === path.name;

                  return (
                    <div
                      key={idx}
                      className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? "bg-slate-950/80 border-slate-700/60 shadow-lg"
                          : "bg-slate-950/40 border-slate-850 hover:border-slate-800"
                      }`}
                    >
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => setActivePathIdx(isExpanded ? null : idx)}
                        className="w-full p-3 flex justify-between items-start text-left"
                      >
                        <div className="space-y-1 pr-2">
                          <h6 className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-tight">
                            {path.name}
                          </h6>
                          <div className="flex gap-2">
                            <span className="text-[8px] font-sans text-slate-400">
                              Impact: <strong className="text-indigo-400">{path.impact}</strong>
                            </span>
                            <span className="text-[8px] font-sans text-slate-400">
                              Difficulty: <strong className="text-purple-400">{path.difficulty}</strong>
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-1">
                          {isTacticApplied && (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                          <div className={`w-1.5 h-1.5 rounded-full ${isExpanded ? "bg-indigo-400" : "bg-slate-600"}`} />
                        </div>
                      </button>

                      {/* Accordion Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-3 pb-3 pt-0 border-t border-slate-900/60 bg-slate-950/50"
                          >
                            <div className="space-y-2 mt-2">
                              <span className="text-[8.5px] font-mono text-slate-500 uppercase block tracking-wider">
                                Recommended Deployment Steps:
                              </span>
                              <ol className="space-y-1.5">
                                {path.steps.map((step, sIdx) => (
                                  <li key={sIdx} className="text-[9.5px] text-slate-400 flex items-start gap-1.5 leading-relaxed">
                                    <span className="text-indigo-500/80 font-mono font-bold">{sIdx + 1}.</span>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ol>

                              {/* Action Trigger inside Accordion */}
                              <div className="pt-2">
                                <button
                                  disabled={isTacticApplied || isTacticApplying}
                                  onClick={() => applyOptimization(path.name)}
                                  className={`w-full py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${
                                    isTacticApplied
                                      ? "bg-emerald-950/30 text-emerald-400 border border-emerald-900/40"
                                      : isTacticApplying
                                      ? "bg-indigo-950/50 text-indigo-400 border border-indigo-900/40 animate-pulse"
                                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-[0.98]"
                                  }`}
                                >
                                  {isTacticApplying ? (
                                    <>
                                      <RefreshCw className="w-3 h-3 animate-spin" />
                                      <span>Compiling Patch...</span>
                                    </>
                                  ) : isTacticApplied ? (
                                    <>
                                      <CheckCircle className="w-3 h-3" />
                                      <span>Tactic Applied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-3 h-3" />
                                      <span>Apply Optimization Tactic</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hint or Instruction Banner */}
            {report.hint && (
              <div className="p-2.5 bg-indigo-950/20 border border-indigo-900/30 rounded-lg text-indigo-300 text-[9.5px] leading-relaxed flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                <span>{report.hint}</span>
              </div>
            )}

            {/* Action buttons footer */}
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 border-t border-slate-900 pt-3">
              <span>Diagnostic Integrity Hash: a3f191b2c</span>
              <button
                onClick={fetchStressReport}
                className="hover:text-slate-300 transition-colors flex items-center gap-1"
                title="Fetch latest stress snapshot"
              >
                <RefreshCw className="w-2.5 h-2.5" /> Re-scan Telemetry
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
