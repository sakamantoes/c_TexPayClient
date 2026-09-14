export function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ctex-bg text-ctex-text">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-ctex-blue/30 border-t-ctex-blue" />
        <span className="text-xs text-ctex-text-muted">Loading…</span>
      </div>
    </div>
  );
}