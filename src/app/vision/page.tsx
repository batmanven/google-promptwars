import { VisionConcierge } from "@/components/dashboard/VisionConcierge";

export default function VisionPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-3 text-[#30302e]">
            Vision
          </h1>
          <p className="text-sm font-medium tracking-widest text-[#87867f] uppercase">
            Multimodal Intelligence
          </p>
        </div>

        <VisionConcierge />
      </div>
    </main>
  );
}
