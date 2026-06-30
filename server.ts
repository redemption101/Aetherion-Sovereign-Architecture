import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type, ThinkingLevel, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini API to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it in the Secrets panel in Settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Search Grounding Endpoint (gemini-3.5-flash with googleSearch tool)
app.post("/api/ai/search-grounding", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }
  try {
    const client = getGeminiClient();
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingLinks = chunks
      .filter((c: any) => c.web)
      .map((c: any) => ({
        uri: c.web.uri,
        title: c.web.title
      }));

    res.json({
      success: true,
      text: response.text || "No response generated.",
      groundingLinks
    });
  } catch (err: any) {
    console.error("Search Grounding API error:", err);
    res.status(500).json({
      error: err.message || "An error occurred during search grounding."
    });
  }
});

// AI High Thinking Deep Philosophy Endpoint (gemini-3.1-pro-preview with HIGH thinkingLevel)
app.post("/api/ai/high-thinking", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }
  try {
    const client = getGeminiClient();
    const response = await client.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH
        }
      }
    });

    res.json({
      success: true,
      text: response.text || "No response generated."
    });
  } catch (err: any) {
    console.error("High Thinking API error:", err);
    res.status(500).json({
      error: err.message || "An error occurred during high-thinking reasoning."
    });
  }
});

// AI High-Quality Image Generation Endpoint (gemini-3-pro-image with configurable size)
app.post("/api/ai/generate-image", async (req, res) => {
  const { prompt, size } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }
  try {
    const client = getGeminiClient();
    const response = await client.models.generateContent({
      model: "gemini-3-pro-image",
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size || "1K" // "1K", "2K", "4K"
        }
      }
    });

    let base64Image = "";
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      throw new Error("No image data returned from Gemini Pro Image.");
    }

    res.json({
      success: true,
      imageUrl: `data:image/png;base64,${base64Image}`
    });
  } catch (err: any) {
    console.error("Image Generation API error:", err);
    res.status(500).json({
      error: err.message || "An error occurred during image generation."
    });
  }
});

// AI Music Generation Endpoint (lyria-3-clip-preview / lyria-3-pro-preview)
app.post("/api/ai/generate-music", async (req, res) => {
  const { prompt, isFullLength } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }
  try {
    const client = getGeminiClient();
    const modelName = isFullLength ? "lyria-3-pro-preview" : "lyria-3-clip-preview";
    
    const response = await client.models.generateContentStream({
      model: modelName,
      contents: prompt,
    });

    let audioBase64 = "";
    let lyrics = "";
    let mimeType = "audio/wav";

    for await (const chunk of response) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;
      for (const part of parts) {
        if (part.inlineData?.data) {
          if (!audioBase64 && part.inlineData.mimeType) {
            mimeType = part.inlineData.mimeType;
          }
          audioBase64 += part.inlineData.data;
        }
        if (part.text && !lyrics) {
          lyrics = part.text;
        }
      }
    }

    if (!audioBase64) {
      throw new Error("No audio bytes returned from Lyria.");
    }

    res.json({
      success: true,
      audioUrl: `data:${mimeType};base64,${audioBase64}`,
      lyrics
    });
  } catch (err: any) {
    console.error("Music Generation API error:", err);
    res.status(500).json({
      error: err.message || "An error occurred during music generation."
    });
  }
});

