"use client";

import { useState } from "react";
import { analyzeVision } from "@/lib/gemini";
import { Camera, RefreshCw, Sparkles } from "lucide-react";

export function VisionConcierge() {
  const [image, setImage] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImage(base64);
      setLoading(true);
      
      const buffer = await file.arrayBuffer();
      const result = await analyzeVision(buffer, file.type);
      setResponse(result);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setImage(null);
    setResponse("");
  };

  return (
    <div className="w-full space-y-6">
      <div className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px] relative overflow-hidden">
        {image ? (
          <div className="w-full space-y-4">
            <img src={image} alt="Upload" className="w-full h-48 object-cover rounded-xl border border-white/10" />
            <div className="p-4 bg-[#7000ff]/10 border border-[#7000ff]/20 rounded-xl text-left animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 mb-2 text-[#00f2ff]">
                <Sparkles size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Aether Insights</span>
              </div>
              <p className="text-sm leading-relaxed">{loading ? "Processing visual context..." : response}</p>
            </div>
            <button onClick={reset} className="flex items-center gap-2 text-xs text-gray-500 hover:text-white mx-auto transition-colors">
              <RefreshCw size={14} />
              Try Another
            </button>
          </div>
        ) : (
          <>
            <div className="bg-[#00f2ff]/10 p-6 rounded-full text-[#00f2ff] pulse">
              <Camera size={40} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Vision Concierge</h2>
              <p className="text-sm text-gray-400 max-w-xs">Upload a photo of a banner, venue map, or room to get instant AI context.</p>
            </div>
            <label className="cursor-pointer bg-[#00f2ff] text-black px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 active:scale-95">
              Capture Pulse
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </label>
          </>
        )}
      </div>
    </div>
  );
}
