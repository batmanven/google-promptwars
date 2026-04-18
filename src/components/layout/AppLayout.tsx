"use client"

import { Sidebar } from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { initAetherServices } from "@/services/firebase";
import { UserProvider } from "@/hooks/useUserContext";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  useEffect(() => {
    async function bootAether() {
      try {
        const res = await fetch("/api/config");
        const config = await res.json();
        await initAetherServices(config);
        setIsInitialized(true);
      } catch (e: any) {
        const { reportAetherError } = await import("@/services/monitoringService");
        await reportAetherError("Application Boot Failure", e);
        setIsInitialized(true);
      }
    }
    bootAether();
  }, []);

  return (
    <AuthProvider>
      <UserProvider>
        <div className="flex min-h-screen">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#c96442] focus:text-white focus:rounded-lg">
            Skip to main content
          </a>
          {!isLandingPage && isInitialized && <Sidebar />}
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}
