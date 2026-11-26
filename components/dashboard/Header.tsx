
"use client";

import { usePathname } from "next/navigation";

interface HeaderProps {
  title?: string;
}

// Automatically determine the heading from the current route.
const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/profile": "My Profile",
  "/dashboard/settings": "Settings",
};

export default function Header({ title }: HeaderProps) {
  const pathname = usePathname();

  const currentTitle =
    title ?? pageTitles[pathname] ?? "Admin Portal";

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur-md md:px-8">

      {/* Dynamic Page Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          {currentTitle}
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Manage your account and application
        </p>
      </div>

      {/* Admin Information */}
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-800">
            Administrator
          </p>

          <p className="text-xs text-slate-500">
            System Admin
          </p>
        </div>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 font-bold text-teal-800"
          role="img"
          aria-label="Administrator avatar"
        >
          A
        </div>
      </div>
    </header>
  );
}
