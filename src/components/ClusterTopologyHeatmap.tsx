import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  Maximize2,
  RefreshCw,
  LayoutGrid,
  Cpu,
  Zap,
  Sliders,
  AlertOctagon,
  ShieldCheck,
  TrendingDown,
  Info
} from "lucide-react";

interface ErlangNode {
  id: string;
  name: string;
  role: string;
  baseLoad: number; // 0 - 100
  currentLoad: number; // 0 - 100
  processCount: number;
  memoryUsageMB: number;
  status: "optimal" | "warning" | "critical";
}

export default function ClusterTopologyHeatmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Simulated node state
  const [nodes, setNodes] = useState<ErlangNode[]>([
    { id: "node_1", name: "master@aetherion", role: "Cluster Master Orchestrator", baseLoad: 42, currentLoad: 42, processCount: 1420, memoryUsageMB: 412, status: "optimal" },
    { id: "node_2", name: "supervisor@aetherion", role: "Core supervisor_tree", baseLoad: 25, currentLoad: 25, processCount: 840, memoryUsageMB: 180, status: "optimal" },
    { id: "node_3", name: "ets_store@aetherion", role: "Transient ETS Storage Engine", baseLoad: 78, currentLoad: 78, processCount: 320, memoryUsageMB: 1240, status: "critical" },
    { id: "node_4", name: "worker_alpha@aetherion", role: "Primary Worker Actor Pool", baseLoad: 55, currentLoad: 55, processCount: 4890, memoryUsageMB: 512, status: "warning" },
    { id: "node_5", name: "worker_beta@aetherion", role: "Secondary Worker Actor Pool", baseLoad: 38, currentLoad: 38, processCount: 2980, memoryUsageMB: 390, status: "optimal" },
    { id: "node_6", name: "worker_gamma@aetherion", role: "Spillover Actor Pool", baseLoad: 18, currentLoad: 18, processCount: 450, memoryUsageMB: 120, status: "optimal" },
    { id: "node_7", name: "gateway@aetherion", role: "External Request Balancer", baseLoad: 62, currentLoad: 62, processCount: 1980, memoryUsageMB: 280, status: "warning" },
    { id: "node_8", name: "crypt_accel@aetherion", role: "Crypto Acceleration Node", baseLoad: 84, currentLoad: 84, processCount: 150, memoryUsageMB: 940, status: "critical" },
    { id: "node_9", name: "backup_node@aetherion", role: "Hot Standby HA Failover", baseLoad: 10, currentLoad: 10, processCount: 90, memoryUsageMB: 75, status: "optimal" }
  ]);

  const [selectedNode, setSelectedNode] = useState<ErlangNode | null>(null);
  const [workloadFactor, setWorkloadFactor] = useState<number>(1.0); // Global load multiplier
  const [dimensions, setDimensions] = useState({ width: 450, height: 320 });
  const [isInjectingStress, setIsInjectingStress] = useState<boolean>(false);

  // Periodically fluctuate load and processes to simulate real-time BEAM-X telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          // Fluctuate load based on baseLoad * workloadFactor
          const noise = (Math.random() - 0.5) * 8;
          let calculatedLoad = Math.max(5, Math.min(100, Math.round(node.baseLoad * workloadFactor + noise)));
          
          // Fluctuate processes
          const procNoise = Math.round((Math.random() - 0.5) * 120);
          const processCount = Math.max(50, node.processCount + procNoise);
          
          // Fluctuate memory
          const memNoise = Math.round((Math.random() - 0.5) * 15);
          const memoryUsageMB = Math.max(20, node.memoryUsageMB + memNoise);

          let status: "optimal" | "warning" | "critical" = "optimal";
          if (calculatedLoad > 75) status = "critical";
          else if (calculatedLoad > 45) status = "warning";

          return {
            ...node,
            currentLoad: calculatedLoad,
            processCount,
            memoryUsageMB,
            status
          };
        })
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [workloadFactor]);

  // Keep selectedNode details updated when node values change
  useEffect(() => {
    if (selectedNode) {
      const updated = nodes.find((n) => n.id === selectedNode.id);
      if (updated) {
        setSelectedNode(updated);
      }
    }
  }, [nodes, selectedNode?.id]);

  // Handle ResizeObserver to maintain fluid and accurate responsive bounds
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      // Safeguard against tiny render sizes
      setDimensions({
        width: Math.max(300, width),
        height: Math.max(220, height)
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // D3 Rendering Code
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous drawing

    const { width, height } = dimensions;
    const padding = { top: 10, right: 10, bottom: 10, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Heatmap grid parameters
    const cols = 3;
    const rows = 3;
    const itemWidth = chartWidth / cols;
    const itemHeight = chartHeight / rows;

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${padding.left}, ${padding.top})`);

    // Define standard color scales for our heatmap
    // Using a sleek, tech-styled color gradient (dark slate to vibrant indigo/amber/rose)
    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, 35, 65, 85, 100])
      .range([
        "#0f172a", // Very low: slate-900
        "#10b981", // Optimal: emerald-500
        "#f59e0b", // Warning: amber-500
        "#ef4444", // Critical: red-500
        "#b91c1c"  // Severe: red-700
      ]);

    // Create the nodes group
    const gridSelection = chartGroup
      .selectAll(".grid-cell")
      .data(nodes, (d: any) => d.id)
      .enter()
      .append("g")
      .attr("class", "grid-cell")
      .attr("transform", (d, i) => {
        const x = (i % cols) * itemWidth;
        const y = Math.floor(i / cols) * itemHeight;
        return `translate(${x}, ${y})`;
      })
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedNode(d);
      });

    // Render underlying card background
    gridSelection
      .append("rect")
      .attr("x", 4)
      .attr("y", 4)
      .attr("width", itemWidth - 8)
      .attr("height", itemHeight - 8)
      .attr("rx", 6)
      .attr("fill", "#020617") // Deep background
      .attr("stroke", (d: any) => {
        // Highlight selected node
        if (selectedNode && d.id === selectedNode.id) {
          return "#6366f1"; // Indigo border
        }
        return "#1e293b"; // Slate-800
      })
      .attr("stroke-width", (d: any) => (selectedNode && d.id === selectedNode.id ? 2 : 1))
      .style("transition", "stroke 0.2s ease, stroke-width 0.2s ease");

    // Heat level representation block inside card
    gridSelection
      .append("rect")
      .attr("x", 8)
      .attr("y", 8)
      .attr("width", itemWidth - 16)
      .attr("height", itemHeight - 16)
      .attr("rx", 4)
      .attr("fill", (d: any) => colorScale(d.currentLoad))
      .style("opacity", 0.18) // High opacity ambient bloom
      .style("transition", "fill 0.5s ease");

    // Small active border indicating load intensity
    gridSelection
      .append("rect")
      .attr("x", 8)
      .attr("y", 8)
      .attr("width", itemWidth - 16)
      .attr("height", itemHeight - 16)
      .attr("rx", 4)
      .attr("fill", "transparent")
      .attr("stroke", (d: any) => colorScale(d.currentLoad))
      .attr("stroke-width", 1.5)
      .style("opacity", 0.6)
      .style("transition", "stroke 0.5s ease");

    // Dynamic warning pulse circle for critical nodes
    gridSelection
      .filter((d: any) => d.currentLoad > 75)
      .append("circle")
      .attr("cx", itemWidth - 22)
      .attr("cy", 22)
      .attr("r", 3.5)
      .attr("fill", "#ef4444")
      .style("opacity", 0.9)
      .append("animate")
      .attr("attributeName", "opacity")
      .attr("values", "0.2;1;0.2")
      .attr("dur", "1.5s")
      .attr("repeatCount", "indefinite");

    // Typography Layer - Node Name
    gridSelection
      .append("text")
      .attr("x", 16)
      .attr("y", 28)
      .attr("fill", "#f8fafc")
      .style("font-family", "'JetBrains Mono', monospace")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .text((d: any) => d.name);

    // Typography Layer - Role descriptor (truncated)
    gridSelection
      .append("text")
      .attr("x", 16)
      .attr("y", 42)
      .attr("fill", "#64748b")
      .style("font-family", "ui-sans-serif, system-ui, sans-serif")
      .style("font-size", "8.5px")
      .text((d: any) => {
        const words = d.role.split(" ");
        return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : d.role;
      });

    // Typography Layer - Current Load value
    gridSelection
      .append("text")
      .attr("x", 16)
      .attr("y", itemHeight - 18)
      .attr("fill", (d: any) => {
        if (d.currentLoad > 75) return "#fca5a5"; // Soft red
        if (d.currentLoad > 45) return "#fde047"; // Soft yellow
        return "#a7f3d0"; // Soft emerald
      })
      .style("font-family", "'JetBrains Mono', monospace")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .text((d: any) => `${d.currentLoad}% LOAD`);

    // Tiny interactive telemetry icon on cells
    gridSelection
      .append("circle")
      .attr("cx", itemWidth - 22)
      .attr("cy", itemHeight - 20)
      .attr("r", 2)
      .attr("fill", "#475569");

  }, [nodes, dimensions, selectedNode]);

  // Command execution actions
  const handleRedistributeLoad = () => {
    // Bring all nodes closer to a stabilized state
    setNodes((prev) =>
      prev.map((n) => {
        const balancedLoad = Math.max(15, Math.min(80, Math.round(n.baseLoad * 0.7 + 15)));
        return {
          ...n,
          currentLoad: balancedLoad,
          status: balancedLoad > 75 ? "critical" : balancedLoad > 45 ? "warning" : "optimal"
        };
      })
    );
    setSelectedNode(null);
  };

  const handleInjectStress = () => {
    setIsInjectingStress(true);
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === "node_3" || n.id === "node_4" || n.id === "node_8") {
          return {
            ...n,
            currentLoad: 98,
            status: "critical",
            processCount: n.processCount + 1500
          };
        }
        return {
          ...n,
          currentLoad: Math.min(100, n.currentLoad + 25),
          status: n.currentLoad + 25 > 75 ? "critical" : "warning"
        };
      })
    );
    setTimeout(() => {
      setIsInjectingStress(false);
    }, 1500);
  };

  const handleCoolDown = () => {
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        currentLoad: Math.max(12, Math.round(n.baseLoad * 0.4)),
        status: "optimal"
      }))
    );
    setSelectedNode(null);
  };

  return (
    <div className="col-span-1 lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-5 relative overflow-hidden flex flex-col justify-between">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-900 pb-4">
          <div className="flex items-center space-x-2">
            <LayoutGrid className="w-5 h-5 text-indigo-400" />
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
                Cluster Topology Heatmap
              </h4>
              <p className="text-[10px] text-slate-400">
                Interactive D3 spatial representation of scheduling metrics, core structures, and process heat indices.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded">
              <Cpu className="w-3 h-3 text-indigo-400 animate-pulse" />
              D3.js Integrated Engine
            </span>
          </div>
        </div>

        {/* Global Workload Controller Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-950/40 p-3 rounded-lg border border-slate-850 mt-4">
          <div className="col-span-1 flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-indigo-400/80" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block">
                Workload Coefficient
              </span>
              <span className="text-[9px] text-slate-500 block">
                Adjust virtual transaction pipeline multipliers
              </span>
            </div>
          </div>

          <div className="col-span-1 flex items-center gap-3">
            <input
              type="range"
              min="0.4"
              max="2.0"
              step="0.1"
              value={workloadFactor}
              onChange={(e) => setWorkloadFactor(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-xs font-mono font-bold text-indigo-400 min-w-10 text-right">
              {workloadFactor.toFixed(1)}x
            </span>
          </div>

          <div className="col-span-1 flex justify-end gap-2">
            <button
              onClick={handleRedistributeLoad}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-950/40 hover:bg-indigo-950 text-indigo-400 hover:text-indigo-300 font-mono text-[9px] font-bold uppercase rounded border border-indigo-900/20 transition-all cursor-pointer"
              title="Equally distribute load patterns"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>Balance Ring</span>
            </button>

            <button
              disabled={isInjectingStress}
              onClick={handleInjectStress}
              className="flex items-center gap-1 px-2 py-1 bg-rose-950/40 hover:bg-rose-950 text-rose-400 hover:text-rose-300 font-mono text-[9px] font-bold uppercase rounded border border-rose-900/20 transition-all cursor-pointer disabled:opacity-50"
              title="Inject artificial transaction stress"
            >
              <Zap className="w-2.5 h-2.5" />
              <span>{isInjectingStress ? "Injecting..." : "Inject Stress"}</span>
            </button>

            <button
              onClick={handleCoolDown}
              className="flex items-center gap-1 px-2 py-1 bg-emerald-950/40 hover:bg-emerald-950 text-emerald-400 hover:text-emerald-300 font-mono text-[9px] font-bold uppercase rounded border border-emerald-900/20 transition-all cursor-pointer"
              title="Scale down nodes and cool processors"
            >
              <TrendingDown className="w-2.5 h-2.5" />
              <span>Cool Down</span>
            </button>
          </div>
        </div>

        {/* Legend block */}
        <div className="flex items-center gap-4 text-[9px] font-mono text-slate-500 mt-3 px-1">
          <span className="uppercase tracking-wider">Node Legend:</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-emerald-500/20 border border-emerald-500/70" /> Optimal (&lt; 45%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-amber-500/20 border border-amber-500/70" /> Warning (45% - 75%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-red-500/20 border border-red-500/70" /> Critical (&gt; 75%)
          </span>
          <span className="ml-auto text-slate-600">Click individual tiles for active diagnostic telemetry</span>
        </div>

        {/* Grid Visualization Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
          
          {/* Main Heatmap Stage */}
          <div className="col-span-1 lg:col-span-2 bg-slate-950/50 rounded-xl border border-slate-850 p-3 h-80 flex flex-col justify-between" ref={containerRef}>
            <svg
              ref={svgRef}
              className="w-full h-full"
              style={{ overflow: "visible" }}
            />
          </div>

          {/* Interactive Inspector Sidebar */}
          <div className="col-span-1 bg-slate-950/30 rounded-xl border border-slate-850 p-4 h-80 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!selectedNode ? (
                <motion.div
                  key="empty-telemetry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-3"
                >
                  <Activity className="w-8 h-8 text-indigo-500/55 animate-pulse mb-3" />
                  <h6 className="text-[11px] font-bold font-mono text-slate-300 uppercase tracking-wider">
                    Node Inspector Offline
                  </h6>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-[200px]">
                    Click on any simulated sovereign Erlang cell within the heatmap to stream real-time diagnostic parameters.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 h-full flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="border-b border-slate-900 pb-2">
                      <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                        Live Sovereign Telemetry
                      </span>
                      <h5 className="text-xs font-mono font-bold text-indigo-400 mt-0.5">
                        {selectedNode.name}
                      </h5>
                      <span className="text-[9.5px] text-slate-400 italic block mt-1">
                        {selectedNode.role}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="p-2 bg-slate-950 rounded border border-slate-900">
                        <span className="text-[8.5px] text-slate-500 block">ACTIVE PROCESSES</span>
                        <strong className="text-slate-200 text-xs block mt-0.5">
                          {selectedNode.processCount.toLocaleString()}
                        </strong>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-900">
                        <span className="text-[8.5px] text-slate-500 block">MEMORY LEASE</span>
                        <strong className="text-slate-200 text-xs block mt-0.5">
                          {selectedNode.memoryUsageMB} MB
                        </strong>
                      </div>
                    </div>

                    {/* Progress representation */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono uppercase">
                        <span className="text-slate-500">Node Workload Ratio</span>
                        <span className={selectedNode.currentLoad > 75 ? "text-red-400" : selectedNode.currentLoad > 45 ? "text-amber-400" : "text-emerald-400"}>
                          {selectedNode.currentLoad}% Load
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            selectedNode.currentLoad > 75
                              ? "bg-red-500"
                              : selectedNode.currentLoad > 45
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                          style={{ width: `${selectedNode.currentLoad}%` }}
                        />
                      </div>
                    </div>

                    {/* Safety Assessment Indicator */}
                    <div className={`p-2 rounded border text-[9.5px] font-sans flex items-start gap-1.5 leading-relaxed ${
                      selectedNode.currentLoad > 75
                        ? "bg-red-950/20 border-red-900/30 text-red-300"
                        : selectedNode.currentLoad > 45
                        ? "bg-amber-950/20 border-amber-900/30 text-amber-300"
                        : "bg-emerald-950/20 border-emerald-900/30 text-emerald-300"
                    }`}>
                      {selectedNode.currentLoad > 75 ? (
                        <>
                          <AlertOctagon className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>Node under critical task queue backups. Supervisor self-healing triggers imminent if left unmitigated.</span>
                        </>
                      ) : selectedNode.currentLoad > 45 ? (
                        <>
                          <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>Moderate pressure detected. Minor scheduler thread migrations deployed to prevent core thrashing.</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Perfect architectural balance achieved. All ETS transactions executing below 1.2ms threshold.</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-900 pt-2">
                    <button
                      onClick={() => {
                        // Relieve selected node load
                        setNodes((prev) =>
                          prev.map((n) =>
                            n.id === selectedNode.id
                              ? { ...n, currentLoad: Math.max(10, n.currentLoad - 25) }
                              : n
                          )
                        );
                      }}
                      className="w-full py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[9.5px] font-bold uppercase rounded shadow transition-colors cursor-pointer"
                    >
                      Balance Current Node
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Safety Matrix Footer info */}
      <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-600 border-t border-slate-900 pt-3 mt-4">
        <span>Sovereign Topology Vector: D3 matrix layout</span>
        <span>Isolated Memory Segments: ETS Transient Store nodes</span>
      </div>
    </div>
  );
}
