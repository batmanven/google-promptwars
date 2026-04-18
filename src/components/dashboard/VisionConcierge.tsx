"use client";

import { useCallback, useMemo, useState } from "react";
import { analyzeVision } from "@/lib/gemini";
import { Camera, RefreshCw, Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import { useUserContext } from "@/hooks/useUserContext";
import { translateAction } from "@/utils/aiActions";
import { Globe } from "lucide-react";

interface VisionAnalysis {
  title: string;
  summary: string;
  details: string[];
  recommendations: string[];
  insights: string;
}

export function VisionConcierge() {
  const [image, setImage] = useState<string | null>(null);
  const [visionData, setVisionData] = useState<VisionAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const context = useUserContext();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImage(base64);
      setLoading(true);

      try {
        const result = await analyzeVision(base64, file.type);
        const { logSingularityEvent } = await import("@/services/monitoringService");
        await logSingularityEvent("INFO", "Vision Signal Processed", { userId: context?.persona?.id });
        
        try {
          const cleanJson = result.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleanJson);
          setVisionData(parsed);
          context?.setVisionContext(parsed);
        } catch (e) {
          const fallback = {
            title: "Analysis Complete",
            summary: result.substring(0, 100) + "...",
            details: ["Data received in legacy format"],
            recommendations: ["Check logs for parsing details"],
            insights: "AI responded outside of deterministic schema."
          };
          setVisionData(fallback);
          context?.setVisionContext(fallback);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const reset = useCallback(() => {
    setImage(null);
    setVisionData(null);
  }, []);

  const handleTranslate = async (lang: string) => {
    if (!visionData?.insights) return;
    setTranslating(true);
    try {
      const translated = await translateAction(visionData.insights, lang);
      setVisionData(prev => prev ? { ...prev, insights: translated } : null);
    } catch (err: any) {
      const { reportAetherError } = await import("@/services/monitoringService");
      await reportAetherError("Translation Engine Failure", err);
    } finally {
      setTranslating(false);
    }
  };

  const memoizedDetails = useMemo(() => visionData?.details || [], [visionData]);
  const memoizedRecs = useMemo(() => visionData?.recommendations || [], [visionData]);

  return (
    <div className="w-full">
      <div className="bg-[#f0eee6] backdrop-blur-xl border border-[#d4d0c4] rounded-3xl p-6 lg:p-12 text-center space-y-8 min-h-[400px] flex flex-col items-center justify-center">
        {image ? (
          <div className="w-full space-y-8 max-w-2xl text-left">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="relative group">
                <Image
                  src={image}
                  alt="Uploaded Context"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl border border-[#d4d0c4]"
                />
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-[#c96442] text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
                    Input Source
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {loading ? (
                  <div className="space-y-4 animate-soft-pulse">
                    <div className="h-4 bg-[#d4d0c4] rounded w-3/4" />
                    <div className="h-10 bg-[#e8e6dc] rounded-xl" />
                    <div className="h-32 bg-[#e8e6dc] rounded-xl" />
                  </div>
                ) : visionData && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div>
                      <h2 className="text-3xl font-bold text-[#30302e] tracking-tight">{visionData.title}</h2>
                      <p className="text-sm text-[#87867f] mt-2 leading-relaxed italic">{visionData.summary}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#c96442]">
                        <RefreshCw size={14} className="animate-spin-slow" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Logic Output</span>
                      </div>
                      <div className="flex flex-wrap gap-2" role="list">
                        {memoizedDetails.map((detail: string, i: number) => (
                          <span key={i} role="listitem" className="px-3 py-1 bg-[#e8e6dc] text-[#30302e] text-[10px] font-bold rounded-md border border-[#d4d0c4]/50">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!loading && visionData && (
              <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="bg-[#f5f4ed] border border-[#d4d0c4] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 text-[#c96442]">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Recommendations</span>
                  </div>
                  <ul className="space-y-2">
                    {visionData.recommendations?.map((rec: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-[#87867f] leading-relaxed">
                        <span className="text-[#c96442] font-bold">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#30302e] text-[#faf9f5] border border-[#141413] rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[#c96442]">
                      <RefreshCw className={`w-5 h-5 ${translating ? 'animate-spin' : ''}`} />
                      <span className="text-xs font-bold uppercase tracking-wider">Pro Insights</span>
                    </div>
                    <div className="flex gap-2">
                      {["es", "hi", "ja"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleTranslate(lang)}
                          disabled={translating}
                          className="text-[10px] font-bold text-[#faf9f5]/60 hover:text-[#faf9f5] uppercase transition-colors"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed opacity-90">{visionData.insights}</p>
                </div>
              </div>
            )}

            <button
              onClick={reset}
              className="flex items-center gap-2 text-sm text-[#87867f] hover:text-[#30302e] transition-colors mx-auto pt-4 focus:ring-2 focus:ring-[#c96442] focus:ring-offset-2 rounded-lg"
              aria-label="Reset vision engine and upload new image"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Reset Vision Engine
            </button>
          </div>
        ) : (
          <div className="space-y-8 max-w-md">
            <div className="w-24 h-24 mx-auto bg-[#c96442] rounded-full flex items-center justify-center shadow-2xl shadow-[#c96442]/30 relative overflow-hidden group">
              <Camera className="w-10 h-10 text-white relative z-10 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#b05638] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-[#30302e] tracking-tight">Vision Concierge</h2>
              <p className="text-[#87867f] leading-relaxed font-medium">
                The peak of event analysis. Upload any physical visual—Aether will extract, decode, and prioritize your next move.
              </p>
            </div>

            <label
              htmlFor="vision-upload"
              className="group cursor-pointer inline-flex items-center gap-3 bg-[#30302e] text-white px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 hover:bg-[#141413] shadow-2xl shadow-[#30302e]/20 focus-within:ring-4 focus-within:ring-[#c96442]/30"
            >
              <Upload className="w-5 h-5" aria-hidden="true" />
              Analyze Visual
              <input
                id="vision-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleUpload}
              />
            </label>
            <div className="sr-only" aria-live="polite">
              {loading ? "Analyzing visual data, please wait..." : visionData ? "Analysis complete." : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
