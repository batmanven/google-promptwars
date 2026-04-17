"use client";

import { useEffect, useState } from "react";
import { getEventData, EventSession } from "@/lib/sheets";
import { Clock, MapPin, Calendar } from "lucide-react";

export function Timeline() {
  const [sessions, setSessions] = useState<EventSession[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const data = await getEventData();
      setSessions(data);
      setLastUpdated(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#c96442] rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#30302e]">Upcoming Events</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-[#87867f]">Scheduled sessions and activities</p>
            <div className="w-1 h-1 bg-[#d4d0c4] rounded-full"></div>
            <p className="text-[10px] font-bold text-[#c96442] uppercase tracking-wider">
              {isRefreshing ? 'Syncing...' : `Last synced: ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="bg-[#f0eee6] backdrop-blur-xl border border-[#d4d0c4] rounded-2xl p-6 hover:border-[#c96442]/30 transition-all duration-300 group">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#c96442] rounded-lg flex items-center justify-center text-white font-bold">
                  {session.time.split(':')[0]}
                </div>
                <div className="text-xs text-[#87867f] mt-1">{session.time.split(':')[1]}</div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-[#30302e] group-hover:text-[#c96442] transition-colors">
                      {session.title}
                    </h3>
                    <p className="text-[#87867f] mt-1">{session.speaker}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#e8e6dc] rounded-full">
                    <MapPin size={12} className="text-[#87867f]" />
                    <span className="text-xs text-[#87867f] font-medium">{session.room}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-[#c96442]">
                    <Clock size={12} />
                    <span className="font-medium">{session.time}</span>
                  </div>
                  <div className="w-2 h-2 bg-[#d4d0c4] rounded-full"></div>
                  <span className="text-xs text-[#87867f]">60 minutes</span>
                  <div className="w-2 h-2 bg-[#d4d0c4] rounded-full"></div>
                  <span className="text-xs text-[#87867f]">Main Stage</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
