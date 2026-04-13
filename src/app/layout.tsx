import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({
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
      <body className={`${inter.className} bg-[#f5f4ed] text-[#30302e]`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}