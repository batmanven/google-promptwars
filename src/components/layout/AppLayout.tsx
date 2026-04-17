import { Sidebar } from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/hooks/useAuth";
import { UserProvider } from "@/hooks/useUserContext";
import { useEffect } from "react";
import { analytics } from "@/services/firebase";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  useEffect(() => {
    analytics?.then(a => a && console.log("Pulse Analytics Active"));
  }, []);

  return (
    <AuthProvider>
      <UserProvider>
        <div className="flex min-h-screen">
          {!isLandingPage && <Sidebar />}
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}
