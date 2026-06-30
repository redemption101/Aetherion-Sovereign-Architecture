import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Trash2,
  Filter,
  User,
  ArrowRightLeft,
  Server,
  Activity,
  UserCheck,
  UserX,
  Download
} from "lucide-react";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  type: "registration" | "login";
  user: string;
  status: "success" | "failure";
  details: string;
}

interface SecurityAuditLogProps {
  logs: AuditLogEntry[];
  onClearLogs: () => void;
}

export default function SecurityAuditLog({ logs, onClearLogs }: SecurityAuditLogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "registration" | "login">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "failure">("all");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalAttempts = logs.length;
  const successAttempts = logs.filter((l) => l.status === "success").length;
  const failureAttempts = logs.filter((l) => l.status === "failure").length;
  const failureRate = totalAttempts > 0 ? ((failureAttempts / totalAttempts) * 100).toFixed(0) : "0";

  const handleExportLogs = () => {
    const timestamp = new Date().toISOString();
    const divider = "===============================================================================";
    const subDivider = "-------------------------------------------------------------------------------";
    
    let text = `${divider}\n`;
    text += `         AETHERION SOVEREIGN ENGINE - QUANTUM HISTORY SECURITY AUDIT LOG\n`;
    text += `${divider}\n`;
    text += `Export Time (UTC): ${timestamp}\n`;
    text += `Total Log Entries: ${logs.length}\n`;
    text += `Filtered Entries: ${filteredLogs.length}\n`;
    text += `Active Search: ${searchTerm ? `"${searchTerm}"` : "None"}\n`;
    text += `Type Filter: ${typeFilter.toUpperCase()}\n`;
    text += `Status Filter: ${statusFilter.toUpperCase()}\n`;
    text += `Cluster Stability Rate: ${(100 - parseFloat(failureRate)).toFixed(0)}%\n`;
    text += `${divider}\n\n`;

    if (filteredLogs.length === 0) {
      text += `[NO TELEMETRY LOGS RECORDED OR MATCHING CURRENT FILTER CRITERIA]\n`;
    } else {
      filteredLogs.forEach((log, index) => {
        text += `ENTRY #${String(index + 1).padStart(3, "0")}\n`;
        text += `Timestamp : ${log.timestamp}\n`;
        text += `Event Type: ${log.type.toUpperCase()}\n`;
        text += `Operator  : ${log.user}\n`;
        text += `Status    : ${log.status.toUpperCase()} (${log.status === "success" ? "GRANTED" : "REJECTED"})\n`;
        text += `Telemetry : ${log.details}\n`;
        text += `${subDivider}\n`;
      });
    }

    text += `\n${divider}\n`;
    text += `END OF QUANTUM SECURITY CHRONOLOGY - TRANS_ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}\n`;
    text += `SYSTEMS STABLE | ETS STORAGE NOMINAL\n`;
    text += `${divider}\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `quantum_history_security_audit_logs_${timestamp.replace(/[:.]/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-5 relative overflow-hidden">
      {/* Decorative pulse element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
              Erlang Node Security Audit Log
            </h4>
            <p className="text-[10px] text-slate-400">
              Chronological log of cluster validation requests, registration hashes, and access tokens in real-time.
            </p>
          </div>
        </div>

        {logs.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportLogs}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-950/30 hover:bg-indigo-900/40 hover:text-indigo-300 hover:border-indigo-800 text-[10px] text-slate-300 font-mono font-bold uppercase rounded border border-slate-800 transition-all cursor-pointer"
              title="Export current logs as formatted text file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export History</span>
            </button>
            <button
              onClick={onClearLogs}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 hover:bg-red-950/40 hover:text-red-400 hover:border-red-900/50 text-[10px] text-slate-400 font-mono font-bold uppercase rounded border border-slate-850 transition-all cursor-pointer"
              title="Clear all stored logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Flush Logs</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between">
          <span className="text-[9px] font-mono text-slate-500 uppercase">Total Requests</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-lg font-bold font-mono text-slate-100">{totalAttempts}</span>
            <Activity className="w-3.5 h-3.5 text-indigo-400/70" />
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between">
          <span className="text-[9px] font-mono text-slate-500 uppercase">Registered / Authenticated</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-lg font-bold font-mono text-emerald-400">{successAttempts}</span>
            <UserCheck className="w-3.5 h-3.5 text-emerald-500/70" />
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between">
          <span className="text-[9px] font-mono text-slate-500 uppercase">Rejections</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-lg font-bold font-mono text-amber-500">{failureAttempts}</span>
            <UserX className="w-3.5 h-3.5 text-amber-500/70" />
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between">
          <span className="text-[9px] font-mono text-slate-500 uppercase">Collision/Fail Rate</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-lg font-bold font-mono text-slate-100">{failureRate}%</span>
            <span className="text-[9px] font-mono text-slate-500">of total</span>
          </div>
        </div>
      </div>

      {/* Filtering Toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-850">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logs by node name, hash payload..."
            className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono focus:border-indigo-500 focus:outline-none"
          />
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-600" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          {/* Type Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Event:</span>
            <select
              value={typeFilter}
              onChange={(e: any) => setTypeFilter(e.target.value)}
              className="bg-transparent text-[10px] text-slate-300 font-mono border-none focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-950">All</option>
              <option value="registration" className="bg-slate-950">Registration</option>
              <option value="login" className="bg-slate-950">Login</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              className="bg-transparent text-[10px] text-slate-300 font-mono border-none focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-950">All Status</option>
              <option value="success" className="bg-slate-950">Success</option>
              <option value="failure" className="bg-slate-950">Failure</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chronological Log Timeline */}
      <div className="bg-slate-950/50 rounded-xl border border-slate-850 p-1 divide-y divide-slate-900 max-h-80 overflow-y-auto">
        <AnimatePresence initial={false}>
          {filteredLogs.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs font-mono">
              <Server className="w-5 h-5 mx-auto mb-2 text-slate-750" />
              <span>No telemetry audit logs matching filters.</span>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isSuccess = log.status === "success";
              const isReg = log.type === "registration";

              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 hover:bg-slate-900/35 transition-colors flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 pr-2">
                    {/* Top line metadata */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Icon indicating status */}
                      {isSuccess ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      )}

                      {/* Pill indicating event type */}
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider ${
                        isReg
                          ? "bg-indigo-950 text-indigo-300 border border-indigo-900/40"
                          : "bg-purple-950 text-purple-300 border border-purple-900/40"
                      }`}>
                        {log.type}
                      </span>

                      {/* User indicator */}
                      <span className="font-mono text-[10px] text-indigo-400 font-bold flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" />
                        {log.user}
                      </span>
                    </div>

                    {/* Details content */}
                    <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                      {log.details}
                    </p>
                  </div>

                  {/* Timestamp & metadata info on right */}
                  <div className="flex-shrink-0 flex flex-col items-end text-right font-mono text-[9px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {log.timestamp}
                    </span>
                    <span className={isSuccess ? "text-emerald-500/90" : "text-amber-500/90"}>
                      {isSuccess ? "GRANTED" : "REJECTED"}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Security Statement Footer */}
      <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-600">
        <span>Sovereign Security Block: SHA-256 standard validation encryption matrix</span>
        <span>Isolated Memory Segment: ETS Transient Store</span>
      </div>
    </div>
  );
}
