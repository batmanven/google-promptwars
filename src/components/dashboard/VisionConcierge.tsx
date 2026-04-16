"use client";

import { useState } from "react";
import { analyzeVision } from "@/lib/gemini";
import { Camera, RefreshCw, Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

      try {
        const result = await analyzeVision(base64, file.type);
        setResponse(result);
      } catch (error) {
        console.error("Vision Analyze Error:", error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setImage(null);
    setResponse("");
  };

  return (
    <div className="w-full">
      <div className="bg-[#f0eee6] backdrop-blur-xl border border-[#d4d0c4] rounded-3xl p-12 text-center space-y-8 min-h-[400px] flex flex-col items-center justify-center">
        {image ? (
          <div className="w-full space-y-6 max-w-lg">
            <div className="relative group">
              <Image
                src={image}
                alt="Uploaded"
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#30302e]/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="bg-[#f5f4ed] border border-[#d4d0c4] rounded-2xl p-6 text-left">
              <div className="flex items-center gap-3 mb-4 text-[#c96442]">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">AI Analysis</span>
              </div>
              <div className="prose prose-sm max-w-none text-[#87867f] leading-relaxed [&_h2]:text-[#30302e] [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-4 [&_ul]:text-[#87867f] [&_ol]:text-[#87867f] [&_li]:text-[#87867f] [&_li]:mb-1 [&_strong]:text-[#c96442] [&_em]:text-[#c96442]" aria-live="polite">
                {loading ? (
                  <p>Analyzing visual context...</p>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response}
                  </ReactMarkdown>
                )}
              </div>
            </div>

            <button
              onClick={reset}
              className="flex items-center gap-2 text-sm text-[#87867f] hover:text-[#30302e] transition-colors mx-auto"
              aria-label="Upload another image"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try Another Image
            </button>
          </div>
        ) : (
          <div className="space-y-8 max-w-md">
            <div className="w-20 h-20 mx-auto bg-[#c96442] rounded-full flex items-center justify-center shadow-lg shadow-[#c96442]/25">
              <Camera className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#30302e]">Vision Concierge</h2>
              <p className="text-[#87867f] leading-relaxed">
                Upload a photo of a banner, venue map, or room to get instant AI-powered insights and analysis.
              </p>
            </div>

            <label
              className="group cursor-pointer inline-flex items-center gap-3 bg-[#c96442] text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#c96442]/25"
              aria-label="Upload image for analysis"
            >
              <Upload className="w-5 h-5" aria-hidden="true" />
              Capture Pulse
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                aria-label="Upload photo"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
