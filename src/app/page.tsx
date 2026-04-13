import { GoalSetter } from "@/components/dashboard/GoalSetter";
import { Timeline } from "@/components/dashboard/Timeline";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 lg:py-16 max-w-6xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Pulse
                </h1>
                <p className="text-sm font-medium tracking-widest text-gray-400 uppercase">
                  Real-time Intelligence
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-400">Live</span>
              </div>
            </div>

            {/* Goal Setter */}
            <GoalSetter />

            {/* Timeline */}
            <Timeline />
          </div>

          {/* Sidebar Content */}
          <div className="xl:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">System Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">AI Engine</span>
                    <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Data Sync</span>
                    <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-full">Real-time</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Network</span>
                    <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full">Connected</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-left text-sm text-gray-300 hover:text-white transition-colors">
                    Refresh Data
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-left text-sm text-gray-300 hover:text-white transition-colors">
                    Export Report
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-left text-sm text-gray-300 hover:text-white transition-colors">
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
