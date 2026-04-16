import { GoalSetter } from "@/components/dashboard/GoalSetter";

export default function GoalPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:py-16 max-w-4xl">
        <div className="space-y-8">

          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-[#30302e]">
              Intent
            </h1>
            <p className="text-sm font-medium tracking-widest text-[#87867f] uppercase">
              Autonomous Goal Alignment
            </p>
          </div>

          <GoalSetter />

          <div className="bg-[#f0eee6] border border-[#d4d0c4] rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#c96442] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <h3 className="text-xl font-semibold text-[#30302e]">Smart Adaptation</h3>
              <p className="text-[#87867f] leading-relaxed">
                Aether will continuously adjust your Pulse and Radar based on your current intent,
                providing personalized insights and recommendations that align with your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-[#c96442]/10 border border-[#c96442]/30 rounded-full">
                  <div className="w-2 h-2 bg-[#c96442] rounded-full"></div>
                  <span className="text-xs font-medium text-[#c96442]">Real-time</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#c96442]/10 border border-[#c96442]/30 rounded-full">
                  <div className="w-2 h-2 bg-[#c96442] rounded-full"></div>
                  <span className="text-xs font-medium text-[#c96442]">Adaptive</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#c96442]/10 border border-[#c96442]/30 rounded-full">
                  <div className="w-2 h-2 bg-[#c96442] rounded-full"></div>
                  <span className="text-xs font-medium text-[#c96442]">Intelligent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
