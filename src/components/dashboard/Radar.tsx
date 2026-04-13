"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export function Radar() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
      libraries: ["marker"],
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const eventLocation = { lat: 12.9716, lng: 77.5946 };
        const newMap = new google.maps.Map(mapRef.current, {
          center: eventLocation,
          zoom: 18,
          mapId: "AETHER_RADAR_MAP",
          disableDefaultUI: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#050505" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
            { featureType: "water", stylers: [{ color: "#000000" }] },
          ],
        });
        setMap(newMap);
      }
    });
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400">Smart Radar</h2>
          <p className="text-[10px] text-[#00f2ff]">Real-time Venue Pulse</p>
        </div>
        <div className="px-3 py-1 bg-[#00f2ff]/10 border border-[#00f2ff]/30 rounded-full text-[10px] font-bold text-[#00f2ff] uppercase">
          Live
        </div>
      </div>

      <div className="glass-card h-[400px] w-full overflow-hidden relative">
        <div ref={mapRef} className="w-full h-full" />
        <div className="absolute bottom-4 left-4 right-4 p-4 glass-card bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00f2ff] pulse" />
            <p className="text-xs font-semibold">Gemini Lounge: High Networking Potential (~12 people)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
