"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <div className="flex min-h-screen">
      {!isLandingPage && <Sidebar />}
      <main className={`flex-1 ${!isLandingPage ? "" : ""}`}>
        {children}
      </main>
    </div>
  );
}
