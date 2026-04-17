import { Sidebar } from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/hooks/useAuth";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        {!isLandingPage && <Sidebar />}
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
