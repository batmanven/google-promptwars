"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
declare global {
  interface Window {
    google: any;
  }
}
import { MapPin, Users, Wifi, Activity } from "lucide-react";

export function Radar() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        setOptions({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
          version: "weekly",
          libraries: ["marker"],
        } as any);

        const { Map } = await importLibrary("maps");

        if (mapRef.current) {
          const eventLocation = { lat: 12.9716, lng: 77.5946 };

          const newMap = new Map(mapRef.current, {
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
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Smart Radar</h2>
          <p className="text-sm text-gray-400">Real-time venue intelligence and crowd analysis</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-green-400">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden h-[500px] relative">
            <div ref={mapRef} className="w-full h-full" />
            
            {/* Map Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Gemini Lounge</p>
                  <p className="text-xs text-gray-400">High networking potential (~12 people)</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-cyan-400">
                  <MapPin size={12} />
                  <span>2F</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Insights */}
        <div className="space-y-4">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Crowd Density</h3>
                <p className="text-xs text-gray-400">Real-time analysis</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Current</span>
                <span className="text-sm font-medium text-cyan-400">12 people</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full" style={{width: '40%'}}></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Network Quality</h3>
                <p className="text-xs text-gray-400">Connection status</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Signal</span>
                <span className="text-sm font-medium text-green-400">Excellent</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Activity Level</h3>
                <p className="text-xs text-gray-400">Engagement metric</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Score</span>
                <span className="text-sm font-medium text-purple-400">High</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
