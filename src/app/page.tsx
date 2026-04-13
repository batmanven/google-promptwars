import { GoalSetter } from "@/components/dashboard/GoalSetter";
import { Timeline } from "@/components/dashboard/Timeline";

export default function Home() {
  return (
    <main className="bg-grid min-h-screen pb-32">
      <div className="max-w-md mx-auto px-6 pt-12 space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="gradient-text text-4xl mb-1">Aether</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Autonomous Assistant V1.0</p>
          </div>
          <div className="pulse w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
        </header>

        <GoalSetter />
        
        <Timeline />
      </div>
    </main>
  );
}
