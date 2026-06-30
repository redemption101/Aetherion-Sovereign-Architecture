import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
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
