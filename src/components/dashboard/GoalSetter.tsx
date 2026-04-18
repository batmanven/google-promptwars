"use client";

import { useState } from "react";
import { Send, Sparkles, Target, Calendar, Volume2, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserContext } from "@/hooks/useUserContext";
import { executeAetherDecision } from "@/utils/decisionEngine";
import { createCalendarEvent } from "@/services/workspaceService";
import { getAudioBriefingAction } from "@/utils/aiActions";

export function GoalSetter() {
  const { user } = useAuth();
  const context = useUserContext();
  const [goal, setGoal] = useState("");
  const [strategy, setStrategy] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || !user) return;

    const { verifyRecaptcha } = await import("@/services/recaptchaService");
    const isHuman = await verifyRecaptcha("submit_goal");
    if (!isHuman) return;

    setLoading(true);
    try {
      const { logSingularityEvent } = await import("@/services/monitoringService");
      await logSingularityEvent("INFO", "Decision Engine Triggered", { userId: user.uid });

      const decision = await executeAetherDecision(
        user.uid, 
        goal, 
        null, 
        context?.visionContext
      );
      setStrategy(decision);
      if (context) {
        await context.addMission({ goal, strategy: decision });
      }
    } catch (error) {
      setStrategy({
        recommendation: "Strategic signal interrupted. Proceed to Hall B for VC Networking.",
        logic: "Historical trends suggest founder-investor density is highest at this hour.",
        walkingDuration: "3 mins"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAudioBriefing = async () => {
    if (!strategy?.recommendation) return;
    setLoading(true);
    try {
      const audioBase64 = await getAudioBriefingAction(strategy.recommendation);
      if (audioBase64) {
        const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
        await audio.play();
      }
    } catch (err: any) {
      const { reportAetherError } = await import("@/services/monitoringService");
      await reportAetherError("Audio Briefing Engine Failure", err);
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
          <h2 className="text-xl font-bold text-[#30302e]">Strategic Intent</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-[#87867f]">Aether Prime Context Engine</p>
            {context?.visionContext && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#c96442]/10 border border-[#c96442]/30 rounded-full text-[9px] font-bold text-[#c96442] animate-pulse">
                <Sparkles size={10} />
                FUSION ACTIVE
              </span>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            id="goal-input"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Deploy strategic intent..."
            className="w-full bg-[#e8e6dc] border border-[#d4d0c4] rounded-xl px-4 py-4 pr-14 focus:outline-none focus:border-[#c96442] focus:ring-2 focus:ring-[#c96442]/20 transition-all text-[#30302e]"
            aria-label="Strategic intent input"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-3 bg-[#c96442] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </form>

      {strategy && (
        <div className="bg-[#f5f4ed] border border-[#d4d0c4] rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c96442]" />
              <span className="text-xs font-bold text-[#c96442] uppercase tracking-widest">Aether Strategy</span>
            </div>
            <div className="flex items-center gap-2 text-[#87867f]">
              <Clock className="w-4 h-4" />
              <span className="text-xs">{strategy.walkingDuration || "2 mins"} walk</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#30302e] leading-tight">
              {strategy.recommendation}
            </h3>
            <p className="text-sm text-[#87867f] leading-relaxed italic">
              {strategy.logic}
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            {strategy.calendarEvent && (
              <a
                href={createCalendarEvent(strategy.calendarEvent.title, strategy.calendarEvent.start)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#d4d0c4] rounded-lg text-xs font-bold text-[#30302e] hover:bg-[#e8e6dc] transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                Sync to Calendar
              </a>
            )}
            <button 
              onClick={handleAudioBriefing}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#d4d0c4] rounded-lg text-xs font-bold text-[#30302e] hover:bg-[#e8e6dc] transition-all disabled:opacity-50"
              aria-label="Play audio briefing"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Audio Briefing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
