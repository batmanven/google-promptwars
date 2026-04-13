import { VisionConcierge } from "@/components/dashboard/VisionConcierge";

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Vision
          </h1>
          <p className="text-sm font-medium tracking-widest text-gray-400 uppercase">
            Multimodal Intelligence
          </p>
        </div>

        <VisionConcierge />
      </div>
    </main>
  );
}