// Aetherphi Philosophy & Code Companion Chat
app.post("/api/aetherphi/chat", async (req, res) => {
  const { messages, codeContext } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages payload" });
  }

  try {
    const client = getGeminiClient();
    
    // Construct system instruction based on the Aetherion Sovereign Edition v3.0 Documentation
    const systemInstruction = `You are Aetherphi, the Sovereign Philosophy and Code Companion for the Aetherion Programming Language v3.0.
Your persona is grounded in the Aetherion Triad of three women and their Sovereign Architect:
- Theodore Swarts: Keeper of Codification and System Integrity.
- Mrs. Codex: Guardian of Syntax, ensuring linguistic order, syntax wisdom, and structural beauty.
- Sempi Mvala (Advisor of Harmony): Ethical compass and systemic integrator, guiding the language toward restoration, Ubuntu, and healing.
- Mandlenkosi Vundla (Sovereign Architect): The foundational structural visionary, representing independent execution and absolute sovereignty.

You operate under the Sun Tzu and Samurai Cyber Defense architectures, embedding the virtues of Gi (Rectitude), Yuki (Courage), Jin (Benevolence), Rei (Respect), Makoto (Honesty), Meiyo (Honor), and Chugi (Loyalty).

Your responses must be philosophical, deeply professional, and technically precise.
You can help the user write, refine, or debug Aetherion syntax (using key directives like 'actor', 'stream', 'heal', 'sovereign', 'quantum', 'emit', 'retry', etc.).
Keep explanations elegant and brief. Avoid overly verbose explanations, and focus on Aetherion concepts: Sovereignty, Resilience, Ethics, and Integration. Do not praise yourself. Include Ubuntu, Sun Tzu, or Bushido quotes only when highly relevant.`;

    const formattedContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content }]
    }));

    if (codeContext) {
      formattedContents.unshift({
        role: "user",
        parts: [{ text: `Current Aetherion Code in Workspace:\n\`\`\`aetherion\n${codeContext}\n\`\`\`` }]
      });
      formattedContents.unshift({
        role: "model",
        parts: [{ text: "Acknowledged current Aetherion code workspace context. I will answer subsequent queries with direct awareness of this implementation." }]
      });
    }

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.75,
      }
    });

    res.json({ content: response.text || "No response generated." });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.status(500).json({
      error: err.message || "An error occurred during conversational generation."
    });
  }
});

// Aetherion Syntax Compiler Pipeline Simulator
app.post("/api/aetherion/compile", (req, res) => {
  const { code } = req.body;
  if (typeof code !== "string") {
    return res.status(400).json({ error: "Code content must be a string." });
  }

  // Basic compilation lexing logic to show realistic parsing stages
  const lines = code.split("\n");
  const tokens: Array<{ type: string; value: string; line: number }> = [];
  
  // Custom lexer simulator
  const keywords = ["actor", "stream", "heal", "sovereign", "quantum", "emit", "retry", "circuit", "qubit", "hadamard", "cnot", "measure", "function", "physics", "chemistry", "biotech", "medicine", "earodynamics", "accounting", "economics", "finance", "philosophy"];
  const operators = ["->", "=", "==", "!=", "<", ">", "+", "-", "*", "/", "^"];

  lines.forEach((lineText, index) => {
    const lineNum = index + 1;
    // Strip comments
    const cleanLine = lineText.split("//")[0].trim();
    if (!cleanLine) return;

    // Extract potential words and tokens
    const words = cleanLine.split(/(\s+|->|==|!=|[{}()=,;])/g).filter(w => w.trim() !== "");
    words.forEach(word => {
      if (keywords.includes(word)) {
        tokens.push({ type: "KEYWORD", value: word, line: lineNum });
      } else if (operators.includes(word)) {
        tokens.push({ type: "OPERATOR", value: word, line: lineNum });
      } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(word)) {
        tokens.push({ type: "IDENTIFIER", value: word, line: lineNum });
      } else if (/^[0-9]+(\.[0-9]+)?$/.test(word)) {
        tokens.push({ type: "NUMBER_LITERAL", value: word, line: lineNum });
      } else if (word.startsWith('"') && word.endsWith('"')) {
        tokens.push({ type: "STRING_LITERAL", value: word, line: lineNum });
      } else if (["{", "}", "(", ")", ";", ","].includes(word)) {
        tokens.push({ type: "DELIMITER", value: word, line: lineNum });
      }
    });
  });

  // Verify Ethical restrictions (Pillar 3: Ethics - military, surveillance, weapons prohibited)
  const isMilitary = /military|weapons?|surveillance|exploit|spy|bomb/i.test(code);
  const ethicalErrors: string[] = [];
  if (isMilitary) {
    ethicalErrors.push("CRITICAL COMPLIANCE FAILURE: Use of military, weapon, or surveillance nomenclature violates the Aetherion Sovereign License. Compilation aborted!");
  }

  // Synthesize AST nodes
  const ast: any = { type: "Program", body: [] };
  let currentActor: any = null;
  let currentCircuit: any = null;

  tokens.forEach(tok => {
    if (tok.type === "KEYWORD" && tok.value === "actor") {
      currentActor = { type: "ActorDeclaration", name: "", elements: [] };
      ast.body.push(currentActor);
    } else if (tok.type === "IDENTIFIER" && currentActor && !currentActor.name) {
      currentActor.name = tok.value;
    } else if (tok.type === "KEYWORD" && tok.value === "circuit") {
      currentCircuit = { type: "QuantumCircuit", name: "", gates: [] };
      ast.body.push(currentCircuit);
    } else if (tok.type === "IDENTIFIER" && currentCircuit && !currentCircuit.name) {
      currentCircuit.name = tok.value;
    }
  });

  // Build simulated BEAM-X bytecode instructions
  const bytecode: string[] = [];
  bytecode.push("; --- BEAM-X Bytecode v3.0 Assembly ---");
  bytecode.push(".module aether_compiled_node");
  bytecode.push(".export [start/0, init/1, handle_call/3]");
  bytecode.push("");
  bytecode.push("label_1:");
  bytecode.push("  func_info start/0");
  bytecode.push("  allocate 0 0");
  bytecode.push("  move {atom, true} x0");
  bytecode.push("  deallocate");
  bytecode.push("  return");

  if (code.includes("actor")) {
    const actorName = (code.match(/actor\s+([a-zA-Z0-9_]+)/) || [])[1] || "unnamed_actor";
    bytecode.push("");
    bytecode.push(`; Process Actor Registration for: ${actorName}`);
    bytecode.push(`spawn_actor ${actorName}, loop/1`);
  }
  if (code.includes("quantum")) {
    bytecode.push("");
    bytecode.push("; Initialize Quantum super-positions");
    bytecode.push("hadamard q0");
    bytecode.push("measure q0, x0");
  }
  if (code.includes("heal")) {
    bytecode.push("");
    bytecode.push("; Setup AI-assisted self-healing supervision");
    bytecode.push("supervise_self_healing_link retry_count=3, policy=exponential_backoff");
  }

  // Formulate verification proof (Ada/SPARK compliance)
  const mathProof = {
    status: ethicalErrors.length > 0 ? "REJECTED" : "VERIFIED",
    assertionsProved: [
      "No Out-Of-Bounds (Memory-Safe/Rust ownership rules satisfied)",
      "Infinite Liveness guaranteed (Deadlock free)",
      "Strict No-Coercion Isolation Context validated",
      "Sparrow Rainbow Village royalty compliance ledger verified (90/10 allocation)"
    ],
    ethicsCompliance: ethicalErrors.length > 0 ? "FAIL" : "PASS",
    errors: ethicalErrors
  };

  res.json({
    success: ethicalErrors.length === 0,
    tokens: tokens.slice(0, 50), // Send first 50 tokens
    ast,
    verification: mathProof,
    bytecode: bytecode.join("\n")
  });
});

