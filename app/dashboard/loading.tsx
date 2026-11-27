
export default function DashboardLoading() {
  return (
    <div
      className="mx-auto max-w-7xl animate-pulse space-y-8"
      role="status"
      aria-label="Loading dashboard"
    >
      <span className="sr-only">Loading dashboard...</span>

      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="h-10 w-64 rounded bg-slate-200" />
        <div className="h-4 w-80 max-w-full rounded bg-slate-200" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-36 rounded-xl bg-slate-200"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-64 rounded-xl bg-slate-200 lg:col-span-2" />
        <div className="h-64 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}
