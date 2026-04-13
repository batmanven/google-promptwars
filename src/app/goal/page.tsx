import { GoalSetter } from "@/components/dashboard/GoalSetter";

export default function GoalPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 lg:py-16 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Intent
            </h1>
            <p className="text-sm font-medium tracking-widest text-gray-400 uppercase">
              Autonomous Goal Alignment
            </p>
          </div>

          {/* Goal Setter */}
          <GoalSetter />

          {/* Info Card */}
          <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/20 rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Smart Adaptation</h3>
              <p className="text-gray-300 leading-relaxed">
                Aether will continuously adjust your Pulse and Radar based on your current intent, 
                providing personalized insights and recommendations that align with your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-xs font-medium text-cyan-400">Real-time</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs font-medium text-purple-400">Adaptive</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-400">Intelligent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
