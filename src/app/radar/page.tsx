import { Radar } from "@/components/dashboard/Radar";

export default function RadarPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 lg:py-16 max-w-6xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Radar
              </h1>
              <p className="text-sm font-medium tracking-widest text-gray-400 uppercase">
                Spatial Awareness
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-400">Live Tracking</span>
            </div>
          </div>

          {/* Radar Component */}
          <Radar />
        </div>
      </div>
    </main>
  );
}
