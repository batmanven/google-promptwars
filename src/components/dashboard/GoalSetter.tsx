"use client";

import { useState } from "react";
import { Send, Sparkles, Target } from "lucide-react";
import { getAetherResponse } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function GoalSetter() {
  const [goal, setGoal] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: goal }),
      });

      if (!resp.ok) throw new Error("Stream failure");

      const reader = resp.body?.getReader();
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          setResponse((prev) => prev + chunk);
        }
      }
    } catch (error) {
      console.error("Streaming Error:", error);
      // Fallback if stream fails
      const fallback = await getAetherResponse(goal);
      setResponse(fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0eee6] backdrop-blur-xl border border-[#d4d0c4] rounded-2xl p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#c96442] rounded-lg flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#30302e]">Set Your Intent</h2>
          <p className="text-sm text-[#87867f]">Define your primary objective</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Goal setting form">
        <div className="relative">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="What is your main goal today?"
            aria-label="Your primary objective"
            className="w-full bg-[#e8e6dc] border border-[#d4d0c4] rounded-xl px-4 py-4 pr-14 focus:outline-none focus:border-[#c96442] focus:ring-2 focus:ring-[#c96442]/20 transition-all placeholder-[#87867f] text-[#30302e]"
          />
          <button
            type="submit"
            disabled={loading}
            aria-label="Send goal for AI analysis"
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-3 bg-[#c96442] text-white rounded-lg hover:shadow-lg hover:shadow-[#c96442]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-soft-pulse" /> : <Send size={18} />}
          </button>
        </div>
      </form>

      {response && (
        <div 
          className="bg-[#f5f4ed] border border-[#d4d0c4] rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700"
          role="region"
          aria-live="polite"
          aria-label="AI Generated Insights"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#c96442]" aria-hidden="true" />
            <span className="text-sm font-bold text-[#c96442] uppercase tracking-wider">AI Insight</span>
          </div>
          <div className="prose prose-sm max-w-none text-[#87867f] leading-relaxed [&_h2]:text-[#30302e] [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-4 [&_ul]:text-[#87867f] [&_ol]:text-[#87867f] [&_li]:text-[#87867f] [&_li]:mb-1 [&_strong]:text-[#c96442] [&_em]:text-[#c96442]">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
            >
              {response}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
