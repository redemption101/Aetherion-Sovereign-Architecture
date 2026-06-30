import React, { useState } from "react";
import { motion } from "motion/react";
import { Zap, Activity, Info } from "lucide-react";

export default function QuantumVisualizer() {
  const [q0, setQ0] = useState({ alpha: 1, beta: 0 }); // |psi> = alpha|0> + beta|1>
  const [q1, setQ1] = useState({ alpha: 1, beta: 0 });
  const [entangled, setEntangled] = useState(false);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measuredValues, setMeasuredValues] = useState<[number, number] | null>(null);

  // Gates
  const applyHadamard = () => {
    setMeasuredValues(null);
    if (entangled) {
      // Hadamard on q0 breaks basic entanglement or shifts its state
      setQ0({ alpha: 1 / Math.sqrt(2), beta: 1 / Math.sqrt(2) });
      setEntangled(false);
    } else {
      // Superposition state: 50% / 50%
      setQ0({ alpha: 1 / Math.sqrt(2), beta: 1 / Math.sqrt(2) });
    }
  };

  const applyPauliX = () => {
    setMeasuredValues(null);
    if (entangled) {
      // Invert q1 in entanglement
      setQ1(prev => ({ alpha: prev.beta, beta: prev.alpha }));
    } else {
      setQ0(prev => ({ alpha: prev.beta, beta: prev.alpha }));
    }
  };

  const applyPauliZ = () => {
    setMeasuredValues(null);
    // Phase shift: changes sign of beta
    setQ0(prev => ({ alpha: prev.alpha, beta: -prev.beta }));
  };

  const applyCNOT = () => {
    setMeasuredValues(null);
    // Control q0, target q1
    // If q0 has superposition (e.g. Hadamard already applied), entangle them!
    if (Math.abs(q0.alpha - 1 / Math.sqrt(2)) < 0.01) {
      setEntangled(true);
      setQ1({ alpha: 1 / Math.sqrt(2), beta: 1 / Math.sqrt(2) });
    } else {
      // Standard conditional swap of q1 if q0 is |1>
      if (q0.beta === 1) {
        setQ1(prev => ({ alpha: prev.beta, beta: prev.alpha }));
      }
    }
  };

  const triggerCollapse = () => {
    setIsMeasuring(true);
    setMeasuredValues(null);
    
    setTimeout(() => {
      let m0 = 0;
      let m1 = 0;

      if (entangled) {
        // Highly correlated: both 0 or both 1
        const rand = Math.random();
        const outcome = rand > 0.5 ? 1 : 0;
        m0 = outcome;
        m1 = outcome;
      } else {
        const rand0 = Math.random();
        const p0_0 = Math.pow(q0.alpha, 2);
        m0 = rand0 < p0_0 ? 0 : 1;

        const rand1 = Math.random();
        const p1_0 = Math.pow(q1.alpha, 2);
        m1 = rand1 < p1_0 ? 0 : 1;
      }

      setMeasuredValues([m0, m1]);
      
      // Update state post-measurement to collapsed values
      setQ0({ alpha: m0 === 0 ? 1 : 0, beta: m0 === 1 ? 1 : 0 });
      setQ1({ alpha: m1 === 0 ? 1 : 0, beta: m1 === 1 ? 1 : 0 });
      setEntangled(false);
      setIsMeasuring(false);
    }, 700);
  };

  const resetQubits = () => {
    setQ0({ alpha: 1, beta: 0 });
    setQ1({ alpha: 1, beta: 0 });
    setEntangled(false);
    setMeasuredValues(null);
  };

  // Bloch Sphere Coordinates calculation for simple projection
  // theta/phi derived simply
  const prob0_1 = Math.pow(q0.beta, 2); // Prob of state |1>
  const angle = prob0_1 * 180; // project angle on vector

  return (
    <div className="space-y-5 p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-purple-400" />
          <h4 className="font-semibold text-zinc-100 text-sm tracking-wide">QUANTUM MECHANICS CORE</h4>
        </div>
        {entangled && (
          <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-full font-mono animate-pulse">
            ENTANGLED (BELL STATE)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Qubit 0 Bloch representation */}
        <div className="p-4 bg-zinc-950 border border-zinc-800/70 rounded-xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-2 left-2 flex items-center space-x-1.5 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping" />
            <span className="text-[9px] font-mono text-cyan-400">QUBIT q0</span>
          </div>

          <div className="w-24 h-24 my-6 relative flex items-center justify-center">
            {/* Virtual Bloch Sphere visual */}
            <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700/60 animate-spin" style={{ animationDuration: "30s" }} />
            <div className="absolute inset-2 rounded-full border border-zinc-800 flex items-center justify-center">
              <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100">
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeDasharray="3" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeDasharray="3" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            
            {/* Projection Vector */}
            <motion.div
              className="absolute w-1 h-12 bg-cyan-400 origin-bottom rounded-full"
              style={{
                bottom: "50%",
                transformOrigin: "bottom center",
                rotate: `${angle}deg`
              }}
            />
          </div>

          <div className="w-full space-y-2 mt-2">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>|0⟩ Ground</span>
              <span>{(Math.pow(q0.alpha, 2) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.pow(q0.alpha, 2) * 100}%` }} />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>|1⟩ Excited</span>
              <span>{(Math.pow(q0.beta, 2) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.pow(q0.beta, 2) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Qubit 1 Bloch representation */}
        <div className="p-4 bg-zinc-950 border border-zinc-800/70 rounded-xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-2 left-2 flex items-center space-x-1.5 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
            <span className={`w-2 h-2 rounded-full ${entangled ? "bg-purple-400 animate-pulse" : "bg-zinc-600"} inline-block`} />
            <span className="text-[9px] font-mono text-zinc-400">QUBIT q1</span>
          </div>

          <div className="w-24 h-24 my-6 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700/60 animate-spin" style={{ animationDuration: "25s" }} />
            <div className="absolute inset-2 rounded-full border border-zinc-800 flex items-center justify-center">
              <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100">
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeDasharray="3" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeDasharray="3" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            
            <motion.div
              className={`absolute w-1 h-12 ${entangled ? "bg-purple-400" : "bg-purple-500"} origin-bottom rounded-full`}
              style={{
                bottom: "50%",
                transformOrigin: "bottom center",
                rotate: `${entangled ? angle : Math.pow(q1.beta, 2) * 180}deg`
              }}
            />
          </div>

          <div className="w-full space-y-2 mt-2">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>|0⟩ Ground</span>
              <span>{((entangled ? Math.pow(q0.alpha, 2) : Math.pow(q1.alpha, 2)) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full transition-all duration-300" style={{ width: `${(entangled ? Math.pow(q0.alpha, 2) : Math.pow(q1.alpha, 2)) * 100}%` }} />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>|1⟩ Excited</span>
              <span>{((entangled ? Math.pow(q0.beta, 2) : Math.pow(q1.beta, 2)) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full transition-all duration-300" style={{ width: `${(entangled ? Math.pow(q0.beta, 2) : Math.pow(q1.beta, 2)) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Measurement readout */}
      {measuredValues && (
        <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between animate-fade-in">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-zinc-400 font-mono">Measurement Collapse Readout:</span>
          </div>
          <span className="font-mono text-sm text-emerald-400 font-bold bg-zinc-900 px-3 py-1 border border-zinc-800 rounded">
            q0 = |{measuredValues[0]}⟩, q1 = |{measuredValues[1]}⟩
          </span>
        </div>
      )}

      {/* Control Gates Buttons */}
      <div className="flex flex-wrap gap-2 pt-1.5">
        <button
          onClick={applyHadamard}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-700 transition-colors flex items-center space-x-1"
        >
          <span>H (Hadamard)</span>
        </button>
        <button
          onClick={applyPauliX}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-700 transition-colors flex items-center space-x-1"
        >
          <span>X (Pauli-X)</span>
        </button>
        <button
          onClick={applyPauliZ}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-700 transition-colors flex items-center space-x-1"
        >
          <span>Z (Pauli-Z)</span>
        </button>
        <button
          onClick={applyCNOT}
          className="bg-zinc-800 hover:bg-zinc-700 text-purple-400 px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-700 transition-colors flex items-center space-x-1"
        >
          <span>CNOT (Entangle)</span>
        </button>
        <button
          onClick={triggerCollapse}
          disabled={isMeasuring}
          className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-zinc-950 px-4 py-1.5 rounded-lg text-xs font-sans font-bold transition-all flex items-center space-x-1 ml-auto"
        >
          <span>{isMeasuring ? "COLLAPSING..." : "MEASURE (COLLAPSE)"}</span>
        </button>
        <button
          onClick={resetQubits}
          className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-800 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="p-3 bg-purple-950/25 border border-purple-900/40 rounded-lg text-[11px] text-purple-300/90 flex items-start space-x-2">
        <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Quantum Mechanics Integration (Chapter 10):</strong> Applying an <strong>H (Hadamard) gate</strong> places the qubit in a coherent superposition. Applying <strong>CNOT (Controlled-NOT)</strong> binds their probabilities together. Measurement collapses the wave-function into a classical 0 or 1.
        </p>
      </div>
    </div>
  );
}
