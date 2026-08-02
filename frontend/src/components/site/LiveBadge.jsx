export default function LiveBadge({ className = "" }) {
  return (
    <span
      data-testid="live-badge"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[11px] font-bold tracking-[0.2em] uppercase ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-70 live-dot" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
      </span>
      En Direct
    </span>
  );
}
