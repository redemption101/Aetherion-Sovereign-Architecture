import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  Clock,
  Calendar,
  Activity,
  Zap,
  RefreshCw,
  Download,
  Sliders,
  AlertTriangle,
  ShieldCheck,
  Info,
  Layers,
  Sparkles,
  Award,
  Database
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";

interface HistoricalDataPoint {
  id: string;
  label: string;
  fullTimestamp: string;
  variance: number;
  coherence: number;
  entropy: number;
  phaseShift: number; // degrees
  noise: number;
  anomaly: boolean;
  activeNodes: string[];
}

type ResolutionType = "hourly" | "daily" | "weekly";

export default function QuantumVarianceTrend() {
  const [resolution, setResolution] = useState<ResolutionType>("hourly");
  const [hoveredPoint, setHoveredPoint] = useState<HistoricalDataPoint | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<HistoricalDataPoint | null>(null);
  const [isAnomalousDriftInjected, setIsAnomalousDriftInjected] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(false);

  // Generate deterministic/procedural historical data based on resolution
  const baseData: Record<ResolutionType, HistoricalDataPoint[]> = useMemo(() => {
    const hourlyPoints: HistoricalDataPoint[] = [];
    const dailyPoints: HistoricalDataPoint[] = [];
    const weeklyPoints: HistoricalDataPoint[] = [];

    const nodesPool = [
      "master@aetherion",
      "ets_store@aetherion",
      "worker_alpha@aetherion",
      "worker_beta@aetherion",
      "gateway@aetherion"
    ];

    // Seed helper
    const pseudorandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    // 1. Generate Hourly (Last 24 hours, 1-hour intervals)
    for (let i = 23; i >= 0; i--) {
      const seedVal = i * 3.7;
      const rnd = pseudorandom(seedVal);
      const hour = new Date();
      hour.setHours(hour.getHours() - i);
      const timeStr = hour.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const fullTimeStr = hour.toLocaleString();

      // Variance tends to cycle between 0.05 and 0.16 normally, with a specific spike at -8 hours
      let variance = 0.06 + Math.sin(i * 0.4) * 0.04 + rnd * 0.03;
      if (i === 8) {
        variance = 0.21; // anomalous spike
      }
      variance = Math.max(0.01, Math.min(0.25, variance));

      const coherence = Math.max(35, Math.min(100, 100 - variance * 250 + rnd * 5));
      const entropy = Math.max(0.1, Math.min(1.0, variance * 3.8 + rnd * 0.1));
      const phaseShift = Math.round((i * 15 + rnd * 20) % 360);
      const noise = parseFloat((0.02 + rnd * 0.06).toFixed(4));
      const anomaly = variance > 0.18;

      hourlyPoints.push({
        id: `h_${i}`,
        label: `${i}h ago`,
        fullTimestamp: fullTimeStr,
        variance: parseFloat(variance.toFixed(4)),
        coherence: parseFloat(coherence.toFixed(2)),
        entropy: parseFloat(entropy.toFixed(3)),
        phaseShift,
        noise,
        anomaly,
        activeNodes: anomaly ? [nodesPool[1], nodesPool[2]] : [nodesPool[0], nodesPool[3]]
      });
    }

    // 2. Generate Daily (Last 30 days, 1-day intervals)
    for (let i = 29; i >= 0; i--) {
      const seedVal = i * 5.1;
      const rnd = pseudorandom(seedVal);
      const day = new Date();
      day.setDate(day.getDate() - i);
      const dayStr = day.toLocaleDateString([], { month: "short", day: "2-digit" });
      const fullDateStr = day.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" });

      // Cyclic pattern with occasional systemic drift
      let variance = 0.08 + Math.cos(i * 0.25) * 0.05 + rnd * 0.035;
      if (i === 15 || i === 22) {
        variance = 0.195; // anomalous day
      }
      variance = Math.max(0.01, Math.min(0.25, variance));

      const coherence = Math.max(30, Math.min(100, 100 - variance * 240 + rnd * 6));
      const entropy = Math.max(0.1, Math.min(1.0, variance * 3.9 + rnd * 0.08));
      const phaseShift = Math.round((i * 12 + rnd * 45) % 360);
      const noise = parseFloat((0.03 + rnd * 0.07).toFixed(4));
      const anomaly = variance > 0.18;

      dailyPoints.push({
        id: `d_${i}`,
        label: dayStr,
        fullTimestamp: fullDateStr,
        variance: parseFloat(variance.toFixed(4)),
        coherence: parseFloat(coherence.toFixed(2)),
        entropy: parseFloat(entropy.toFixed(3)),
        phaseShift,
        noise,
        anomaly,
        activeNodes: anomaly ? [nodesPool[1], nodesPool[4]] : [nodesPool[2], nodesPool[3]]
      });
    }

    // 3. Generate Weekly (Last 12 weeks, 1-week intervals)
    for (let i = 11; i >= 0; i--) {
      const seedVal = i * 9.3;
      const rnd = pseudorandom(seedVal);
      const week = new Date();
      week.setDate(week.getDate() - i * 7);
      const weekStr = `Wk ${12 - i}`;
      const fullWeekStr = `Week of ${week.toLocaleDateString()}`;

      // Steady trend showing micro-optimization gains
      let variance = 0.14 - i * 0.008 + Math.sin(i * 0.8) * 0.02 + rnd * 0.03;
      if (i === 6) {
        variance = 0.22; // massive re-routing week spike
      }
      variance = Math.max(0.01, Math.min(0.25, variance));

      const coherence = Math.max(40, Math.min(100, 100 - variance * 230 + rnd * 8));
      const entropy = Math.max(0.05, Math.min(1.0, variance * 3.7 + rnd * 0.05));
      const phaseShift = Math.round((i * 30 + rnd * 90) % 360);
      const noise = parseFloat((0.015 + rnd * 0.05).toFixed(4));
      const anomaly = variance > 0.18;

      weeklyPoints.push({
        id: `w_${i}`,
        label: weekStr,
        fullTimestamp: fullWeekStr,
        variance: parseFloat(variance.toFixed(4)),
        coherence: parseFloat(coherence.toFixed(2)),
        entropy: parseFloat(entropy.toFixed(3)),
        phaseShift,
        noise,
        anomaly,
        activeNodes: anomaly ? [nodesPool[1], nodesPool[2], nodesPool[4]] : [nodesPool[0], nodesPool[3], nodesPool[4]]
      });
    }

    return {
      hourly: hourlyPoints,
      daily: dailyPoints,
      weekly: weeklyPoints
    };
  }, []);

  // Compute final state with anomalous drift or calibration applied
  const finalSeriesData = useMemo(() => {
    let series = JSON.parse(JSON.stringify(baseData[resolution])) as HistoricalDataPoint[];

    if (isAnomalousDriftInjected) {
      // Inject severe quantum decoherence anomaly near the end
      const midPointIdx = Math.floor(series.length * 0.8);
      if (series[midPointIdx]) {
        series[midPointIdx].variance = 0.245;
        series[midPointIdx].coherence = 12.4;
        series[midPointIdx].entropy = 0.96;
        series[midPointIdx].anomaly = true;
        series[midPointIdx].noise = 0.145;
        series[midPointIdx].activeNodes = ["ets_store@aetherion", "worker_alpha@aetherion", "gateway@aetherion"];
      }
    }

    if (isCalibrated) {
      // Dampen all variance values to ideal, perfect quantum alignment levels (< 0.08)
      series = series.map((p) => {
        const dampenedVariance = Math.max(0.015, p.variance * 0.35);
        const coherence = Math.min(99.8, 100 - dampenedVariance * 180);
        const entropy = dampenedVariance * 2.5;
        return {
          ...p,
          variance: parseFloat(dampenedVariance.toFixed(4)),
          coherence: parseFloat(coherence.toFixed(2)),
          entropy: parseFloat(entropy.toFixed(3)),
          anomaly: false,
          noise: parseFloat((p.noise * 0.4).toFixed(4))
        };
      });
    }

    return series;
  }, [baseData, resolution, isAnomalousDriftInjected, isCalibrated]);

  // Derived statistics metrics
  const stats = useMemo(() => {
    const values = finalSeriesData.map((d) => d.variance);
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / (values.length || 1);
    const peak = Math.max(...values, 0);
    
    // Volatility calculation (Standard Deviation)
    const squareDiffs = values.map((value) => {
      const diff = value - avg;
      return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((acc, curr) => acc + curr, 0) / (squareDiffs.length || 1);
    const stdDev = Math.sqrt(avgSquareDiff);

    // Stability Index (calculated based on average and standard deviation)
    const stability = Math.max(0, Math.min(100, Math.round((1 - (avg * 1.5 + stdDev * 2.5)) * 100)));

    return {
      average: parseFloat(avg.toFixed(4)),
      peak: parseFloat(peak.toFixed(4)),
      volatility: parseFloat(stdDev.toFixed(4)),
      stabilityIndex: stability,
      anomaliesCount: finalSeriesData.filter((d) => d.anomaly).length
    };
  }, [finalSeriesData]);

  // List of historical threshold violations/anomalies
  const anomalyLogs = useMemo(() => {
    return finalSeriesData.filter((p) => p.anomaly);
  }, [finalSeriesData]);

  // Handle data export as JSON payload
  const handleExportJSON = () => {
    const payload = {
      system: "Aetherion Sovereign Studio - Quantum Trend Analyzer",
      resolution,
      exportedAt: new Date().toISOString(),
      statistics: {
        averageVariance: stats.average,
        peakVariance: stats.peak,
        volatilityStandardDeviation: stats.volatility,
        coherenceStabilityIndex: `${stats.stabilityIndex}%`,
        activeAnomaliesLogged: stats.anomaliesCount,
        calibrationApplied: isCalibrated,
        injectedStress: isAnomalousDriftInjected
      },
      timeSeries: finalSeriesData
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aetherion_quantum_variance_${resolution}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const activeInspectorPoint = selectedPoint || hoveredPoint || finalSeriesData[finalSeriesData.length - 1];

  return (
    <div className="col-span-1 lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-5 relative overflow-hidden flex flex-col justify-between">
      {/* Decorative ambient gradient circle */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-900 pb-4">
          <div className="flex items-center space-x-2.5">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
                Quantum Variance Historical Trends
              </h4>
              <p className="text-[10px] text-slate-400">
                Long-term probability variance analytics with configurable scheduling resolution and systemic anomaly isolation.
              </p>
            </div>
          </div>

          {/* Resolution Selector Toggles */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-850 self-end sm:self-auto">
            {(["hourly", "daily", "weekly"] as ResolutionType[]).map((res) => {
              const Icon = res === "hourly" ? Clock : Calendar;
              return (
                <button
                  key={res}
                  onClick={() => {
                    setResolution(res);
                    setSelectedPoint(null);
                    setHoveredPoint(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-md transition-all ${
                    resolution === res
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {res === "hourly" ? <Clock className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                  <span>{res}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Multipliers & Controllers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-950/40 p-3 rounded-lg border border-slate-850 mt-4">
          <div className="col-span-1 flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-indigo-400/80" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block">
                Matrix Simulators
              </span>
              <span className="text-[9px] text-slate-500 block">
                Toggle structural telemetry and micro-variances
              </span>
            </div>
          </div>

          <div className="col-span-2 flex flex-wrap gap-2 justify-end">
            <button
              onClick={() => {
                setIsAnomalousDriftInjected(!isAnomalousDriftInjected);
                setIsCalibrated(false);
                setSelectedPoint(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase rounded border transition-all cursor-pointer ${
                isAnomalousDriftInjected
                  ? "bg-amber-950/80 border-amber-500/50 text-amber-400"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
              title="Inject an artificial high-entropy variance drift outlier into the historical dataset"
            >
              <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
              <span>{isAnomalousDriftInjected ? "Drift Injected" : "Inject Drift Anomaly"}</span>
            </button>

            <button
              onClick={() => {
                setIsCalibrated(!isCalibrated);
                setIsAnomalousDriftInjected(false);
                setSelectedPoint(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase rounded border transition-all cursor-pointer ${
                isCalibrated
                  ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-400"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
              title="Execute quantum realignment mapping to force perfect stable compliance levels (<0.08)"
            >
              <RefreshCw className={`w-3 h-3 ${isCalibrated ? "animate-spin text-emerald-400" : "text-slate-500"}`} />
              <span>{isCalibrated ? "Calibrated Stable" : "Calibrate Grid"}</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[10px] font-bold uppercase rounded shadow border border-indigo-500/30 transition-all cursor-pointer"
              title="Download historical trends as standard JSON format"
            >
              <Download className="w-3 h-3 text-indigo-200" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Statistics Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Average Variance</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-sm font-bold font-mono text-slate-200">{stats.average}</span>
              <span className="text-[8px] text-slate-500 uppercase font-mono">σ²</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Peak Outlier</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-sm font-bold font-mono ${stats.peak > 0.18 ? "text-amber-400" : "text-slate-200"}`}>
                {stats.peak}
              </span>
              <span className="text-[8px] text-slate-500 uppercase font-mono">max</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Variance Standard Dev</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-sm font-bold font-mono text-slate-200">{stats.volatility}</span>
              <span className="text-[8px] text-slate-500 uppercase font-mono">vol</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Coherence Stability Index</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className={`text-sm font-bold font-mono ${
                stats.stabilityIndex > 80 ? "text-emerald-400" : stats.stabilityIndex > 50 ? "text-amber-400" : "text-red-400"
              }`}>
                {stats.stabilityIndex}%
              </span>
              <span className="text-[8.5px] font-mono text-slate-500">stable</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col justify-between col-span-2 md:col-span-1">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Logged Excursions</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-sm font-bold font-mono ${stats.anomaliesCount > 0 ? "text-amber-500" : "text-slate-400"}`}>
                {stats.anomaliesCount}
              </span>
              <span className="text-[8.5px] font-mono text-slate-500">events</span>
            </div>
          </div>
        </div>

        {/* Visualizer Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
          
          {/* Historical Trend Area Chart */}
          <div className="col-span-1 lg:col-span-2 bg-slate-950/50 rounded-xl border border-slate-850 p-4 h-76 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pb-2">
              <span className="uppercase">Coherence & Variance Profile</span>
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-1.5 bg-indigo-500/20 border-t border-indigo-500" /> Variance
                </span>
                <span className="text-slate-600">|</span>
                <span>Critical Limit: 0.18</span>
              </span>
            </div>

            <div className="flex-1 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={finalSeriesData}
                  onMouseMove={(state: any) => {
                    if (state && state.activePayload && state.activePayload.length > 0) {
                      setHoveredPoint(state.activePayload[0].payload as HistoricalDataPoint);
                    }
                  }}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={(state: any) => {
                    if (state && state.activePayload && state.activePayload.length > 0) {
                      setSelectedPoint(state.activePayload[0].payload as HistoricalDataPoint);
                    }
                  }}
                >
                  <defs>
                    <linearGradient id="varianceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="#475569"
                    fontSize={9}
                    fontFamily="'JetBrains Mono', monospace"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#475569"
                    fontSize={9}
                    fontFamily="'JetBrains Mono', monospace"
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 0.26]}
                    tickFormatter={(v) => v.toFixed(2)}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as HistoricalDataPoint;
                        return (
                          <div className="bg-slate-950 border border-slate-800 p-2.5 rounded shadow-lg text-[10px] font-mono space-y-1">
                            <p className="text-slate-400 font-sans font-semibold">{data.fullTimestamp}</p>
                            <div className="w-16 h-px bg-slate-800 my-1" />
                            <p className="text-indigo-400">Variance: <span className="text-slate-200 font-bold">{data.variance} σ²</span></p>
                            <p className="text-purple-400">Coherence: <span className="text-slate-200 font-bold">{data.coherence}%</span></p>
                            <p className="text-emerald-400">Entropy: <span className="text-slate-200 font-bold">{data.entropy} H(x)</span></p>
                            {data.anomaly && (
                              <p className="text-rose-400 font-bold animate-pulse mt-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> DECOHERENCE WARNING
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {/* Threshold limit indicator */}
                  <ReferenceLine
                    y={0.18}
                    stroke="#b91c1c"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                    label={{
                      value: "CRITICAL LIMIT (0.18)",
                      position: "top",
                      fill: "#ef4444",
                      fontSize: 8,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: "bold"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="variance"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#varianceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactive Inspector Sidebar */}
          <div className="col-span-1 bg-slate-950/30 rounded-xl border border-slate-850 p-4 h-76 flex flex-col justify-between">
            {activeInspectorPoint ? (
              <div className="space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="border-b border-slate-900 pb-2">
                    <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                      Selected Trend Telemetry
                    </span>
                    <h5 className="text-xs font-mono font-bold text-indigo-400 mt-0.5">
                      {activeInspectorPoint.fullTimestamp}
                    </h5>
                    <span className="text-[9px] text-slate-500 block">
                      Index ID: {activeInspectorPoint.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="p-2 bg-slate-950 rounded border border-slate-900">
                      <span className="text-[8.5px] text-slate-500 block">PROBABILITY VARIANCE</span>
                      <strong className="text-slate-200 text-xs block mt-0.5">
                        {activeInspectorPoint.variance}
                      </strong>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-900">
                      <span className="text-[8.5px] text-slate-500 block">COHERENCE COEF</span>
                      <strong className="text-slate-200 text-xs block mt-0.5">
                        {activeInspectorPoint.coherence}%
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="p-2 bg-slate-950 rounded border border-slate-900">
                      <span className="text-[8.5px] text-slate-500 block">APPROX ENTROPY</span>
                      <strong className="text-slate-200 text-xs block mt-0.5">
                        {activeInspectorPoint.entropy}
                      </strong>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-900">
                      <span className="text-[8.5px] text-slate-500 block">PHASE ALIGNMENT</span>
                      <strong className="text-slate-200 text-xs block mt-0.5">
                        {activeInspectorPoint.phaseShift}°
                      </strong>
                    </div>
                  </div>

                  {/* Impacted Nodes */}
                  <div className="space-y-1">
                    <span className="text-[8.5px] text-slate-500 font-mono block uppercase">Impacted Sovereign Nodes:</span>
                    <div className="flex flex-wrap gap-1">
                      {activeInspectorPoint.activeNodes.map((n) => (
                        <span key={n} className="text-[8px] font-mono bg-slate-950 border border-slate-850 text-indigo-400 px-1.5 py-0.5 rounded">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-900 pt-2 text-[9.5px] font-sans flex items-start gap-1.5 leading-normal">
                  {activeInspectorPoint.anomaly ? (
                    <div className="bg-amber-950/20 border border-amber-900/30 text-amber-300 p-2 rounded flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Anomalous high entropy threshold warning. Decoupling sequence recommended to prevent memory store leaks.</span>
                    </div>
                  ) : (
                    <div className="bg-emerald-950/20 border border-emerald-900/30 text-emerald-300 p-2 rounded flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Nominal state metrics. Sovereign nodes operational within target quantum stability margins.</span>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

        </div>

      </div>

      {/* Threshold Anomaly log list footer */}
      {anomalyLogs.length > 0 && (
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h5 className="text-[10px] font-bold text-slate-300 font-mono uppercase tracking-wider">
              Decoherence Excursion Log ({anomalyLogs.length})
            </h5>
          </div>

          <div className="bg-slate-950/40 rounded-lg border border-slate-850 divide-y divide-slate-900/80 max-h-36 overflow-y-auto">
            {anomalyLogs.map((item) => (
              <div key={item.id} className="p-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400 hover:bg-slate-900/20 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  <span className="text-amber-500 font-bold">EXCURSION {item.id.toUpperCase()}</span>
                  <span className="text-slate-600">|</span>
                  <span>{item.fullTimestamp}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-300">Variance: <strong className="text-amber-400">{item.variance} σ²</strong></span>
                  <span className="text-slate-600">|</span>
                  <span className="bg-slate-950 border border-slate-900 text-slate-500 px-1.5 py-0.5 rounded text-[8.5px]">
                    Remediation: REALIGN_MATRIX({item.phaseShift}°)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Statement Footer info */}
      <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-600 border-t border-slate-900 pt-3 mt-4">
        <span>Sovereign Historical Trend Vector: Recharts coordinate chart</span>
        <span>Resolution State Storage: Isolated Sandbox</span>
      </div>
    </div>
  );
}
