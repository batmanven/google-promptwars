"use client";

import { useState } from "react";
import { getAetherResponse } from "@/lib/gemini";
import { Send, Sparkles } from "lucide-react";

export function GoalSetter() {
  const [goal, setGoal] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    const result = await getAetherResponse(goal);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="w-full glass-card p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={18} className="text-[#00f2ff]" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#00f2ff]">Set Your Intent</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What is your main goal today?"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:border-[#00f2ff] transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#00f2ff] hover:bg-[#00f2ff]/10 rounded-lg transition-colors disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </form>

      {response && (
        <div className="p-4 bg-[#7000ff]/10 border border-[#7000ff]/20 rounded-xl animate-in fade-in slide-in-from-bottom-2">
          <p className="text-sm leading-relaxed">{response}</p>
        </div>
      )}
    </div>
  );
}
