"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Camera, Map, Target, Menu, X } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Pulse", path: "/", icon: <Home size={20} />, description: "Dashboard" },
    { name: "Vision", path: "/vision", icon: <Camera size={20} />, description: "AI Analysis" },
    { name: "Radar", path: "/radar", icon: <Map size={20} />, description: "Location" },
    { name: "Goal", path: "/goal", icon: <Target size={20} />, description: "Intent" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#f0eee6] border border-[#d4d0c4] rounded-lg text-[#30302e] hover:bg-[#e8e6dc] transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed left-0 top-0 h-full w-full lg:w-80  border-r border-[#d4d0c4] z-40 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#d4d0c4]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#c96442] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#30302e]">Aether</h1>
                  <p className="text-xs text-[#87867f]">Intelligent Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 bg-[#f0eee6] border border-[#d4d0c4] rounded-lg text-[#30302e] hover:bg-[#e8e6dc] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${pathname === item.path 
                    ? 'bg-[#c96442]/10 text-[#c96442] border border-[#c96442]/30' 
                    : 'text-[#87867f] hover:text-[#30302e] hover:bg-[#f0eee6]/50'
                  }
                `}
              >
                <div className={`
                  p-2 rounded-lg transition-colors
                  ${pathname === item.path 
                    ? 'bg-[#c96442]/10 text-[#c96442]' 
                    : 'bg-[#f0eee6] group-hover:bg-[#e8e6dc]'
                  }
                `}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </Link>
            ))}
          </nav>

      
        </div>
      </aside>

      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
