import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, HeartPulse, RefreshCw, AlertTriangle, Play, HelpCircle } from "lucide-react";

interface FaultStep {
  stage: string;
  action: string;
  duration: number;
  status: string;
}

export default function SelfHealingPanel() {
  const [activeFault, setActiveFault] = useState<string | null>(null);
  const [simulationSteps, setSimulationSteps] = useState<FaultStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState(false);

  const FAULTS = [
    { id: "memory_leak", label: "Memory Overload", desc: "Violates Rust-level borrow bounds; process threatens heap depletion.", color: "text-amber-500 hover:bg-amber-950/20" },
    { id: "network_drop", label: "Edge Sat Outage", desc: "Aerospace telemetry drops package stream below 16kbps threshold.", color: "text-cyan-500 hover:bg-cyan-950/20" },
    { id: "security_intrusion", label: "Intruder Attack", desc: "Simulates malicious penetration; triggers Sun Tzu categorizations.", color: "text-red-500 hover:bg-red-950/20" },
    { id: "crdt_desync", label: "CRDT State Split", desc: "Conflict-Free Replicated states diverge between global ground stations.", color: "text-purple-500 hover:bg-purple-950/20" }
  ];

  const injectFault = async (faultId: string) => {
    if (isSimulating) return;
    setActiveFault(faultId);
    setIsSimulating(true);
    setCurrentStepIdx(0);
    setSimulationSteps([]);

    try {
      const response = await fetch("/api/aetherion/simulate-heal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faultType: faultId })
      });
      const data = await response.json();
      setSimulationSteps(data.steps);

      // Sequentially advance through steps to show real progress
      let step = 0;
      const interval = setInterval(() => {
        if (step < data.steps.length - 1) {
          step++;
          setCurrentStepIdx(step);
        } else {
          clearInterval(interval);
          setIsSimulating(false);
        }
      }, 1000);

    } catch (err) {
      console.error(err);
      setIsSimulating(false);
    }
  };

  return (
    <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HeartPulse className="w-5 h-5 text-emerald-400" />
          <h4 className="font-semibold text-zinc-100 text-sm tracking-wide">BEAM-X SELF-HEALING SIMULATOR</h4>
        </div>
        <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ACTIVE GUARDIAN RUNNING</span>
        </div>
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed">
        <strong>Pillar 2: Resilience (Chapter 16):</strong> Test the BEAM-X runtime autonomy. Inject an intentional fault below, and watch the system's `heal` directive intercept and self-heal.
      </p>

      {/* Fault Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {FAULTS.map((fault) => (
          <button
            key={fault.id}
            onClick={() => injectFault(fault.id)}
            disabled={isSimulating}
            className={`p-3 bg-zinc-950 border border-zinc-800/80 rounded-lg text-left transition-all relative overflow-hidden group disabled:opacity-50 ${fault.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors">
                {fault.label}
              </span>
              <AlertTriangle className="w-3.5 h-3.5 opacity-60" />
            </div>
            <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-sans">
              {fault.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Simulation Feed */}
      {simulationSteps.length > 0 && (
        <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800/80 rounded-xl space-y-4">
          <h5 className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
            HEALING EXECUTION SEQUENCE:
          </h5>
          <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
            {simulationSteps.map((step, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              const isFuture = idx > currentStepIdx;

              let dotColor = "bg-zinc-800";
              let textColor = "text-zinc-500";
              let cardBg = "bg-transparent";

              if (isPast) {
                dotColor = "bg-emerald-500 ring-2 ring-emerald-900";
                textColor = "text-zinc-300";
              } else if (isCurrent) {
                dotColor = "bg-amber-500 ring-4 ring-amber-950 animate-pulse";
                textColor = "text-zinc-100 font-semibold";
                cardBg = "bg-zinc-900/60 border border-zinc-800";
              }

              return (
                <div key={idx} className={`flex items-start space-x-4 pl-1.5 py-1.5 rounded-lg transition-all ${cardBg}`}>
                  <div className={`w-3.5 h-3.5 rounded-full ${dotColor} z-10 flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono tracking-widest ${isCurrent ? "text-amber-400" : isPast ? "text-emerald-400" : "text-zinc-600"}`}>
                        STAGE {idx + 1}: {step.stage}
                      </span>
                      {isCurrent && <span className="text-[9px] font-mono text-amber-500 animate-spin"><RefreshCw className="w-3 h-3" /></span>}
                      {isPast && <span className="text-[9px] font-mono text-emerald-400">PASSED</span>}
                    </div>
                    <p className={`text-xs mt-1 font-sans leading-relaxed ${textColor}`}>
                      {step.action}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {!isSimulating && (
            <div className="p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-lg text-emerald-400 text-xs flex items-center justify-between">
              <span>Healing Loop Successfully Concluded. Core Restored.</span>
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-300">SYSTEM WELLNESS: 100%</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