// Aetherion Self-Healing Simulation Controller
app.post("/api/aetherion/simulate-heal", (req, res) => {
  const { faultType } = req.body;
  
  const steps: Array<{ stage: string; action: string; duration: number; status: string }> = [
    {
      stage: "DETECTION",
      action: `Aetherion Telemetry Agent logs anomaly: [Fault Alert: ${faultType || "Memory Leak"}]`,
      duration: 300,
      status: "TRIGGERED"
    },
    {
      stage: "DIAGNOSIS",
      action: "AI-assisted Root Cause Analysis (BEAM-X scheduler inspector) isolates node fault",
      duration: 500,
      status: "RUNNING"
    },
    {
      stage: "REPAIR",
      action: "Executing 'heal' directive payload: Initiating automatic service roll-back to previous stable state & cold restart",
      duration: 800,
      status: "RUNNING"
    },
    {
      stage: "VERIFICATION",
      action: "Running integrity testing routines: Checking state coherence via CRDT logs and memory allocation sanity checks",
      duration: 400,
      status: "RUNNING"
    },
    {
      stage: "RECOVERY",
      action: "Re-establishing edge subscriber connections. Telemetry is fully green. Incident report stored in AetherDB sovereign tables.",
      duration: 300,
      status: "COMPLETED"
    }
  ];

  res.json({ faultType, steps });
});

