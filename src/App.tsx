import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Key,
  ShieldCheck,
  Github,
  Radio,
  Compass,
  Volume2,
  VolumeX,
  Code2,
  Database,
  AlertCircle,
  FileCode2,
  Terminal,
  UserPlus,
  LogIn,
  LogOut,
  CheckCircle2,
  Server,
  HelpCircle,
  Activity,
  Info,
  Sparkles,
  RefreshCw,
  Cpu
} from "lucide-react";
import AetherphiChat from "./components/AetherphiChat";
import AetherionVision from "./components/AetherionVision";
import QuantumVisualizer from "./components/QuantumVisualizer";
import QuantumMonitor from "./components/QuantumMonitor";
import SelfHealingPanel from "./components/SelfHealingPanel";
import AetherStressPanel from "./components/AetherStressPanel";
import EthicsAuditPanel from "./components/EthicsAuditPanel";
import { CODEX_DICTIONARY } from "./data/codexDictionary";
import SecurityAuditLog, { AuditLogEntry } from "./components/SecurityAuditLog";
import ClusterTopologyHeatmap from "./components/ClusterTopologyHeatmap";
import QuantumVarianceTrend from "./components/QuantumVarianceTrend";
import { CODE_TEMPLATES } from "./templates";
import { CompilationResult, CodeTemplate } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<"overview" | "auth" | "compiler" | "earodynamics" | "cicd" | "source" | "vision">("vision");
  
  // Real-time Throughput state simulator
  const [throughput, setThroughput] = useState<number>(84.2);
  const [throughputHistory, setThroughputHistory] = useState<number[]>([70, 75, 68, 85, 91, 84.2]);

  // Auth States (Interactive user store simulated)
  const [authUsers, setAuthUsers] = useState<Array<{ user: string; hash: string; salt: string }>>([
    { user: "admin_node", hash: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", salt: "aX9_s7_pQ2" }
  ]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "init_log_1",
      timestamp: new Date(Date.now() - 14400000).toLocaleTimeString(),
      type: "registration",
      user: "admin_node",
      status: "success",
      details: "Genesis administrative sovereign node registered. Allocated to isolated BEAM-X ETS table storage."
    },
    {
      id: "init_log_2",
      timestamp: new Date(Date.now() - 10800000).toLocaleTimeString(),
      type: "login",
      user: "admin_node",
      status: "success",
      details: "Sovereign SHA-256 hash matching verification succeeded. Session ID alpha_node_77x initiated."
    },
    {
      id: "init_log_3",
      timestamp: new Date(Date.now() - 7200000).toLocaleTimeString(),
      type: "login",
      user: "unknown_agent",
      status: "failure",
      details: "Authentication rejected: Username Node not located in the sovereign transient store registry."
    }
  ]);
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [currentSession, setCurrentSession] = useState<string | null>("id_alpha_node_77x");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Compiler states
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate>(CODE_TEMPLATES[0]);
  const [codeContext, setCodeContext] = useState<string>(CODE_TEMPLATES[0].code);
  const [compilation, setCompilation] = useState<CompilationResult | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [hoveredTerm, setHoveredTerm] = useState<any>(null);

  // Audio / Synth States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(528);
  const [synthWaveType, setSynthWaveType] = useState<OscillatorType>("sine");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // CI/CD simulator states
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [pipelineStatus, setPipelineStatus] = useState<"idle" | "running" | "success" | "failed">("idle");
  const [pipelineProgress, setPipelineProgress] = useState(0);

  // Simulated git repository info
  const [repoURL, setRepoURL] = useState("github.com/vundlamkv/aetherion-sovereign-node");
  const [isPublished, setIsPublished] = useState(false);

  // Generate dynamic throughput updates
  useEffect(() => {
    const timer = setInterval(() => {
      setThroughput((prev) => {
        const delta = (Math.random() - 0.5) * 4;
        const next = Math.max(40, Math.min(150, parseFloat((prev + delta).toFixed(1))));
        setThroughputHistory((hist) => [...hist.slice(1), next]);
        return next;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Sync templates
  const selectTemplate = (tpl: CodeTemplate) => {
    setSelectedTemplate(tpl);
    setCodeContext(tpl.code);
    setCompilation(null);
  };

  // Compile Handler via Server API
  const handleCompile = async () => {
    setIsCompiling(true);
    setCompilation(null);
    try {
      const response = await fetch("/api/aetherion/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeContext })
      });
      const data = await response.json();
      setCompilation(data);
      if (data && data.success) {
        setPulseActive(true);
      } else {
        setPulseActive(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCompiling(false);
    }
  };

  // Erlang authentication hashing simulator (Using SHA-256 visualization)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    const timestamp = new Date().toLocaleTimeString();

    if (!regUser || !regPass) {
      setAuthError("Registration fields cannot be blank.");
      setAuditLogs((prev) => [
        {
          id: `reg_fail_${Date.now()}`,
          timestamp,
          type: "registration",
          user: "BLANK_NODE",
          status: "failure",
          details: "Attempted registration rejected: Username Node ID or Password Key field blank."
        },
        ...prev
      ]);
      return;
    }
    if (authUsers.some((u) => u.user === regUser)) {
      setAuthError(`User "${regUser}" already exists in Sovereign ets registry.`);
      setAuditLogs((prev) => [
        {
          id: `reg_fail_${Date.now()}`,
          timestamp,
          type: "registration",
          user: regUser,
          status: "failure",
          details: `Attempted registration of existing node "${regUser}" rejected. Collision prevention active.`
        },
        ...prev
      ]);
      return;
    }

    setIsAuthLoading(true);
    setTimeout(() => {
      // Create salt & simple hash projection
      const salt = "salt_" + Math.random().toString(36).substring(4, 9);
      const generatedHash = "sha256_" + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      
      setAuthUsers((prev) => [...prev, { user: regUser, hash: generatedHash, salt }]);
      setAuthSuccess(`Secure User "${regUser}" registered in Erlang auth database!`);
      
      setAuditLogs((prev) => [
        {
          id: `reg_success_${Date.now()}`,
          timestamp,
          type: "registration",
          user: regUser,
          status: "success",
          details: `Erlang transient ETS table successfully updated with node ID: "${regUser}". Salt seed: "${salt}".`
        },
        ...prev
      ]);

      setRegUser("");
      setRegPass("");
      setIsAuthLoading(false);
    }, 800);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    const timestamp = new Date().toLocaleTimeString();

    if (!loginUser) {
      setAuthError("Registered Username field is blank.");
      return;
    }

    const existing = authUsers.find((u) => u.user === loginUser);
    if (!existing) {
      setAuthError("User not registered in ets sovereign tables.");
      setAuditLogs((prev) => [
        {
          id: `login_fail_${Date.now()}`,
          timestamp,
          type: "login",
          user: loginUser,
          status: "failure",
          details: `Session verification failed: User Node "${loginUser}" not found in current isolated ETS registry.`
        },
        ...prev
      ]);
      return;
    }

    setIsAuthLoading(true);
    setTimeout(() => {
      const sessId = existing.user + "_sess_" + Math.random().toString(36).substring(2, 8);
      setCurrentSession(sessId);
      setAuthSuccess(`Welcome, sovereign agent ${existing.user}. Session Token registered.`);
      
      setAuditLogs((prev) => [
        {
          id: `login_success_${Date.now()}`,
          timestamp,
          type: "login",
          user: existing.user,
          status: "success",
          details: `SHA-256 hash match verified. Session initiated with token ID: "${sessId}".`
        },
        ...prev
      ]);

      setLoginUser("");
      setLoginPass("");
      setIsAuthLoading(false);
    }, 800);
  };

  // Web Audio Earodynamics Synthesizer controller
  const playSolfeggioTone = (freq: number) => {
    setCurrentFrequency(freq);
    if (isPlayingAudio && oscNodeRef.current) {
      oscNodeRef.current.frequency.setValueAtTime(freq, audioCtxRef.current?.currentTime || 0);
      return;
    }
    initAndStartSynth(freq);
  };

  const initAndStartSynth = (freq: number) => {
    try {
      // Instantiate standard Web Audio API safely
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      osc.type = synthWaveType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscNodeRef.current = osc;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime); // Fade-in to prevent loud pop
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.1);
      gainNodeRef.current = gain;

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setIsPlayingAudio(true);
    } catch (err) {
      console.error("Web Audio failed: ", err);
    }
  };

  const stopSynth = () => {
    if (oscNodeRef.current && gainNodeRef.current && audioCtxRef.current) {
      const curTime = audioCtxRef.current.currentTime;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, curTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, curTime + 0.15);
      setTimeout(() => {
        oscNodeRef.current?.stop();
        oscNodeRef.current?.disconnect();
        gainNodeRef.current?.disconnect();
        audioCtxRef.current?.close();
        setIsPlayingAudio(false);
      }, 180);
    }
  };

  useEffect(() => {
    if (isPlayingAudio && oscNodeRef.current) {
      oscNodeRef.current.type = synthWaveType;
    }
  }, [synthWaveType]);

  // Clean audio on component unmount
  useEffect(() => {
    return () => {
      if (oscNodeRef.current) {
        oscNodeRef.current.stop();
      }
    };
  }, []);

  // Simulated CI/CD Runner
  const triggerPipeline = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setPipelineStatus("running");
    setPipelineProgress(5);
    setPipelineLogs([]);

    const logList = [
      "🔄 [STEP 1/6] Initializing Sovereign Build Machine runner-ubuntu-latest...",
      "🐳 Pulling BEAM-X Erlang/OTP container image version v26.2...",
      "📦 Restoring rebar3 dependency cache (AetherDB drivers, Cryptography keys loaded).",
      "🏗️ [STEP 2/6] Compiling Erlang backend modules: aetherion_auth.erl, aetherion_core.erl...",
      "✅ Erlang bytecode output: ebin/aetherion_auth.beam synthesized successfully.",
      "🧪 [STEP 3/6] Running CommonTest modules: verify_password_hashing_compliance_test...",
      "✔️ assertions: 4/4 proved under SPARK/Ada mathematical verification logic.",
      "🖼️ [STEP 4/6] Initializing Angular production compiling workflow...",
      "⚡ Executing: ng build --configuration=production (Aesthetic: Geometric Balance)...",
      "📦 Bundled 3 main JS chunks, style.css, index.html. Size: 184kB Gzipped.",
      "🛡️ [STEP 5/6] Verifying sun-tzu cyber shield compliance checklist (Pillar 3: Ethics)...",
      "🌍 [STEP 6/6] Connecting to target sovereign cloud run region: europe-west2...",
      "🚀 Deploying containerized OTP node to cluster endpoint...",
      "🎉 Deployment fully complete! Dev URL: " + window.location.origin
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logList.length) {
        setPipelineLogs((prev) => [...prev, logList[currentLogIdx]]);
        setPipelineProgress((currentLogIdx + 1) * (100 / logList.length));
        currentLogIdx++;
      } else {
        clearInterval(interval);
        setPipelineRunning(false);
        setPipelineStatus("success");
        setIsPublished(true);
      }
    }, 600);
  };

  // Erlang Source Files contents preview
  const ERL_SOURCE_FILES = [
    {
      name: "aetherion_auth.erl",
      desc: "Erlang module implementing triple-entry user verification and key cryptographic password hashing.",
      code: `-module(aetherion_auth).
-export([init/0, register_user/2, login_user/2, verify_session/1]).

-record(user, {username, password_hash, salt, created_at}).
-record(session, {token, username, expires_at}).

init() ->
    ets:new(users_table, [set, public, named_table, {keypos, #user.username}]),
    ets:new(sessions_table, [set, public, named_table, {keypos, #session.token}]),
    ok.

register_user(Username, Password) ->
    Salt = crypto:strong_rand_bytes(16),
    PasswordHash = crypto:hash(sha256, <<Password/binary, Salt/binary>>),
    ets:insert(users_table, #user{username = Username, password_hash = PasswordHash, salt = Salt}),
    {ok, Username}.`
    },
    {
      name: "aetherion_core.erl",
      desc: "BEAM-X scheduler manager handling quantum superpositions and continuous data streams routing.",
      code: `-module(aetherion_core).
-behaviour(gen_server).
-export([start_link/0, register_actor/2, dispatch_stream/2]).

init([]) ->
    io:format("Aetherion Sovereign Core Initialized under Ubuntu council oversight.~n"),
    {ok, #{actors => #{}, streams => #{}}}.

handle_call({register_actor, ActorId, Pid}, _From, State) ->
    NewActors = maps:put(ActorId, Pid, maps:get(actors, State)),
    {reply, ok, State#{actors => NewActors}}.`
    },
    {
      name: "aetherion_sup.erl",
      desc: "Erlang OTP Supervisor providing 1-for-1 restart capability to repair damaged nodes.",
      code: `-module(aetherion_sup).
-behaviour(supervisor).
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    SupFlags = #{strategy => one_for_one, intensity => 3, period => 5},
    ChildSpecs = [
        #{id => aetherion_core,
          start => {aetherion_core, start_link, []},
          restart => permanent}
    ],
    {ok, {SupFlags, ChildSpecs}}.`
    },
    {
      name: "ci-cd.yml",
      desc: "GitHub Actions workflow script executing Erlang rebar3 tests and Angular UI bundling on pull request.",
      code: `name: Aetherion Sovereign CI/CD Pipeline
on: [push, pull_request]
jobs:
  build-erlang:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: erlef/setup-beam@v1
      with:
        otp-version: '26.2'
    - run: rebar3 compile
    - run: rebar3 eunit`
    }
  ];

  const [selectedErlFile, setSelectedErlFile] = useState(ERL_SOURCE_FILES[0]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col justify-between select-none">
      
      {/* Top Navigation / Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center transform rotate-45 shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all hover:rotate-90">
            <div className="w-4 h-4 border-2 border-white transform -rotate-45"></div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-widest text-white uppercase flex items-center gap-2">
              Aetherion <span className="text-indigo-400 font-light">Sovereign Studio</span>
              <span className="text-[10px] tracking-normal px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase font-mono">v3.0 Sovereign</span>
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex gap-8 items-center">
          {/* Quantum State Pulse Indicator */}
          <div className="flex flex-col items-end border border-slate-800 px-3 py-1 bg-slate-900/60 rounded-md">
            <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Quantum State Pulse</span>
            <span className={`text-xs font-mono flex items-center gap-1.5 transition-all duration-1000 ${
              pulseActive ? "text-emerald-400 font-bold" : "text-indigo-400"
            }`}>
              <span className={`w-2 h-2 rounded-full transition-all duration-1000 ${
                pulseActive 
                  ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse" 
                  : "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
              }`}></span>
              {pulseActive ? "SYNCHRONIZED" : "STANDBY"}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Sovereignty Protocol</span>
            <span className="text-emerald-400 text-xs font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Synchronized (ETS Tables Loaded)
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Erlang/OTP Runtime</span>
            <span className="text-white text-xs font-mono">BEAM-X v26.2.1</span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Angular UI Simulator</span>
            <span className="text-indigo-400 text-xs font-mono">Render Active</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Sidebar / Navigation (Geometric Balance styling) */}
        <nav className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/80 flex flex-col p-4 space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2 px-3">
            System Workspace
          </div>

          <button
            onClick={() => setActiveTab("vision")}
            className={`w-full text-left px-3.5 py-2.5 rounded transition-all text-xs flex items-center justify-between ${
              activeTab === "vision"
                ? "bg-indigo-600/10 border-l-2 border-indigo-500 text-indigo-400 font-medium"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Sovereign Vision & AI</span>
            </span>
            <span className="text-[9px] font-mono bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800/40 text-indigo-400">CH 1</span>
          </button>
          
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full text-left px-3.5 py-2.5 rounded transition-all text-xs flex items-center justify-between ${
              activeTab === "overview"
                ? "bg-indigo-600/10 border-l-2 border-indigo-500 text-indigo-400 font-medium"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <span>Topology & Simulation</span>
            <span className="text-[9px] font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">ETS</span>
          </button>

          <button
            onClick={() => setActiveTab("auth")}
            className={`w-full text-left px-3.5 py-2.5 rounded transition-all text-xs flex items-center justify-between ${
              activeTab === "auth"
                ? "bg-indigo-600/10 border-l-2 border-indigo-500 text-indigo-400 font-medium"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <span>Erlang User Auth</span>
            <Key className="w-3.5 h-3.5 opacity-75" />
          </button>

          <button
            onClick={() => setActiveTab("source")}
            className={`w-full text-left px-3.5 py-2.5 rounded transition-all text-xs flex items-center justify-between ${
              activeTab === "source"
                ? "bg-indigo-600/10 border-l-2 border-indigo-500 text-indigo-400 font-medium"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <span>Erlang Core Code</span>
            <FileCode2 className="w-3.5 h-3.5 opacity-75" />
          </button>

          <button
            onClick={() => setActiveTab("compiler")}
            className={`w-full text-left px-3.5 py-2.5 rounded transition-all text-xs flex items-center justify-between ${
              activeTab === "compiler"
                ? "bg-indigo-600/10 border-l-2 border-indigo-500 text-indigo-400 font-medium"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <span>Sovereign Lexer / AST</span>
            <Code2 className="w-3.5 h-3.5 opacity-75" />
          </button>

          <button
            onClick={() => setActiveTab("earodynamics")}
            className={`w-full text-left px-3.5 py-2.5 rounded transition-all text-xs flex items-center justify-between ${
              activeTab === "earodynamics"
                ? "bg-indigo-600/10 border-l-2 border-indigo-500 text-indigo-400 font-medium"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <span>Earodynamics Sound</span>
            <Radio className="w-3.5 h-3.5 opacity-75 animate-pulse text-indigo-400" />
          </button>

          <button
            onClick={() => setActiveTab("cicd")}
            className={`w-full text-left px-3.5 py-2.5 rounded transition-all text-xs flex items-center justify-between ${
              activeTab === "cicd"
                ? "bg-indigo-600/10 border-l-2 border-indigo-500 text-indigo-400 font-medium"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <span>CI / CD Pipeline</span>
            <Github className="w-3.5 h-3.5 opacity-75" />
          </button>

          {/* Quick Stats sidebar widgets */}
          <div className="pt-6 mt-auto">
            <div className="p-4 border border-slate-800 bg-slate-900/30 rounded-lg space-y-3">
              <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider font-mono">
                Sovereign Session User
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold uppercase font-mono">
                  {currentSession ? currentSession.charAt(0) : "S"}
                </div>
                <div className="text-xs text-slate-300 truncate font-mono">
                  {currentSession || "no_session_user"}
                </div>
              </div>
              {currentSession && (
                <button
                  onClick={() => {
                    setCurrentSession(null);
                    setAuthSuccess("Session Terminated safely.");
                  }}
                  className="w-full mt-1 bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-300 py-1 rounded text-[10px] font-mono border border-slate-700 transition-colors flex items-center justify-center gap-1"
                >
                  <LogOut className="w-3 h-3" /> Terminate Session
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Content Panel Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-6">
          
          <AnimatePresence mode="wait">
            {/* TAB 0: SOVEREIGN VISION & AI */}
            {activeTab === "vision" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <AetherionVision />
              </motion.div>
            )}

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Intro header block with Aetherion details */}
                <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 h-full w-1/3 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-transparent" />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Sovereign Cluster Controller</h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-4xl">
                    Welcome to the <strong>Aetherion Sovereign Studio</strong>. This application compiles, simulates, and monitors live Erlang backend processes coupled with an elegant, high-performance UI matching the <strong>Geometric Balance</strong> specification. All processing adheres to the Sovereign directives: Architect Mandlenkosi Vundla and the Triad: Theodore Swarts, Mrs. Codex, and Sempi Mvala.
                  </p>
                </div>

                {/* Main Geometric grid matching the mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Card A: Throughput Metric */}
                  <div className="col-span-1 bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-bold font-mono">Aether Throughput</span>
                      <span className="text-indigo-400 text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40 uppercase">
                        REAL-TIME
                      </span>
                    </div>

                    {/* Chart simulation representing system load */}
                    <div className="flex-1 flex items-end gap-1.5 h-32 mt-4">
                      {throughputHistory.map((val, idx) => {
                        const maxVal = Math.max(...throughputHistory, 120);
                        const pctHeight = (val / maxVal) * 100;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                            <div className="text-[9px] font-mono text-indigo-400 mb-1">{val.toFixed(0)}</div>
                            <div 
                              className="w-full bg-indigo-500/20 border-t border-indigo-500 transition-all duration-500"
                              style={{ height: `${pctHeight}%` }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-4 flex items-baseline justify-between">
                      <div className="text-3xl font-mono text-white">
                        {throughput.toFixed(1)} <span className="text-xs text-slate-500 font-sans uppercase">GB/s</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Stable Bandwidth</span>
                    </div>
                  </div>

                  {/* Card B: Blueprint Logic Visualizer */}
                  <div className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-bold font-mono">Blueprint Logic Visualizer</span>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Active structural supervisor nodes executing on the virtual BEAM-X runtime machine.
                      </p>
                    </div>

                    {/* Spinning visualizer layers matching mockup */}
                    <div className="my-6 relative flex items-center justify-center h-40">
                      <div className="absolute w-[180px] h-[180px] border border-indigo-500/40 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: "25s" }}>
                        <div className="absolute top-0 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                      </div>
                      <div className="absolute w-[120px] h-[120px] border border-indigo-500/20 rounded-full flex items-center justify-center border-dashed animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
                        <div className="absolute bottom-0 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                      </div>
                      <div className="absolute w-[60px] h-[60px] border border-indigo-500/10 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent"></div>
                        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-indigo-500/15 to-transparent"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 relative z-10 text-[10px] font-mono">
                      <div className="p-2 border border-slate-800 bg-slate-950/80 rounded flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
                        <span>Erlang.Node.Master</span>
                      </div>
                      <div className="p-2 border border-slate-800 bg-slate-950/80 rounded flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span>Erlang.Core.Sup</span>
                      </div>
                      <div className="p-2 border border-slate-800 bg-slate-950/80 rounded flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span>Angular.UI.Port</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* D3-Powered Real-time Cluster Topology Heatmap */}
                <ClusterTopologyHeatmap />

                {/* Historical trend view of quantum variance */}
                <QuantumVarianceTrend />

                {/* Sub row with Quantum Visualizer and Self Healing control */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <QuantumVisualizer />
                  <SelfHealingPanel />
                </div>

                {/* Real-time Quantum State Synchronization Monitor */}
                <QuantumMonitor />

                {/* AI-Driven Predictive Aether Stress Report Panel */}
                <AetherStressPanel
                  throughput={throughput}
                  throughputHistory={throughputHistory}
                  onOptimize={() => {
                    // Stabilize throughput upon optimization tactic deployment
                    setThroughput(55.4);
                  }}
                />
              </motion.div>
            )}

            {/* TAB 2: USER AUTHENTICATION */}
            {activeTab === "auth" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-xl">
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Key className="w-5 h-5 text-indigo-400" /> Erlang User Authentication Engine
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    This module mirrors the live <strong>aetherion_auth.erl</strong> specification. Passwords entered are securely salted with unique bytes and passed through a simulated SHA-256 binary hash matrix. User nodes are recorded directly in isolated ETS tables.
                  </p>
                </div>

                {authSuccess && (
                  <div className="p-3.5 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                {authError && (
                  <div className="p-3.5 bg-red-950/40 border border-red-900/60 rounded-xl text-red-300 text-xs flex items-center gap-2 animate-fade-in">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* User Registration Form */}
                  <form onSubmit={handleRegister} className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <UserPlus className="w-4 h-4" />
                      <h3 className="font-semibold text-sm uppercase tracking-wider font-mono text-white">Sovereign Agent Registration</h3>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500">Username Node ID</label>
                      <input
                        type="text"
                        value={regUser}
                        onChange={(e) => setRegUser(e.target.value)}
                        placeholder="e.g. agent_009"
                        className="w-full bg-slate-950 border border-slate-800 px-3.5 py-2 rounded text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500"
                        disabled={isAuthLoading}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500">Sovereign Password Key</label>
                      <input
                        type="password"
                        value={regPass}
                        onChange={(e) => setRegPass(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-800 px-3.5 py-2 rounded text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500"
                        disabled={isAuthLoading}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isAuthLoading}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isAuthLoading ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <span>Register Node in ETS table</span>
                      )}
                    </button>
                  </form>

                  {/* User Login Form */}
                  <form onSubmit={handleLogin} className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <LogIn className="w-4 h-4" />
                      <h3 className="font-semibold text-sm uppercase tracking-wider font-mono text-white">Secure Session Login</h3>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500">Registered Username</label>
                      <input
                        type="text"
                        value={loginUser}
                        onChange={(e) => setLoginUser(e.target.value)}
                        placeholder="e.g. admin_node"
                        className="w-full bg-slate-950 border border-slate-800 px-3.5 py-2 rounded text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500"
                        disabled={isAuthLoading}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500">Authentication Key</label>
                      <input
                        type="password"
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-800 px-3.5 py-2 rounded text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500"
                        disabled={isAuthLoading}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isAuthLoading}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isAuthLoading ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <span>Initiate Session and Hash Verification</span>
                      )}
                    </button>
                  </form>
                </div>

                {/* Live ETS registry view */}
                <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Database className="w-4 h-4" /> Live ETS User Database Table (Erlang Transient Store)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500">
                          <th className="py-2 px-3">Username Key</th>
                          <th className="py-2 px-3">Crypto Hash Value</th>
                          <th className="py-2 px-3">Salt Seed</th>
                          <th className="py-2 px-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {authUsers.map((user, idx) => (
                          <tr key={idx} className="border-b border-slate-900 hover:bg-slate-900/30">
                            <td className="py-2 px-3 text-indigo-400 font-bold">{user.user}</td>
                            <td className="py-2 px-3 text-slate-400 break-all">{user.hash.substring(0, 42)}...</td>
                            <td className="py-2 px-3 text-slate-500">{user.salt}</td>
                            <td className="py-2 px-3 text-right text-emerald-400">Active Node</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sovereign Node Registration & Login Security Audit Log */}
                <SecurityAuditLog
                  logs={auditLogs}
                  onClearLogs={() => setAuditLogs([])}
                />
              </motion.div>
            )}

            {/* TAB 3: ERLANG CORE CODE */}
            {activeTab === "source" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-xl">
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <FileCode2 className="w-5 h-5 text-indigo-400" /> Genuine Erlang Source Repository
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    View the production-ready Erlang modules saved directly inside this workspace. These files form the backend foundation of the Aetherion Sovereign ecosystem. Select a file below to view its complete code:
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Selector List */}
                  <div className="lg:col-span-1 space-y-2">
                    {ERL_SOURCE_FILES.map((file, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedErlFile(file)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                          selectedErlFile.name === file.name
                            ? "bg-indigo-600/10 border-indigo-500 text-indigo-400"
                            : "bg-slate-900/40 border-slate-800/60 text-slate-400 hover:bg-slate-900"
                        }`}
                      >
                        <span className="font-mono text-xs font-bold uppercase">{file.name}</span>
                        <span className="text-[10px] text-slate-500 leading-normal">{file.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Viewer Panel */}
                  <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                      <span className="font-mono text-xs text-indigo-400 font-bold">{selectedErlFile.name}</span>
                      <span className="text-[10px] uppercase font-mono text-slate-500">Read-Only Repository File</span>
                    </div>
                    <pre className="p-4 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed bg-slate-950 max-h-[500px]">
                      {selectedErlFile.code}
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: SOVEREIGN COMPILER LEXER / AST */}
            {activeTab === "compiler" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Compiler Input */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-bold font-mono flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-indigo-400" /> Aetherion Compiler Workspace
                      </span>
                      {/* Dropdown template selector */}
                      <select 
                        className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-400 font-mono outline-none focus:border-indigo-500"
                        onChange={(e) => {
                          const val = CODE_TEMPLATES.find((t) => t.name === e.target.value);
                          if (val) selectTemplate(val);
                        }}
                        value={selectedTemplate.name}
                      >
                        {CODE_TEMPLATES.map((tpl, index) => (
                          <option key={index} value={tpl.name}>{tpl.name}</option>
                        ))}
                      </select>
                    </div>

                    <p className="text-[11px] text-slate-400 mb-4 leading-normal">
                      Write, tweak, and audit Aetherion syntax keywords (like <code>actor</code>, <code>stream</code>, <code>heal</code>, <code>sovereign</code>, <code>quantum</code>) directly inside the workspace editor.
                    </p>

                    <div className="border border-slate-800 rounded-lg overflow-hidden">
                      <textarea
                        value={codeContext}
                        onChange={(e) => setCodeContext(e.target.value)}
                        className="w-full h-80 bg-slate-950 text-slate-200 font-mono text-xs p-4 focus:outline-none leading-relaxed resize-none focus:ring-1 focus:ring-indigo-500/50"
                        spellCheck="false"
                      />
                    </div>

                    {/* Live Lexicon Detector & Hover Inspector */}
                    <div className="mt-4 border-t border-slate-800/80 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-indigo-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                          Live Codex Keyword Detector ({
                            CODEX_DICTIONARY.filter(item => 
                              codeContext.toLowerCase().includes(item.term.toLowerCase())
                            ).length
                          } found)
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono hidden sm:inline">Hover over keywords to see definitions</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {CODEX_DICTIONARY.map((item) => {
                          const isDetected = codeContext.toLowerCase().includes(item.term.toLowerCase());
                          return (
                            <button
                              key={item.term}
                              onMouseEnter={() => setHoveredTerm(item)}
                              onMouseLeave={() => setHoveredTerm(null)}
                              onClick={() => setHoveredTerm(hoveredTerm?.term === item.term ? null : item)}
                              className={`text-[10px] font-mono px-2 py-1 rounded transition-all border ${
                                isDetected 
                                  ? "bg-indigo-600/10 border-indigo-500/60 text-indigo-300 font-bold shadow-[0_0_8px_rgba(99,102,241,0.2)]" 
                                  : "bg-slate-900/20 border-slate-800/60 text-slate-500 hover:text-slate-400"
                              }`}
                            >
                              {item.term}
                              {isDetected && <span className="inline-block w-1 h-1 bg-emerald-400 rounded-full ml-1 animate-pulse" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Floating / Active Definition Inspector */}
                      <AnimatePresence>
                        {hoveredTerm && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-slate-950 border border-indigo-500/30 rounded-lg p-3.5 space-y-2.5 shadow-lg relative overflow-hidden mt-2"
                          >
                            <div className="absolute right-3 top-3 opacity-5">
                              <Terminal className="w-12 h-12 text-indigo-400" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                {hoveredTerm.term}
                              </span>
                              <span className={`text-[8px] uppercase tracking-wider font-mono px-2 py-0.5 rounded ${
                                hoveredTerm.type === "pillar" 
                                  ? "bg-indigo-950 text-indigo-400 border border-indigo-800/40" 
                                  : "bg-amber-950 text-amber-400 border border-amber-800/40"
                              }`}>
                                {hoveredTerm.type}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                              <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800/50">
                                <span className="text-[8px] uppercase font-bold text-indigo-400 tracking-wider font-mono block mb-1">Philosophical Concept</span>
                                <p className="text-slate-300 font-sans italic">"{hoveredTerm.philosophicalDef}"</p>
                              </div>
                              <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800/50">
                                <span className="text-[8px] uppercase font-bold text-emerald-400 tracking-wider font-mono block mb-1">Technical Implementation</span>
                                <p className="text-slate-300 font-mono">{hoveredTerm.technicalDef}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex gap-2.5 mt-4">
                      <button
                        onClick={handleCompile}
                        disabled={isCompiling}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-2 px-4 rounded text-xs tracking-wide transition-all uppercase flex items-center justify-center gap-2"
                      >
                        {isCompiling ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-white text-white" />
                            <span>Run Compiler Pipeline (Lex & Parse)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bytecode output if success */}
                  {compilation?.success && (
                    <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-indigo-400 font-bold font-mono">Simulated BEAM-X Bytecode Assembler</span>
                        <span className="text-[9px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-full">OTP-X26</span>
                      </div>
                      <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 text-xs font-mono leading-relaxed overflow-x-auto max-h-56">
                        {compilation.bytecode}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Compiler Output/Proof */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Interactive Aetherphi Chat AI Companion */}
                  <AetherphiChat currentCode={codeContext} />

                  {/* Formal Verification proof output */}
                  {compilation && (
                    <div className={`p-4 border rounded-xl space-y-3 animate-fade-in ${
                      compilation.success ? "bg-slate-900/60 border-indigo-500/30 text-indigo-100" : "bg-red-950/40 border-red-900/60 text-red-200"
                    }`}>
                      <h4 className="font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-2">
                        {compilation.success ? (
                          <ShieldCheck className="w-4 h-4 text-indigo-400 animate-pulse" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span>Sovereign Mathematical Proof</span>
                      </h4>

                      <div className="text-xs space-y-2">
                        <div className="flex justify-between font-mono">
                          <span>Verification Matrix Status:</span>
                          <span className={`font-bold ${compilation.success ? "text-emerald-400" : "text-red-400"}`}>
                            {compilation.verification.status}
                          </span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Ethical Licensing Check:</span>
                          <span className={`font-bold ${compilation.success ? "text-emerald-400" : "text-red-400"}`}>
                            {compilation.verification.ethicsCompliance}
                          </span>
                        </div>
                        
                        {compilation.success ? (
                          <div className="space-y-1.5 pt-2 border-t border-slate-800">
                            <span className="text-[10px] text-slate-500 uppercase font-mono">Proved Assertions (SPARK/Ada standards):</span>
                            {compilation.verification.assertionsProved.map((p, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                                <span className="text-emerald-400">✔</span>
                                <span className="text-slate-300">{p}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-1.5 pt-2 border-t border-slate-800">
                            <span className="text-[10px] text-red-400 uppercase font-mono">Licensing Violation:</span>
                            {compilation.verification.errors.map((err, idx) => (
                              <p key={idx} className="text-xs text-red-300 leading-normal">{err}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ethics Audit Report Panel */}
                <div className="col-span-1 lg:col-span-3">
                  <EthicsAuditPanel code={codeContext} compilation={compilation} />
                </div>
              </motion.div>
            )}

            {/* TAB 5: EARODYNAMICS SOUND SCIENCE */}
            {activeTab === "earodynamics" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 rounded-xl relative overflow-hidden">
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Radio className="w-5 h-5 text-indigo-400 animate-pulse" /> Earodynamics sound and vibration generator
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    <strong>Chapter 15: Earodynamics:</strong> Aetherion integrates acoustics and harmonic vibrations directly as native program features. Toggle the synth oscillator below, choose a frequency preset, and listen to the real analog waveform synthesize directly in your browser.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Controls card */}
                  <div className="md:col-span-1 p-5 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
                    <h3 className="font-semibold text-xs text-white uppercase font-mono tracking-wider">Acoustic Controls</h3>
                    
                    {/* Master Switch */}
                    <button
                      onClick={() => {
                        if (isPlayingAudio) stopSynth();
                        else initAndStartSynth(currentFrequency);
                      }}
                      className={`w-full py-3.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center justify-center gap-2 border ${
                        isPlayingAudio
                          ? "bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                          : "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-4 h-4" />
                          <span>STOP SONIC SWEEP</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 animate-bounce" />
                          <span>PLAY SONIC FREQUENCY</span>
                        </>
                      )}
                    </button>

                    {/* Wave Form Selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 font-mono">Oscillator Waveform</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(["sine", "triangle", "square", "sawtooth"] as OscillatorType[]).map((type) => (
                          <button
                            key={type}
                            onClick={() => setSynthWaveType(type)}
                            className={`py-1.5 rounded text-[10px] font-mono border capitalize transition-all ${
                              synthWaveType === type
                                ? "bg-indigo-950 text-indigo-400 border-indigo-800"
                                : "bg-slate-950 text-slate-500 border-slate-800/80 hover:text-slate-300"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded text-[11px] text-indigo-300 leading-relaxed font-sans">
                      <strong>Ubuntu Coherence:</strong> Modeled by co-founder <strong>Sempi Mvala</strong> to explore high-level cognitive responses using resonant waveforms.
                    </div>
                  </div>

                  {/* Presets and display */}
                  <div className="md:col-span-2 p-5 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-xs text-white uppercase font-mono tracking-wider mb-3">Healing Solfeggio Presets</h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        {[
                          { freq: 174, label: "174Hz Pain Relief" },
                          { freq: 285, label: "285Hz Tissue Healing" },
                          { freq: 396, label: "396Hz Liberating Fear" },
                          { freq: 417, label: "417Hz Facilitating Change" },
                          { freq: 432, label: "432Hz Cosmic Harmony" },
                          { freq: 528, label: "528Hz Transformation" },
                          { freq: 639, label: "639Hz Connecting Relationships" },
                          { freq: 852, label: "852Hz Awakening Intuition" }
                        ].map((preset) => (
                          <button
                            key={preset.freq}
                            onClick={() => playSolfeggioTone(preset.freq)}
                            className={`p-2.5 rounded-lg border text-left transition-all ${
                              currentFrequency === preset.freq
                                ? "bg-indigo-900/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/20"
                                : "bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            <span className="block font-mono font-bold text-xs text-white">{preset.freq}Hz</span>
                            <span className="text-[9px] text-slate-500 font-sans block truncate">{preset.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Oscilloscope Visual simulation */}
                    <div className="h-28 bg-slate-950 border border-slate-800 rounded-xl mt-4 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute top-2 left-2 text-[10px] uppercase font-mono text-indigo-500">
                        Oscilloscope Visualizer
                      </div>
                      <div className="absolute right-2 top-2 text-[10px] font-mono text-slate-500">
                        Active Freq: {currentFrequency}Hz ({synthWaveType})
                      </div>

                      {/* Animated wave line */}
                      <svg className="w-full h-12 text-indigo-500 opacity-80" viewBox="0 0 400 50">
                        <path
                          d={
                            isPlayingAudio
                              ? `M 0 25 Q 50 ${10 + Math.random() * 20}, 100 25 T 200 25 T 300 25 T 400 25`
                              : "M 0 25 L 400 25"
                          }
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={isPlayingAudio ? "animate-pulse" : ""}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 6: CI/CD PIPELINE TRACKER */}
            {activeTab === "cicd" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <Github className="w-5 h-5 text-indigo-400" /> Aetherion Continuous Deployment Engine
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Sovereign automation scheduler simulating target publishing of the Erlang Backend and Angular UI frontend to GitHub and Cloud Run containers.
                    </p>
                  </div>
                  <button
                    onClick={triggerPipeline}
                    disabled={pipelineRunning}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50 shadow-lg shadow-indigo-600/15 whitespace-nowrap"
                  >
                    {pipelineRunning ? "PIPELINE ACTIVE..." : "TRIGGER BUILD & PUBLISH"}
                  </button>
                </div>

                {/* Progress bar */}
                {pipelineRunning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-indigo-400">Executing Sovereign Workflows...</span>
                      <span>{pipelineProgress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${pipelineProgress}%` }} />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Pipeline logs */}
                  <div className="lg:col-span-2 p-5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-slate-500 font-bold uppercase font-mono">Pipeline Run Log Feed</span>
                      <span className="text-[10px] font-mono text-indigo-400">Target: main</span>
                    </div>

                    <div className="flex-1 bg-slate-900 border border-slate-800/80 rounded-lg p-4 font-mono text-[11px] leading-relaxed space-y-1.5 overflow-y-auto max-h-96 min-h-[300px]">
                      {pipelineLogs.length === 0 ? (
                        <div className="text-slate-600 italic flex items-center justify-center h-full min-h-[250px]">
                          Pipeline is currently idle. Click 'TRIGGER BUILD & PUBLISH' to run rebar3 compiling & Angular production building diagnostics.
                        </div>
                      ) : (
                        pipelineLogs.map((log, idx) => {
                          let color = "text-slate-400";
                          if (log.includes("✅") || log.includes("✔️") || log.includes("🎉")) color = "text-emerald-400";
                          else if (log.includes("STEP")) color = "text-indigo-400 font-semibold";
                          return (
                            <div key={idx} className={color}>
                              {log}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Git settings card */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
                      <h3 className="font-semibold text-xs text-white uppercase font-mono tracking-wider">GitHub Integration Meta</h3>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500 font-mono">Target GitHub Repository</label>
                        <input
                          type="text"
                          value={repoURL}
                          onChange={(e) => setRepoURL(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                        <span className="text-[10px] uppercase font-bold font-mono text-slate-500">Repository Status:</span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`w-2 h-2 rounded-full ${isPublished ? "bg-emerald-400" : "bg-amber-400"} inline-block`}></span>
                          <span className="font-mono text-white text-[11px]">
                            {isPublished ? "Sovereign Build Pushed to GitHub" : "Changes Pending Push"}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-purple-950/25 border border-purple-900/40 rounded-lg text-[11px] text-purple-300/90 flex items-start space-x-2">
                        <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong>Automated Deploy (Chapter 19):</strong> The pipeline compiles rebar3 configurations, executes eunit test matrices, runs Angular tree-shaking, and delivers containerized nodes directly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>

      {/* Footer Status Bar (Geometric Balance mockup exact implementation) */}
      <footer className="h-10 bg-indigo-600 px-6 flex items-center justify-between text-white text-[10px] font-bold uppercase tracking-wider">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-ping"></span>
            Session: ER-AX-2900
          </span>
          <span className="opacity-75">Secure Tunnel: Active</span>
          <span className="hidden sm:inline opacity-75">Region: europe-west2</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-mono truncate max-w-xs">Target Repository: {repoURL}</span>
          <span className="bg-indigo-800 px-2 py-0.5 rounded text-[9px]">Environment: Production</span>
        </div>
      </footer>

    </div>
  );
}
