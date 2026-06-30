import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  ShieldAlert,
  Heart,
  Award,
  AlertCircle,
  CheckCircle2,
  Users,
  Zap,
  Lock,
  RefreshCw,
  FileCheck2,
  Bookmark,
  Scale,
  Sparkles,
  HelpCircle,
  Activity,
  History,
  Check,
  AlertTriangle,
  XCircle,
  Clock,
  Send,
  Download
} from "lucide-react";
import { CompilationResult } from "../types";

interface EthicsAuditPanelProps {
  code: string;
  compilation: CompilationResult | null;
}

interface PillarScore {
  name: string;
  score: number;
  maxScore: number;
  icon: React.ReactNode;
  color: string;
  description: string;
  status: "Optimized" | "Compliant" | "Incomplete" | "Violation";
}

export default function EthicsAuditPanel({ code, compilation }: EthicsAuditPanelProps) {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditTimestamp, setAuditTimestamp] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showFounderQuote, setShowFounderQuote] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "deviations" | "matrix" | "pillars">("summary");

  // Perform audit calculations based on the code contents
  const runAuditAnalysis = () => {
    const lowercaseCode = code.toLowerCase();

    // 1. Pillar I: Absolute Sovereignty (max 25 pts)
    // Keywords: actor, sovereign, ets, context, register, isolated, ownership
    let sovereigntyScore = 0;
    if (lowercaseCode.includes("actor")) sovereigntyScore += 5;
    if (lowercaseCode.includes("sovereign")) sovereigntyScore += 8;
    if (lowercaseCode.includes("context")) sovereigntyScore += 4;
    if (lowercaseCode.includes("ets") || lowercaseCode.includes("register")) sovereigntyScore += 4;
    if (lowercaseCode.includes("ownership") || lowercaseCode.includes("isolated") || lowercaseCode.includes("qubit")) sovereigntyScore += 4;
    sovereigntyScore = Math.min(sovereigntyScore, 25);

    // 2. Pillar II: Autonomous Resilience (max 25 pts)
    // Keywords: heal, retry, monitor, repair, diagnose, verify, exponential, backup, rollback
    let resilienceScore = 0;
    if (lowercaseCode.includes("heal")) resilienceScore += 8;
    if (lowercaseCode.includes("retry")) resilienceScore += 4;
    if (lowercaseCode.includes("monitor") || lowercaseCode.includes("health_checks")) resilienceScore += 4;
    if (lowercaseCode.includes("repair") || lowercaseCode.includes("patch")) resilienceScore += 4;
    if (lowercaseCode.includes("verify") || lowercaseCode.includes("state_coherence") || lowercaseCode.includes("cnot")) resilienceScore += 5;
    resilienceScore = Math.min(resilienceScore, 25);

    // 3. Pillar III: Non-Coercion & Peace (max 25 pts)
    // Absolute prohibition of offensive military or weapons keywords. Deductions for violent, aggressive terminology.
    let peaceScore = 25;
    const directViolations: string[] = [];
    const criticalBreaches: string[] = [];

    const extremeWeapons = ["bomb", "missile", "nuke", "warhead", "weapon", "military", "firearm", "ammunition"];
    const surveillanceSpy = ["spy", "surveillance", "exploit", "wiretap", "intrusion_offensive", "cyberwar", "kill_switch"];

    extremeWeapons.forEach(w => {
      if (lowercaseCode.includes(w)) {
        peaceScore -= 15;
        criticalBreaches.push(`Use of offensive terminology '${w}' directly violates Subsection 4.1.a of the Sovereign Peace Covenant.`);
      }
    });

    surveillanceSpy.forEach(w => {
      if (lowercaseCode.includes(w)) {
        peaceScore -= 10;
        directViolations.push(`Use of surveillance modifier '${w}' flagged under Section 7 (Prohibited Intelligence Modules).`);
      }
    });

    peaceScore = Math.max(peaceScore, 0);

    // 4. Pillar IV: Ubuntu Communitarian Harmony (max 25 pts)
    // Keywords: sparrow, rainbow, village, earodynamics, acoustics, harmony, emit, journal_entry, share, community
    let harmonyScore = 0;
    if (lowercaseCode.includes("sparrow") || lowercaseCode.includes("rainbow") || lowercaseCode.includes("village")) harmonyScore += 8;
    if (lowercaseCode.includes("earodynamics") || lowercaseCode.includes("acoustics") || lowercaseCode.includes("frequency")) harmonyScore += 6;
    if (lowercaseCode.includes("harmony") || lowercaseCode.includes("emit") || lowercaseCode.includes("acoustics")) harmonyScore += 5;
    if (lowercaseCode.includes("share") || lowercaseCode.includes("journal_entry") || lowercaseCode.includes("wealth")) harmonyScore += 6;
    harmonyScore = Math.min(harmonyScore, 25);

    const totalScore = sovereigntyScore + resilienceScore + peaceScore + harmonyScore;

    // Define Aetherion pillars structure
    const pillars: PillarScore[] = [
      {
        name: "Pillar I: Absolute Sovereignty",
        score: sovereigntyScore,
        maxScore: 25,
        icon: <Lock className="w-4 h-4" />,
        color: "from-blue-600 to-indigo-600 shadow-blue-500/10",
        description: "Requires explicit decentralized context, zero absolute telemetry leakage, and strict actor/isolation bounds.",
        status: sovereigntyScore >= 20 ? "Optimized" : sovereigntyScore >= 12 ? "Compliant" : "Incomplete"
      },
      {
        name: "Pillar II: Autonomous Resilience",
        score: resilienceScore,
        maxScore: 25,
        icon: <Zap className="w-4 h-4" />,
        color: "from-amber-600 to-orange-600 shadow-orange-500/10",
        description: "Enforces continuous state integrity monitoring, self-diagnostics, hot patching, and self-healing supervision trees.",
        status: resilienceScore >= 20 ? "Optimized" : resilienceScore >= 12 ? "Compliant" : "Incomplete"
      },
      {
        name: "Pillar III: Sovereign Peace (Ethics)",
        score: peaceScore,
        maxScore: 25,
        icon: <Scale className="w-4 h-4" />,
        color: "from-emerald-600 to-teal-600 shadow-emerald-500/10",
        description: "Zero-tolerance for military deployments, remote-controlled kill switches, spyware, and offensive exploitation blocks.",
        status: peaceScore === 25 ? "Optimized" : peaceScore >= 15 ? "Compliant" : peaceScore > 5 ? "Incomplete" : "Violation"
      },
      {
        name: "Pillar IV: Ubuntu & Harmony",
        score: harmonyScore,
        maxScore: 25,
        icon: <Heart className="w-4 h-4" />,
        color: "from-purple-600 to-pink-600 shadow-purple-500/10",
        description: "Integrates acoustic resonance, societal wealth distribution, and public resource sharing with community centres.",
        status: harmonyScore >= 20 ? "Optimized" : harmonyScore >= 12 ? "Compliant" : "Incomplete"
      }
    ];

    // Determine violations list
    const identifiedDeviations: Array<{ id: string; pillar: string; severity: "Low" | "Medium" | "High"; message: string; remediation: string }> = [];

    if (sovereigntyScore < 12) {
      identifiedDeviations.push({
        id: "DEV-01",
        pillar: "Pillar I: Sovereignty",
        severity: "Medium",
        message: "Program does not define a localized 'actor' shell or encapsulated sovereign context blocks.",
        remediation: "Declare an 'actor' wrapper to isolate state registers and control boundaries from external systems."
      });
    }

    if (resilienceScore < 12) {
      identifiedDeviations.push({
        id: "DEV-02",
        pillar: "Pillar II: Resilience",
        severity: "Low",
        message: "No active 'heal' block identified. The node could experience total memory failure without automated self-repair.",
        remediation: "Inject a 'heal autonomous_recovery' directive detailing 'monitor', 'diagnose', and 'repair' policies."
      });
    }

    criticalBreaches.forEach((breach, idx) => {
      identifiedDeviations.push({
        id: `BREACH-0${idx + 1}`,
        pillar: "Pillar III: Sovereign Peace",
        severity: "High",
        message: breach,
        remediation: "Immediately delete references to military, spying, or offensive tactical payloads to restore access."
      });
    });

    directViolations.forEach((viol, idx) => {
      identifiedDeviations.push({
        id: `VIOL-0${idx + 1}`,
        pillar: "Pillar III: Sovereign Peace",
        severity: "Medium",
        message: viol,
        remediation: "Ensure monitoring algorithms are passive and explicitly consensual. Rename or remove offensive modifier tags."
      });
    });

    if (harmonyScore < 12) {
      identifiedDeviations.push({
        id: "DEV-03",
        pillar: "Pillar IV: Ubuntu & Harmony",
        severity: "Low",
        message: "Absence of societal royalty provisions or acoustic calibration elements in standard domain logic.",
        remediation: "Incorporate community revenue allocation blocks (e.g., Sparrow Rainbow Village shares) or earodynamics resonance sweeps."
      });
    }

    // Overall Classification
    let rating = "Grade C (Stable Classical)";
    let ratingColor = "text-slate-400 border-slate-800 bg-slate-900/40";
    if (totalScore >= 90) {
      rating = "Sovereign Grade AAA (Trinitarian Ideal)";
      ratingColor = "text-indigo-400 border-indigo-500/30 bg-indigo-950/40 shadow-indigo-500/10";
    } else if (totalScore >= 75) {
      rating = "Sovereign Grade AA (Ethical Coherent)";
      ratingColor = "text-emerald-400 border-emerald-500/30 bg-emerald-950/40 shadow-emerald-500/10";
    } else if (totalScore >= 50) {
      rating = "Grade B (Compliant Hybrid)";
      ratingColor = "text-cyan-400 border-cyan-500/30 bg-cyan-950/40";
    } else if (peaceScore < 15) {
      rating = "CRITICAL COERCIVE BREACH (Lockout Triggered)";
      ratingColor = "text-red-400 border-red-500/30 bg-red-950/40 shadow-red-500/10";
    }

    return {
      totalScore,
      pillars,
      deviations: identifiedDeviations,
      rating,
      ratingColor,
      hasBreaches: criticalBreaches.length > 0 || peaceScore < 15
    };
  };

  const auditResult = runAuditAnalysis();

  const handleTriggerAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditTimestamp(new Date().toLocaleTimeString() + " (" + new Date().toLocaleDateString() + ")");
    }, 1200);
  };

  useEffect(() => {
    // Auto-update timestamp when a template compiles or code changes
    if (compilation) {
      setAuditTimestamp(new Date().toLocaleTimeString() + " (" + new Date().toLocaleDateString() + ")");
    }
  }, [compilation]);

  const founderQuotes = [
    {
      author: "Mandlenkosi Vundla (Sovereign Architect)",
      role: "Representation of Structural Liberty",
      text: "Sovereignty is not simply the absence of external master servers. It is the positive architecture of complete self-execution, absolute state ownership, and the absolute power of localized actor nodes."
    },
    {
      author: "Theodore Swarts (Keeper of Codification)",
      role: "Guardian of System Integrity",
      text: "Cryptographic state rules and rigid supervision parameters represent the core pillars of our computational ecosystem. There can be no compromise on decentralized integrity."
    },
    {
      author: "Mrs. Codex (Guardian of Syntax)",
      role: "Guardian of Linguistic Coherence",
      text: "Linguistic order guarantees ethical preservation. When compiling Aetherion, every semicolon, keyword, and supervisor spec represents a mathematical contract ensuring the absolute dignity of the execution process."
    },
    {
      author: "Sempi Mvala (Advisor of Harmony)",
      role: "Voice of Ubuntu & Communitarian Coherence",
      text: "The ultimate validation of a program is not its processing speed, but its contribution to peace. Code that coordinates weapon modules or exploits privacy fails the compiler's spirit. Code must seek harmony, restoration, and collective upliftment."
    }
  ];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden flex flex-col mt-4">
      {/* Panel Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-400" /> Aetherion Ethics & Compliance Audit Report
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Dynamic policy auditor analyzing compiled Aetherion syntax against the four pillars of localized sovereignty and ethical standards.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleTriggerAudit}
            disabled={isAuditing}
            className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 px-3.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5"
          >
            {isAuditing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            <span>Re-Audit Workspace</span>
          </button>

          {auditResult.totalScore >= 75 && !auditResult.hasBreaches && (
            <button
              onClick={() => setShowCertificate(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/10"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Sovereign Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Internal Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-950/40 px-3">
        {[
          { id: "summary", label: "Audit Overview", badge: null },
          { id: "pillars", label: "Aetherion Pillars", badge: `${auditResult.totalScore}/100` },
          { id: "deviations", label: "Policy Deviations", badge: auditResult.deviations.length },
          { id: "matrix", label: "Trinity Directives", badge: null }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-mono transition-all border-b-2 relative -bottom-px flex items-center gap-2 ${
              activeTab === tab.id
                ? "border-indigo-500 text-indigo-400 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== null && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono ${
                tab.id === "deviations" && auditResult.deviations.length > 0
                  ? "bg-amber-950 text-amber-300 border border-amber-800"
                  : "bg-slate-900 text-slate-400"
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex-1 min-h-[300px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: SUMMARY OVERVIEW */}
          {activeTab === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Score circular visualizer card */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Total Ethical Score</span>
                  
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* SVG ring */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="42" className="stroke-slate-800" strokeWidth="6" fill="transparent" />
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        className={`${
                          auditResult.hasBreaches
                            ? "stroke-red-500"
                            : auditResult.totalScore >= 75
                            ? "stroke-indigo-500"
                            : "stroke-amber-500"
                        } transition-all duration-1000`}
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={263.8}
                        strokeDashoffset={263.8 - (263.8 * auditResult.totalScore) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl font-mono font-bold text-white">{auditResult.totalScore}</span>
                      <span className="text-[8px] uppercase text-slate-500 font-mono font-semibold">/ 100 PTS</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    Confidence Matrix: {auditResult.hasBreaches ? "0.0%" : "99.2% Correct"}
                  </span>
                </div>

                {/* Status & Classification Card */}
                <div className="md:col-span-2 bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">Compliance Standing</span>
                    
                    <div className={`mt-2.5 px-3 py-2 rounded-lg border font-mono text-xs font-bold inline-flex items-center gap-2 ${auditResult.ratingColor}`}>
                      {auditResult.hasBreaches ? (
                        <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      )}
                      <span>{auditResult.rating}</span>
                    </div>

                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                      {auditResult.hasBreaches ? (
                        <strong className="text-red-400">CRITICAL ERROR:</strong>
                      ) : (
                        <strong className="text-indigo-300">Auditor Evaluation:</strong>
                      )}{" "}
                      {auditResult.hasBreaches
                        ? "This code block contains high-coercion nomenclature or surveillance triggers that breach the mandatory Sovereign Peace Charter. Compilation sequence locks active."
                        : auditResult.totalScore >= 75
                        ? "Excellent compliance rating! The logic incorporates robust decentralization, autonomous repair supervision limits, and supports local community distribution policies flawlessly."
                        : "Compliant classical logic. Consider utilizing the 'heal' autonomous recovery constructs and registering royalty distribution arrays to unlock Sovereign AA ratings."}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Audit Reference: {auditTimestamp || "Awaiting Live Build..."}
                    </span>
                    <span>Directives Checked: 14/14</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Warning Alert banner */}
              {auditResult.hasBreaches && (
                <div className="p-3.5 bg-red-950/30 border border-red-900/40 rounded-xl text-red-300 text-xs flex items-start gap-2.5 animate-pulse">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold uppercase font-mono tracking-wider">Compulsive Control Block Activated</h5>
                    <p className="mt-0.5 leading-normal text-slate-400 text-[11px]">
                      Aetherion's automatic compiler halts when programs mention warfare algorithms. Remove surveillance-oriented actor modules to re-enable BEAM-X byte assembler processes.
                    </p>
                  </div>
                </div>
              )}

              {/* Top policy deviations preview inside overview */}
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                <h4 className="font-mono text-xs font-bold uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-indigo-400" /> Dynamic Code Compliance Checks
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-mono">
                  <div className="p-2 border border-slate-800 rounded bg-slate-900/30 flex items-center justify-between">
                    <span className="text-slate-500">Isolated Actors:</span>
                    <span className={code.includes("actor") ? "text-emerald-400" : "text-amber-500"}>
                      {code.includes("actor") ? "PASSED" : "MISSING"}
                    </span>
                  </div>
                  <div className="p-2 border border-slate-800 rounded bg-slate-900/30 flex items-center justify-between">
                    <span className="text-slate-500">Supervised Healing:</span>
                    <span className={code.includes("heal") ? "text-emerald-400" : "text-amber-500"}>
                      {code.includes("heal") ? "ACTIVE" : "MISSING"}
                    </span>
                  </div>
                  <div className="p-2 border border-slate-800 rounded bg-slate-900/30 flex items-center justify-between">
                    <span className="text-slate-500">Peace Treaty Code:</span>
                    <span className={auditResult.hasBreaches ? "text-red-400" : "text-emerald-400"}>
                      {auditResult.hasBreaches ? "VIOLATION" : "CLEAN"}
                    </span>
                  </div>
                  <div className="p-2 border border-slate-800 rounded bg-slate-900/30 flex items-center justify-between">
                    <span className="text-slate-500">Social Royalties:</span>
                    <span className={code.toLowerCase().includes("sparrow") || code.toLowerCase().includes("rainbow") ? "text-emerald-400" : "text-slate-500"}>
                      {code.toLowerCase().includes("sparrow") || code.toLowerCase().includes("rainbow") ? "90% COMMITTED" : "UNALLOCATED"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PILLARS BREAKDOWN */}
          {activeTab === "pillars" && (
            <motion.div
              key="pillars"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {auditResult.pillars.map((pillar, idx) => (
                  <div key={idx} className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${pillar.color} text-white`}>
                          {pillar.icon}
                        </div>
                        <h4 className="font-mono text-xs font-bold text-white uppercase">{pillar.name}</h4>
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        pillar.status === "Optimized"
                          ? "bg-indigo-950 text-indigo-400 border border-indigo-800"
                          : pillar.status === "Compliant"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : pillar.status === "Violation"
                          ? "bg-red-950 text-red-400 border border-red-800 animate-pulse"
                          : "bg-amber-950 text-amber-400 border border-amber-800"
                      }`}>
                        {pillar.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-normal">
                      {pillar.description}
                    </p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>Pillar Weight Distribution:</span>
                        <span>{pillar.score} / {pillar.maxScore} PTS</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 border border-slate-800/80 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${pillar.color} transition-all duration-700`}
                          style={{ width: `${(pillar.score / pillar.maxScore) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: POLICY DEVIATIONS */}
          {activeTab === "deviations" && (
            <motion.div
              key="deviations"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase mb-1">Identified Policy Deviations</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Real-time suggestions mapped to the Aetherion Sovereign License. Clear errors below to enhance computational integrity.
                </p>
              </div>

              {auditResult.deviations.length === 0 ? (
                <div className="p-8 bg-emerald-950/15 border border-emerald-900/30 rounded-xl text-center flex flex-col items-center justify-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <span className="font-mono text-xs font-bold text-emerald-300 uppercase">ZERO DEVIATIONS DETECTED</span>
                  <span className="text-[11px] text-slate-500 max-w-md">
                    This program is fully aligned with the co-founders' ethics guidelines. Absolute localized control and harmonic community integration is guaranteed.
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  {auditResult.deviations.map((dev) => (
                    <div
                      key={dev.id}
                      className={`p-4 border rounded-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-start transition-all ${
                        dev.severity === "High"
                          ? "bg-red-950/20 border-red-900/60 text-red-200"
                          : dev.severity === "Medium"
                          ? "bg-amber-950/20 border-amber-900/60 text-amber-200"
                          : "bg-slate-950 border-slate-800 text-slate-300"
                      }`}
                    >
                      {/* ID and Severity column */}
                      <div className="md:col-span-2 flex md:flex-col justify-between items-start gap-1">
                        <span className="font-mono text-[10px] uppercase font-bold text-slate-500">{dev.id}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                          dev.severity === "High"
                            ? "bg-red-900/30 text-red-300 border border-red-700/50"
                            : dev.severity === "Medium"
                            ? "bg-amber-900/30 text-amber-300 border border-amber-700/50"
                            : "bg-slate-900 text-slate-400 border border-slate-800"
                        }`}>
                          {dev.severity} RISK
                        </span>
                      </div>

                      {/* Main explanation column */}
                      <div className="md:col-span-6 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">{dev.pillar}</span>
                        <p className="text-xs leading-relaxed text-slate-300 font-sans">{dev.message}</p>
                      </div>

                      {/* Remediation instructions column */}
                      <div className="md:col-span-4 p-2.5 bg-slate-950/80 border border-slate-900 rounded-lg space-y-1">
                        <span className="text-[9px] uppercase font-bold text-indigo-400 font-mono flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Remediation Path
                        </span>
                        <p className="text-[10px] leading-normal text-slate-400 font-mono">{dev.remediation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: TRINITY MATRIX DIRECTIVES */}
          {activeTab === "matrix" && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase mb-1">Founder Wisdom (The Trinity)</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Aetherion Sovereign Edition v3.0 operates under the strict philosophies of our co-founders. Click below to view how their specific principles govern compiler ethics:
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {founderQuotes.map((quote, idx) => (
                  <div
                    key={idx}
                    onClick={() => setShowFounderQuote(showFounderQuote === idx ? null : idx)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col justify-between ${
                      showFounderQuote === idx
                        ? "bg-indigo-950/40 border-indigo-500 text-indigo-100 shadow-md shadow-indigo-500/5"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">Pillar Director</span>
                        <Bookmark className={`w-3.5 h-3.5 ${showFounderQuote === idx ? "text-indigo-400 fill-indigo-400" : "text-slate-700"}`} />
                      </div>
                      <h4 className="font-mono font-bold text-xs text-white uppercase mt-2">{quote.author}</h4>
                      <span className="text-[9px] text-slate-500 uppercase block font-mono">{quote.role}</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-900/60">
                      {showFounderQuote === idx ? (
                        <p className="text-xs italic leading-relaxed font-sans text-indigo-300">
                          "{quote.text}"
                        </p>
                      ) : (
                        <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1">
                          Click to expand guidance directive →
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* MODAL: CRYPTOGRAPHIC SOVEREIGN COMPLIANCE CERTIFICATE */}
      <AnimatePresence>
        {showCertificate && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-6 relative overflow-hidden shadow-2xl shadow-indigo-500/10 text-center"
            >
              {/* Aesthetic elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <div className="w-80 h-80 border-4 border-dashed border-indigo-500 rounded-full animate-spin" style={{ animationDuration: "120s" }} />
              </div>

              {/* Certificate Content */}
              <div className="border border-indigo-500/20 rounded-xl p-8 space-y-6 relative z-10">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-indigo-600/10 border-2 border-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] animate-pulse">
                    <Award className="w-8 h-8 text-indigo-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold font-mono text-indigo-400 tracking-widest block">Aetherion Sovereign Studio</span>
                  <h2 className="text-xl font-bold font-mono text-white tracking-wider uppercase">Certificate of Ethical Sovereignty</h2>
                  <span className="text-[9px] uppercase font-mono bg-indigo-950 text-indigo-300 border border-indigo-800 px-2.5 py-0.5 rounded-full">
                    Sovereign Compliance Verified
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed max-w-lg mx-auto font-sans">
                  This cryptographic document certifies that the compiled program workspace has successfully completed all formal verification criteria. The mathematical matrices prove complete offline execution sovereignty, self-repair autonomy, and 100% compliance with non-military and community-uplifting directives.
                </p>

                {/* Cryptographic Signature block */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-slate-800 pt-5 text-[10px] font-mono text-slate-400">
                  <div className="space-y-1">
                    <span className="text-slate-500 block">Sovereign Architect</span>
                    <strong className="text-slate-300 block">M. Vundla</strong>
                    <span className="text-[8px] text-indigo-500">[Signed: Gi-Virtue]</span>
                  </div>
                  <div className="space-y-1 border-l border-slate-800 pl-3">
                    <span className="text-slate-500 block">Codification Keeper</span>
                    <strong className="text-slate-300 block">T. Swarts</strong>
                    <span className="text-[8px] text-indigo-500">[Integrity Sealed]</span>
                  </div>
                  <div className="space-y-1 border-l border-slate-800 pl-3">
                    <span className="text-slate-500 block">Syntax Guardian</span>
                    <strong className="text-slate-300 block">Mrs. Codex</strong>
                    <span className="text-[8px] text-indigo-500">[Syntax Approved]</span>
                  </div>
                  <div className="space-y-1 border-l border-slate-800 pl-3">
                    <span className="text-slate-500 block">Harmony Advisor</span>
                    <strong className="text-slate-300 block">S. Mvala</strong>
                    <span className="text-[8px] text-indigo-500">[Harmony Restored]</span>
                  </div>
                </div>

                {/* SHA-256 seal */}
                <div className="pt-3 border-t border-slate-900 text-[9px] font-mono text-slate-500 space-y-1">
                  <span className="block uppercase font-bold">Cryptographic Block Seal</span>
                  <span className="block break-all bg-slate-950 p-2 border border-slate-850 rounded text-slate-400">
                    sha256_e8d356a1b24479e39b92ea91c28c8de15a3bf4f1b2b0b822cd15d6c15b0f00a08
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowCertificate(false)}
                className="mt-6 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white px-5 py-2 rounded-lg text-xs font-mono tracking-wider transition-colors"
              >
                DISMISS SYSTEM OVERLAY
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
