"use client";

import { useEffect, useState } from "react";
import { getEventData, EventSession } from "@/lib/sheets";
import { Clock, MapPin, Calendar } from "lucide-react";

export function Timeline() {
  const [sessions, setSessions] = useState<EventSession[]>([]);

  useEffect(() => {
    getEventData().then(setSessions);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
          <p className="text-sm text-gray-400">Scheduled sessions and activities</p>
        </div>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 group">
            <div className="flex gap-6">
              {/* Time indicator */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {session.time.split(':')[0]}
                </div>
                <div className="text-xs text-gray-500 mt-1">{session.time.split(':')[1]}</div>
              </div>
              
              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {session.title}
                    </h3>
                    <p className="text-gray-400 mt-1">{session.speaker}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full">
                    <MapPin size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">{session.room}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-cyan-400">
                    <Clock size={12} />
                    <span className="font-medium">{session.time}</span>
                  </div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  <span className="text-xs text-gray-500">60 minutes</span>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  <span className="text-xs text-gray-500">Main Stage</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
