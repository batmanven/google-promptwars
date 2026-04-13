import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="bg-grid min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="glass-card p-12 max-w-2xl text-center space-y-6">
        <h1 className="gradient-text text-5xl">Aether</h1>
        <p className="text-xl text-gray-400">Your Autonomous Event Companion</p>
        <div className="pulse inline-block px-4 py-2 border border-[#00f2ff]/30 rounded-full text-[#00f2ff] text-sm">
          System Online
        </div>
      </div>
    </main>
  );
}
