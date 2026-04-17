"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { MapPin } from "lucide-react";

interface Venue {
  name: string;
  lat: number;
  lng: number;
  description: string;
  stats: string;
}

export function GoogleRadarMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [, setMap] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const configRes = await fetch("/api/config");
        const config = await configRes.json();
        
        setOptions({
          key: config.mapsApiKey || "",
          v: "weekly",
          libraries: ["marker"],
        });

        const { Map, InfoWindow } = (await importLibrary("maps")) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement, PinElement } = (await importLibrary("marker")) as google.maps.MarkerLibrary;

        if (!mapRef.current) return;

        const mapOptions: google.maps.MapOptions = {
          center: { lat: 12.9716, lng: 77.5946 },
          zoom: 18,
          disableDefaultUI: true,
          mapId: "AETHER_RADAR_MAP_ID",
        };

        const mapInstance = new Map(mapRef.current, mapOptions);
        setMap(mapInstance);

        const venues: Venue[] = [
          { name: "Gemini Lounge", lat: 12.9716, lng: 77.5946, description: "High networking potential", stats: "2F • 12 people" },
          { name: "Stage A", lat: 12.9714, lng: 77.5944, description: "Main presentation", stats: "Ground Floor • 45 people" },
          { name: "Collaboration Zone", lat: 12.9718, lng: 77.5948, description: "Team formation happening", stats: "3F • 8 people" }
        ];

        venues.forEach((venue) => {
          const pin = new PinElement({
            background: "#c96442",
            borderColor: "#ffffff",
            glyphColor: "#ffffff",
            scale: 1.2
          });

          const marker = new AdvancedMarkerElement({
            position: { lat: venue.lat, lng: venue.lng },
            map: mapInstance,
            title: venue.name,
            content: pin.element
          });

          const infoWindow = new InfoWindow({
            content: `
              <div style="padding: 12px; font-family: sans-serif; min-width: 150px; background: #f5f4ed; color: #141413;">
                <h4 style="margin: 0 0 4px 0; font-weight: 600;">${venue.name}</h4>
                <p style="margin: 0 0 4px 0; color: #5e5d59; font-size: 13px;">${venue.description}</p>
                <span style="color: #c96442; font-size: 11px; font-weight: 700; text-transform: uppercase;">${venue.stats}</span>
              </div>
            `,
          });

          marker.addListener("gmp-click", () => {
            infoWindow.open({ anchor: marker, map: mapInstance });
          });
        });
      } catch (err) {
        console.error("Radar Error:", err);
        setError("Please add a valid Google Maps API Key to enable Radar.");
      }
    };

    initMap();
  }, []);

  return (
    <div className="w-full h-[500px] relative rounded-3xl overflow-hidden border border-[#d4d0c4] shadow-2xl">
      <div ref={mapRef} className="w-full h-full" aria-label="Google Maps Venue Radar" />
      {error && (
        <div className="absolute inset-0 bg-[#f5f4ed]/90 backdrop-blur-sm flex items-center justify-center p-8 text-center">
          <p className="text-sm text-[#5e5d59] font-medium leading-relaxed">{error}</p>
        </div>
      )}
      <div className="absolute bottom-6 left-6 right-6 z-10 hidden sm:flex justify-between items-center bg-[#f0eee6]/90 backdrop-blur-md border border-[#d4d0c4] rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c96442] rounded-lg flex items-center justify-center shadow-lg shadow-[#c96442]/20">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#30302e] uppercase tracking-wider">Aether Radar</p>
            <p className="text-[10px] text-[#87867f]">Real-time spatial intelligence</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-[#c96442]/5 border border-[#c96442]/20 rounded-full">
          <span className="text-[10px] font-bold text-[#c96442] uppercase tracking-widest">Advanced Markers v1 Enabled</span>
        </div>
      </div>
    </div>
  );
}