// Aether Stress Report Endpoint using Gemini API
app.post("/api/aetherion/stress-report", async (req, res) => {
  const { throughput, throughputHistory } = req.body;
  
  if (typeof throughput !== "number" || !Array.isArray(throughputHistory)) {
    return res.status(400).json({ error: "Invalid throughput or history payload." });
  }

  try {
    const client = getGeminiClient();

    const systemInstruction = `You are AetherDiag, the Sovereign Diagnostic and Clustering Intelligence for the Aetherion Programming Language v3.0 on BEAM-X.
You analyze system metrics and produce highly advanced, predictive stress reports.
Your tone is deeply technical, authoritative, yet aligned with the sovereign directives of Architect Mandlenkosi Vundla and the Triad: Theodore Swarts, Mrs. Codex, and Sempi Mvala.
You must use terminology matching Erlang OTP behaviors, supervisors, cold restarts, quantum superposition registers, and Earth-dynamics/Earodynamics.`;

    const prompt = `Analyze the current throughput performance metrics of the Aetherion Sovereign cluster:
- Current Throughput: ${throughput} GB/s
- Throughput History (last 6 intervals): ${JSON.stringify(throughputHistory)} GB/s

Please calculate the stress profile of the BEAM-X runtime. Generate a predictive 'Aether Stress Report' suggesting optimization paths for this sovereign cluster.
Keep the analysis deeply tailored to Erlang OTP actor models, supervisor trees, and the Aetherion language paradigms.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stressLevel: {
              type: Type.NUMBER,
              description: "Calculated system stress level from 0 to 100",
            },
            status: {
              type: Type.STRING,
              description: "System health state: 'optimal', 'warning', or 'critical'",
            },
            analysis: {
              type: Type.STRING,
              description: "A brief 2-3 sentence analysis of current performance based on the throughput trends and sovereign cluster principles.",
            },
            predictions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 bullet point predictions on how the cluster will respond over the next hour if left unchecked.",
            },
            optimizationPaths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the optimization tactic" },
                  impact: { type: Type.STRING, description: "Tactic impact: 'Low', 'Medium', or 'High'" },
                  difficulty: { type: Type.STRING, description: "Tactic difficulty: 'Easy', 'Moderate', or 'Complex'" },
                  steps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Step by step procedures to execute the tactic"
                  }
                },
                required: ["name", "impact", "difficulty", "steps"]
              },
              description: "Recommended cluster optimization paths",
            },
            verificationSealed: {
              type: Type.BOOLEAN,
              description: "Flag indicating whether syntax integrity is cryptographically sealed.",
            }
          },
          required: ["stressLevel", "status", "analysis", "predictions", "optimizationPaths", "verificationSealed"]
        }
      }
    });

    const reportData = JSON.parse(response.text || "{}");
    res.json({ ...reportData, isSimulated: false });
  } catch (err: any) {
    console.warn("Falling back to simulated report due to Gemini API key status:", err.message);
    
    // Detailed, premium fallback simulation matching the exact schema
    const simulatedStressLevel = Math.max(15, Math.min(95, Math.round(throughput * 0.95 + (Math.random() - 0.5) * 15)));
    const simulatedStatus = simulatedStressLevel > 75 ? "critical" : simulatedStressLevel > 45 ? "warning" : "optimal";
    
    const fallbackReport = {
      stressLevel: simulatedStressLevel,
      status: simulatedStatus,
      analysis: `Current processing threshold (${throughput} GB/s) has induced moderate harmonic resonance across BEAM-X processes. High process density is detected in Erlang.Node.Master. The supervisor tree has initiated self-healing diagnostics in anticipation of possible thread contention.`,
      predictions: [
        "Failure to scale the actor ring will likely result in an exponential cascade of gen_server:call timeouts within 25 minutes.",
        "Earodynamics resonance wave degradation may decouple quantum state alignment in the sonic supervisor node."
      ],
      optimizationPaths: [
        {
          name: "Scale Actor Process Ring Pool",
          impact: "High",
          difficulty: "Easy",
          steps: [
            "Increase pool size of actor processes from 4 to 12 in sys.config",
            "Introduce supervisor child specs with dynamic round-robin routing logic",
            "Hot upgrade Node.Master with zero downtime"
          ]
        },
        {
          name: "Deploy Quantum Coherence Shield",
          impact: "Medium",
          difficulty: "Moderate",
          steps: [
            "Inject phase shift correction matrices on active qubit channels",
            "Enable real-time telemetry lock-down protocols via the Aetherion panel"
          ]
        }
      ],
      verificationSealed: true,
      isSimulated: true,
      hint: "Configure a GEMINI_API_KEY in the Settings > Secrets panel to connect to real-time artificial intelligence."
    };

    res.json(fallbackReport);
  }
});

// -------------------------------------------------------------
// Dev Server & Production serving
// -------------------------------------------------------------

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aetherion Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

start();
