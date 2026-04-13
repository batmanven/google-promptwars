"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Camera, Map, Target } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Pulse", path: "/", icon: <Home size={20} /> },
    { name: "Vision", path: "/vision", icon: <Camera size={20} /> },
    { name: "Radar", path: "/radar", icon: <Map size={20} /> },
    { name: "Goal", path: "/goal", icon: <Target size={20} /> },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-4 flex items-center gap-8 z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`flex flex-col items-center gap-1 transition-colors ${pathname === item.path ? "text-[#00f2ff]" : "text-gray-500 hover:text-white"
            }`}
        >
          {item.icon}
          <span className="text-[10px] uppercase font-bold tracking-tighter">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
