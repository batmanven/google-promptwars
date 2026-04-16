import { GoalSetter } from "@/components/dashboard/GoalSetter";
import { Timeline } from "@/components/dashboard/Timeline";

export default function PulsePage() {
  return (
    <main className="min-h-screen bg-[#f5f4ed] text-[#30302e]">
      <div className="container mx-auto px-4 py-8 lg:py-16 max-w-6xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-[#30302e]">
                  Pulse
                </h1>
                <p className="text-sm font-medium tracking-widest text-[#87867f] uppercase">
                  Real-time Intelligence
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-[#c96442]/10 border border-[#c96442]/30 rounded-full">
                <div className="w-2 h-2 bg-[#c96442] rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-[#c96442]">Live</span>
              </div>
            </div>

            <GoalSetter />
            <Timeline />
          </div>

          <div className="xl:col-span-1">
            <div className="bg-[#f0eee6] backdrop-blur-xl border border-[#d4d0c4] rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#30302e] mb-2">System Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#87867f]">AI Engine</span>
                    <span className="text-xs px-2 py-1 bg-[#c96442]/10 text-[#c96442] rounded-full">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#87867f]">Data Sync</span>
                    <span className="text-xs px-2 py-1 bg-[#c96442]/10 text-[#c96442] rounded-full">Real-time</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#87867f]">Network</span>
                    <span className="text-xs px-2 py-1 bg-[#c96442]/10 text-[#c96442] rounded-full">Connected</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#d4d0c4] pt-6">
                <h3 className="text-lg font-semibold text-[#30302e] mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-[#e8e6dc] hover:bg-[#d4d0c4] rounded-lg text-left text-sm text-[#87867f] hover:text-[#30302e] transition-colors">
                    Refresh Data
                  </button>
                  <button className="w-full px-4 py-2 bg-[#e8e6dc] hover:bg-[#d4d0c4] rounded-lg text-left text-sm text-[#87867f] hover:text-[#30302e] transition-colors">
                    Export Report
                  </button>
                  <button className="w-full px-4 py-2 bg-[#e8e6dc] hover:bg-[#d4d0c4] rounded-lg text-left text-sm text-[#87867f] hover:text-[#30302e] transition-colors">
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
