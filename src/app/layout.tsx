import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { SystemHUD } from "@/components/dashboard/SystemHUD";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aether | Intelligent Event Companion",
  description: "An autonomous, intent-driven event companion powered by Gemini AI for the Google PromptWars Hackathon 2026.",
  keywords: ["AI", "Gemini", "Hackathon", "Event Companion", "Google PromptWars"],
  authors: [{ name: "Priyansh Narang" }],
  openGraph: {
    title: "Aether | Intelligent Event Companion",
    description: "Navigate your event with real-time AI intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#f5f4ed] text-[#30302e]`}>
        <AppLayout>
          {children}
        </AppLayout>
        <SystemHUD />
      </body>
    </html>
  );
}