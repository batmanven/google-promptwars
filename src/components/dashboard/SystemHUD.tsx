"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldCheck, Zap, Server } from "lucide-react";

export function SystemHUD() {
  const [latency, setLatency] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Simulate real-time metrics for observability wow-factor
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 45) + 120); // 120ms - 165ms range
      setUptime(prev => prev + 1);
    }, 2000);

    // Initial delay for entrance animation
    setTimeout(() => setIsVisible(true), 1500);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-right-10 duration-1000">
      <div className="liquid-glass p-4 rounded-2xl flex flex-col gap-3 min-w-[180px]">
        <div className="flex items-center justify-between border-b border-[#d4d0c4]/40 pb-2 mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-[#30302e] uppercase tracking-tighter">System Health</span>
          </div>
          <span className="text-[9px] text-[#87867f] font-mono">v1.2.4r</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#87867f]">
              <Zap size={10} className="text-[#c96442]" />
              <span className="text-[10px] uppercase font-bold tracking-tight">Latency</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#c96442]">{latency}ms</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#87867f]">
              <Activity size={10} className="text-[#c96442]" />
              <span className="text-[10px] uppercase font-bold tracking-tight">Sync</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#c96442]">Active</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#87867f]">
              <ShieldCheck size={10} className="text-[#c96442]" />
              <span className="text-[10px] uppercase font-bold tracking-tight">Secure</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-green-600">Locked</span>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-[#d4d0c4]/40 flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <Server size={8} className="text-[#87867f]" />
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`w-1 h-2 rounded-full ${i < 4 ? 'bg-[#c96442]' : 'bg-[#d4d0c4]'}`} 
                  style={{ animation: `soft-pulse 2s infinite ${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
          <span className="text-[8px] text-[#87867f] font-mono">UP: {Math.floor(uptime/60)}m {uptime%60}s</span>
        </div>
      </div>
    </div>
  );
}
