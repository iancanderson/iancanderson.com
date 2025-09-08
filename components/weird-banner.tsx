export default function WeirdBanner() {
  return (
    <div className="relative mb-6 weird-bg brutal-border bg-[color:var(--brutal-card)]" style={{ height: 90 }}>
      <div className="absolute inset-0 pointer-events-none" />
      <div className="absolute left-3 top-2 flex items-center gap-3">
        <span className="inline-block rounded-full bg-red-500 w-3 h-3 animate-pulse" />
        <span className="inline-block rounded-full bg-yellow-400 w-3 h-3" />
        <span className="inline-block rounded-full bg-green-500 w-3 h-3" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-4 py-1 text-sm font-bold bg-white/70 border border-black shadow-sm">
          handcrafted oddities • pop hooks • crunchy circuits
        </div>
      </div>
    </div>
  );
}

