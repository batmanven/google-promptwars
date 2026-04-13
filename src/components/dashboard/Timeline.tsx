"use client";

import { useEffect, useState } from "react";
import { getEventData, EventSession } from "@/lib/sheets";
import { Clock, MapPin } from "lucide-react";

export function Timeline() {
  const [sessions, setSessions] = useState<EventSession[]>([]);

  useEffect(() => {
    getEventData().then(setSessions);
  }, []);

  return (
    <div className="w-full space-y-4">
      <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-6">Upcoming Pulses</h2>
      {sessions.map((session) => (
        <div key={session.id} className="glass-card p-6 flex items-start gap-4">
          <div className="bg-[#7000ff]/10 p-3 rounded-full text-[#7000ff]">
            <Clock size={20} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-[#00f2ff] uppercase">{session.time}</span>
              <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase">
                <MapPin size={10} />
                {session.room}
              </div>
            </div>
            <h3 className="text-lg font-semibold">{session.title}</h3>
            <p className="text-sm text-gray-400">{session.speaker}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
