"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldCheck, Zap, Server, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function SystemHUD() {
  const { user } = useAuth();
  const [latency, setLatency] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 30) + 85);
      setUptime(prev => prev + 1);
    }, 2000);

    setTimeout(() => setIsVisible(true), 1500);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-right-10 duration-1000 select-none">
      <div className="liquid-glass p-5 rounded-2xl flex flex-col gap-4 min-w-[200px] border border-[#d4d0c4]/40 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#d4d0c4]/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] font-black text-[#30302e] uppercase tracking-widest">Aether Prime 20</span>
          </div>
          <span className="text-[9px] text-[#c96442] font-mono font-bold px-1.5 py-0.5 bg-[#c96442]/10 rounded">LIVE</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#87867f]">
                <Zap size={10} className="text-[#c96442]" />
                <span className="text-[9px] uppercase font-bold">Latency</span>
              </div>
              <span className="text-xs font-mono font-black text-[#30302e]">{latency}ms</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#87867f]">
                <Activity size={10} className="text-[#c96442]" />
                <span className="text-[9px] uppercase font-bold">Pulse</span>
              </div>
              <span className="text-xs font-mono font-black text-[#30302e]">O-20 Signal</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#87867f]">
                <ShieldCheck size={10} className="text-green-600" />
                <span className="text-[9px] uppercase font-bold">Domain</span>
              </div>
              <span className="text-xs font-mono font-black text-green-600">Locked</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#87867f]">
                <Globe size={10} className="text-[#c96442]" />
                <span className="text-[9px] uppercase font-bold">Identity</span>
              </div>
              <span className="text-xs font-mono font-black text-[#30302e] truncate w-16">
                {user ? user.uid.substring(0, 8) : "ANON"}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#d4d0c4]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server size={10} className="text-[#87867f]" />
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 rounded-full bg-[#c96442]"
                  style={{ animation: `soft-pulse 1.5s infinite ${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
          <span className="text-[9px] text-[#87867f] font-mono font-bold">
            {Math.floor(uptime/60)}m {uptime%60}s
          </span>
        </div>
      </div>
    </div>
  );
}
