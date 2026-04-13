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
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Set Your Intent</h2>
          <p className="text-sm text-gray-400">Define your primary objective</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="What is your main goal today?"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 pr-14 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      {response && (
        <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/20 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">AI Response</span>
          </div>
          <p className="text-gray-300 leading-relaxed">{response}</p>
        </div>
      )}
    </div>
  );
}
