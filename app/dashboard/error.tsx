
"use client";

import { useEffect } from "react";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({
  error,
  reset,
}: DashboardErrorProps) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div
      className="flex min-h-[60vh] items-center justify-center px-4"
      role="alert"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
          !
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          We couldn&apos;t load this dashboard page. Please try again.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs text-slate-400">
            Error reference: {error.digest}
          </p>
        )}

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
