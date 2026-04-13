"use client";

import { useState } from "react";
import { getAetherResponse } from "@/lib/gemini";
import { Send, Sparkles, Target } from "lucide-react";

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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="What is your main goal today?"
            className="w-full bg-[#e8e6dc] border border-[#d4d0c4] rounded-xl px-4 py-4 pr-14 focus:outline-none focus:border-[#c96442] focus:ring-2 focus:ring-[#c96442]/20 transition-all placeholder-[#87867f] text-[#30302e]"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#c96442] text-white rounded-lg hover:shadow-lg hover:shadow-[#c96442]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      {response && (
        <div className="bg-[#f5f4ed] border border-[#d4d0c4] rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#c96442]" />
            <span className="text-sm font-bold text-[#c96442] uppercase tracking-wider">AI Response</span>
          </div>
          <p className="text-[#87867f] leading-relaxed">{response}</p>
        </div>
      )}
    </div>
  );
}
