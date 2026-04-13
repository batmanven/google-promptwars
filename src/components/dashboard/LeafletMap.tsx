"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Venue {
  name: string;
  coords: [number, number];
  icon: L.DivIcon;
  popup: string;
}

export function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Initialize map
    const leafletMap = L.map(mapRef.current, {
      center: [12.9716, 77.5946],
      zoom: 18,
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
    });

    mapInstance.current = leafletMap;

    // Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(leafletMap);

    // Gemini marker
    const geminiIcon = L.divIcon({
      html: `
        <div style="
          background: #c96442;
          color: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
        ">G</div>
      `,
      className: "custom-marker",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    L.marker([12.9716, 77.5946], { icon: geminiIcon })
      .addTo(leafletMap)
      .bindPopup(`
        <div style="
          background: #f5f4ed;
          padding: 10px;
          border-radius: 8px;
          font-family: system-ui;
          max-width: 200px;
        ">
          <strong style="color: #c96442;">Gemini Lounge</strong><br>
          <span style="color: #87867f;">High networking potential</span><br>
          <small style="color: #30302e;">2F • 12 people</small>
        </div>
      `);

    // Venue data
    const venueData: Venue[] = [
      {
        name: "Stage A",
        coords: [12.9716, 77.5946],
        icon: L.divIcon({
          html: `
            <div style="
              background: #c96442;
              color: white;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
            ">📍</div>
          `,
          className: "custom-marker",
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        }),
        popup: `
          <div style="
            background: #f5f4ed;
            padding: 10px;
            border-radius: 8px;
            font-family: system-ui;
            max-width: 200px;
          ">
            <strong style="color: #c96442;">Stage A</strong><br>
            <span style="color: #87867f;">Main presentation</span><br>
            <small style="color: #30302e;">Ground Floor • 45 people</small>
          </div>
        `,
      },
      {
        name: "Collaboration Zone",
        coords: [12.9717, 77.5947],
        icon: L.divIcon({
          html: `
            <div style="
              background: #c96442;
              color: white;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
            ">👥</div>
          `,
          className: "custom-marker",
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        }),
        popup: `
          <div style="
            background: #f5f4ed;
            padding: 10px;
            border-radius: 8px;
            font-family: system-ui;
            max-width: 200px;
          ">
            <strong style="color: #c96442;">Collaboration Zone</strong><br>
            <span style="color: #87867f;">Team formation happening</span><br>
            <small style="color: #30302e;">3F • 8 people</small>
          </div>
        `,
      },
    ];

    venueData.forEach((venue) => {
      L.marker(venue.coords, { icon: venue.icon })
        .addTo(leafletMap)
        .bindPopup(venue.popup);
    });

    // Cleanup
    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="w-full h-[500px] relative">
      <div
        ref={mapRef}
        className="w-full h-full rounded-2xl overflow-hidden"
      />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 bg-[#f0eee6]/90 backdrop-blur-md border border-[#d4d0c4] rounded-lg p-3 space-y-2">
        <div className="text-xs font-medium text-[#30302e]">
          Interactive Venue Map
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#c96442] rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs text-[#87867f]">
            Powered by Leaflet
          </div>
        </div>
      </div>
    </div>
  );
}