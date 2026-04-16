import { GoogleRadarMap } from "@/components/dashboard/GoogleRadarMap";
import { MapPin, Users, Wifi } from "lucide-react";

export default function RadarPage() {
  return (
    <div className="min-h-screen bg-[#f5f4ed] text-[#30302e]">
      <div className="container mx-auto px-4 py-8 lg:py-16 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-[#30302e]">
              Radar
            </h1>
            <p className="text-sm font-medium tracking-widest text-[#87867f] uppercase">
              Spatial Awareness
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#c96442]/10 border border-[#c96442]/30 rounded-full">
            <div className="w-2 h-2 bg-[#c96442] rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-[#c96442]">Live Tracking</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GoogleRadarMap />
          </div>

          <div className="space-y-6">
            <div className="bg-[#f0eee6]/90 backdrop-blur-md border border-[#d4d0c4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#30302e] mb-4">Venue Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#c96442] rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#30302e]">Gemini Lounge</p>
                    <p className="text-sm text-[#87867f]">High networking potential</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#c96442] rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#30302e]">12 People</p>
                    <p className="text-sm text-[#87867f]">Currently active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#c96442] rounded-lg flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#30302e]">Excellent</p>
                    <p className="text-sm text-[#87867f]">Network quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
