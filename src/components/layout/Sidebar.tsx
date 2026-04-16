"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Camera, Map, Target, Menu, X } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Pulse", path: "/pulse", icon: <Home size={20} />, description: "Dashboard" },
    { name: "Vision", path: "/vision", icon: <Camera size={20} />, description: "AI Analysis" },
    { name: "Radar", path: "/radar", icon: <Map size={20} />, description: "Location" },
    { name: "Goal", path: "/goal", icon: <Target size={20} />, description: "Intent" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-100 focus:px-6 focus:py-3 focus:bg-[#c96442] focus:text-white focus:rounded-full focus:font-bold focus:shadow-2xl"
      >
        Skip to main content
      </a>

      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#f0eee6] border border-[#d4d0c4] rounded-lg text-[#30302e] hover:bg-[#e8e6dc] transition-colors shadow-lg"
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
      </button>

      <aside
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        role="navigation"
        aria-label="Main Navigation"
        className={`
          fixed left-0 top-0 h-full z-40 transition-all duration-500 ease-in-out border-r border-[#d4d0c4]
          lg:sticky lg:top-0 lg:h-screen lg:block
          ${isOpen ? 'w-full lg:w-80 bg-[#f0eee6] shadow-2xl translate-x-0' : 'w-0 lg:w-20 bg-[#f5f4ed] shadow-none -translate-x-full lg:translate-x-0'}
          overflow-hidden group
        `}
      >
        <div className="flex flex-col h-full min-w-[320px]">
          <div className={`p-6 border-b border-[#d4d0c4] transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#c96442] rounded-xl shrink-0 flex items-center justify-center shadow-lg shadow-[#c96442]/20" aria-hidden="true">
                <span className="text-white font-bold text-lg leading-none">A</span>
              </div>
              <div className={`transition-all duration-500 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 lg:hidden'}`}>
                <h1 className="text-xl font-bold text-[#30302e]">Aether</h1>
                <p className="text-[10px] text-[#c96442] font-bold uppercase tracking-widest text-nowrap">Companion</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-2 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-300
                  ${pathname === item.path
                    ? 'bg-[#c96442]/10 text-[#c96442]'
                    : 'text-[#87867f] hover:text-[#30302e] hover:bg-[#e8e6dc]'
                  }
                `}
                aria-current={pathname === item.path ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                <div className={`
                  p-2.5 rounded-xl transition-all duration-300
                  ${pathname === item.path
                    ? 'bg-[#c96442] text-white shadow-lg shadow-[#c96442]/20'
                    : 'bg-[#f0eee6] group-hover:bg-[#d4d0c4]/40'
                  }
                `} aria-hidden="true">
                  {item.icon}
                </div>
                <div className={`transition-all duration-500 flex-1 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 lg:hidden'}`}>
                  <div className="font-bold text-sm tracking-tight">{item.name}</div>
                  <div className="text-[10px] opacity-70 leading-none">{item.description}</div>
                </div>
              </Link>
            ))}
          </nav>

          <div className={`p-6 border-t border-[#d4d0c4] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 text-[#87867f]">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Active System</span>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
