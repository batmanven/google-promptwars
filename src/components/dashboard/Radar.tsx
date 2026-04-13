"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
declare global {
  interface Window {
    google: any;
  }
}
import { MapPin, Users, Wifi, Activity } from "lucide-react";
import { mockRadarData } from "@/lib/mock-data";

export function Radar() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Check if API key is available
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          console.log("Google Maps API key not available - using mock data");
          // Don't even try to load real maps, use mock data
          setMap(null);
          return;
        }

        setOptions({
          apiKey: apiKey,
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
              { elementType: "geometry", stylers: [{ color: "#f5f4ed" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#30302e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#f5f4ed" }] },
              { featureType: "water", stylers: [{ color: "#e8e6dc" }] },
              { featureType: "road", stylers: [{ color: "#d4d0c4" }] },
              { featureType: "poi", stylers: [{ visibility: "off" }] },
              { featureType: "transit", stylers: [{ visibility: "off" }] },
            ],
          });

          setMap(newMap);
        }
      } catch (error) {
        console.error("Error loading Google Maps - using mock data:", error);
        // Set error state to show fallback UI
        setMap(null);
      }
    };

    initMap();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#30302e] mb-1">Smart Radar</h2>
          <p className="text-sm text-[#87867f]">Real-time venue intelligence and crowd analysis</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#c96442]/10 border border-[#c96442]/30 rounded-full">
          <div className="w-2 h-2 bg-[#c96442] rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-[#c96442]">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-[#f0eee6] backdrop-blur-xl border border-[#d4d0c4] rounded-2xl overflow-hidden h-[500px] relative">
            {map ? (
              <>
                <div ref={mapRef} className="w-full h-full" />
                
                {/* Map Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#f0eee6]/90 backdrop-blur-md border border-[#d4d0c4] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#c96442] rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#30302e]">Gemini Lounge</p>
                      <p className="text-xs text-[#87867f]">High networking potential (~12 people)</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#c96442]">
                      <MapPin size={12} />
                      <span>2F</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-[#c96442]/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-[#c96442]" />
                </div>
                <h3 className="text-lg font-semibold text-[#30302e] mb-2">Map Unavailable</h3>
                <p className="text-sm text-[#87867f] mb-4 max-w-md">
                  Google Maps couldn't be loaded. Please ensure the Maps JavaScript API is enabled in your Google Cloud Console.
                </p>
                <div className="bg-[#e8e6dc] border border-[#d4d0c4] rounded-lg p-4 text-left max-w-md">
                  <p className="text-xs font-medium text-[#30302e] mb-2">To fix this issue:</p>
                  <ol className="text-xs text-[#87867f] space-y-1 list-decimal list-inside">
                    <li>Go to Google Cloud Console</li>
                    <li>Select your project</li>
                    <li>Enable "Maps JavaScript API"</li>
                    <li>Ensure your API key has proper restrictions</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Venue Insights */}
        <div className="space-y-4">
          <div className="bg-[#f0eee6] backdrop-blur-xl border border-[#d4d0c4] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#c96442] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#30302e]">Crowd Density</h3>
                <p className="text-xs text-[#87867f]">Real-time analysis</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#87867f]">Current</span>
                <span className="text-sm font-medium text-[#c96442]">{mockRadarData.crowdDensity.current} people</span>
              </div>
              <div className="w-full bg-[#e8e6dc] rounded-full h-2">
                <div className="bg-[#c96442] h-2 rounded-full" style={{width: `${(mockRadarData.crowdDensity.current / mockRadarData.crowdDensity.max) * 100}%`}}></div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#87867f]">Status: {mockRadarData.crowdDensity.status}</span>
                <span className="text-[#c96442]">{mockRadarData.crowdDensity.trend}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f0eee6] backdrop-blur-xl border border-[#d4d0c4] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#c96442] rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#30302e]">Network Quality</h3>
                <p className="text-xs text-[#87867f]">Connection status</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#87867f]">Signal</span>
                <span className="text-sm font-medium text-[#c96442]">{mockRadarData.networkQuality.signal}</span>
              </div>
              <div className="w-full bg-[#e8e6dc] rounded-full h-2">
                <div className="bg-[#c96442] h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#87867f]">Speed: {mockRadarData.networkQuality.speed}</span>
                <span className="text-[#c96442]">Latency: {mockRadarData.networkQuality.latency}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f0eee6] backdrop-blur-xl border border-[#d4d0c4] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#c96442] rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#30302e]">Activity Level</h3>
                <p className="text-xs text-[#87867f]">Engagement metric</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#87867f]">Score</span>
                <span className="text-sm font-medium text-[#c96442]">{mockRadarData.activityLevel.score}%</span>
              </div>
              <div className="w-full bg-[#e8e6dc] rounded-full h-2">
                <div className="bg-[#c96442] h-2 rounded-full" style={{width: `${mockRadarData.activityLevel.score}%`}}></div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#87867f]">Status: {mockRadarData.activityLevel.status}</span>
                <span className="text-[#c96442]">{mockRadarData.activityLevel.engagement}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
