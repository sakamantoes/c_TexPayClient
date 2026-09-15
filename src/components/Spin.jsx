export function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ctex-bg text-ctex-text">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-blue-300 border-t-blue-500" />
        <span className="text-sm text-ctex-text-muted">Getting You Started…</span>
      </div>
    </div>
  );
}