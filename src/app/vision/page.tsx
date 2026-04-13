import { VisionConcierge } from "@/components/dashboard/VisionConcierge";

export default function VisionPage() {
  return (
    <main className="bg-grid min-h-screen pb-32">
      <div className="max-w-md mx-auto px-6 pt-12 space-y-8">
        <header>
          <h1 className="gradient-text text-4xl mb-1">Vision</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Multimodal Intelligence</p>
        </header>

        <VisionConcierge />
      </div>
    </main>
  );
}
