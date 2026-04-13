import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const ibm = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Google Promptwars",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibm.className} bg-black text-white`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}