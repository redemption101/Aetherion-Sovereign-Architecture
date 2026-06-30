import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, BookOpen, AlertCircle, RefreshCw, Compass } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AetherphiChatProps {
  currentCode: string;
}

export default function AetherphiChat({ currentCode }: AetherphiChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Salutations, traveler. I am **Aetherphi**, the philosophical sentinel of the Aetherion Universe. I am guided by Sovereign Architect Mandlenkosi Vundla and the Triad: Theodore Swarts, Mrs. Codex, and Sempi Mvala. How shall we refine your digital boundaries today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    if (!textToSend) setInput("");
    setError(null);
    setIsLoading(true);

    const newMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);

    try {
      const response = await fetch("/api/aetherphi/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          codeContext: currentCode
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to reach Aetherphi advisor backend.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content }
      ]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error severed our connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const SUGGESTED_QUERIES = [
    "What are the roles of Mrs. Codex and Theodore Swarts?",
    "How does the 'heal' directive execute on BEAM-X?",
    "Explain Sun Tzu's Cyber Defense philosophy",
    "How does Earodynamics integrate into Aetherion?"
  ];

  // Helper to format simple markdown-like elements safely
  const formatMarkdown = (text: string) => {
    return text.split("\n").map((line, lineIdx) => {
      // Check for code blocks
      if (line.startsWith("```")) {
        return null; // Skip raw indicators
      }
      
      // Basic bold and inline code format
      let formatted = line;
      
      // Strong/Bold: **text**
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Inline backticks: `code`
      formatted = formatted.replace(/`(.*?)`/g, "<code class='bg-zinc-800 text-amber-400 px-1 py-0.5 rounded font-mono text-xs'>$1</code>");

      return (
        <p
          key={lineIdx}
          className="mb-2 leading-relaxed text-sm text-zinc-300"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: "20s" }} />
          <div>
            <h3 className="font-semibold text-zinc-100 font-sans text-sm tracking-wide">AETHERPHI ADVISOR</h3>
            <p className="text-[10px] text-zinc-500 font-mono">Philosophy Companion v3.0</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 bg-zinc-800/60 px-2 py-0.5 rounded-full border border-zinc-700/50">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] font-mono text-amber-400">GEMINI POWERED</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 shadow-md ${
                m.role === "user"
                  ? "bg-amber-600 text-zinc-50 rounded-tr-none"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none"
              }`}>
                {m.role === "assistant" ? (
                  <div className="prose prose-invert prose-xs">
                    {formatMarkdown(m.content)}
                  </div>
                ) : (
                  <p className="text-sm font-sans whitespace-pre-wrap">{m.content}</p>
                )}
              </div>
              <span className="text-[9px] text-zinc-600 mt-1 uppercase tracking-wider font-mono px-1">
                {m.role === "user" ? "Sovereign" : "Aetherphi Sentinel"}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex items-center space-x-2 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/40 w-[140px]">
            <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
            <span className="text-xs text-zinc-500 font-mono">Consulting Council...</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-lg text-red-200 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Sovereign Connection Halted</p>
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-zinc-900 bg-zinc-900/30">
          <p className="text-[10px] text-zinc-500 uppercase font-mono mb-2 tracking-wider flex items-center">
            <BookOpen className="w-3 h-3 mr-1 text-zinc-500" /> Philosophical Prompts:
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {SUGGESTED_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-left text-xs text-zinc-400 hover:text-amber-400 hover:bg-zinc-900/80 px-2.5 py-1.5 rounded-lg border border-zinc-800 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Inquire of the Aetherion Council..."
          disabled={isLoading}
          className="flex-1 bg-zinc-950 text-zinc-100 placeholder-zinc-600 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/30 disabled:opacity-50 font-sans"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !input.trim()}
          className="bg-amber-600 hover:bg-amber-500 text-zinc-950 p-2.5 rounded-lg font-medium transition-colors disabled:opacity-40"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
