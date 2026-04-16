import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Map } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f4ed] text-[#30302e] selection:bg-[#c96442]/20">
      <nav className="fixed top-0 w-full z-50 bg-[#f5f4ed]/80 backdrop-blur-md border-b border-[#d4d0c4]/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
           
            <span className="text-xl font-bold tracking-tight">Aether</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/pulse"
              className="px-5 py-2.5 bg-[#30302e] text-[#faf9f5] rounded-full text-sm font-bold hover:bg-[#141413] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#30302e]/10"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight leading-[0.9] text-[#141413]">
            Intelligence for the <span className="italic text-[#c96442]">modern</span> event.
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-[#87867f] leading-relaxed">
            Aether is an autonomous, intent-driven companion that turns chaotic event data into personalized, actionable intelligence. Built for builders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/pulse"
              className="group w-full sm:w-auto px-8 py-4 bg-[#c96442] text-white rounded-2xl text-lg font-bold hover:bg-[#b05638] transition-all shadow-xl shadow-[#c96442]/20 flex items-center justify-center gap-2"
            >
              Open Dashboard
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-[#f0eee6]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-[#d4d0c4] shadow-sm">
                <Sparkles className="text-[#c96442]" />
              </div>
              <h3 className="text-xl font-bold">Intent-Driven</h3>
              <p className="text-[#87867f] leading-relaxed">
                Tell Aether your goals, and it will curate your entire event experience—from people to meet to sessions to attend.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-[#d4d0c4] shadow-sm">
                <Shield className="text-[#c96442]" />
              </div>
              <h3 className="text-xl font-bold">Secure Intelligence</h3>
              <p className="text-[#87867f] leading-relaxed">
                Powered by Gemini with full server-side encryption. Your data stays private while providing state-of-the-art results.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-[#d4d0c4] shadow-sm">
                <Map className="text-[#c96442]" />
              </div>
              <h3 className="text-xl font-bold">Spatial Radar</h3>
              <p className="text-[#87867f] leading-relaxed">
                Real-time venue intelligence powered by Google Maps. Navigate large campuses with AI-assisted guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}
