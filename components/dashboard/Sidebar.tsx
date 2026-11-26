
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/app/dashboard/LogoutButton";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: "▦",
  },
  {
    name: "My Profile",
    href: "/dashboard/profile",
    icon: "◉",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "⚙",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    return href === "/dashboard"
      ? pathname === href
      : pathname.startsWith(href);
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col overflow-y-auto border-r border-[#23433D] bg-[#0F2926] text-white md:flex">
        <div className="flex h-20 items-center border-b border-[#23433D] px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E] text-xl font-bold text-white shadow-lg shadow-black/20">
            A
          </div>

          <div className="ml-3">
            <h2 className="text-lg font-bold tracking-tight">
              Admin Portal
            </h2>

            <p className="text-xs text-slate-400">
              Management Console
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6" aria-label="Main navigation">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#0F766E] text-white shadow-lg shadow-black/20"
                      : "text-slate-300 hover:bg-[#173D37] hover:text-white"
                  }`}
                >
                  <span className="text-lg" aria-hidden="true">
                    {item.icon}
                  </span>

                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-[#23433D] p-4">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="border-b border-slate-200 bg-white px-3 py-3 md:hidden">
        <nav
          aria-label="Mobile navigation"
          className="flex items-center gap-2 overflow-x-auto"
        >
          {navigation.map((item) => {
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#0F766E] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-800"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="shrink-0">
            <LogoutButton />
          </div>
        </nav>
      </div>
    </>
  );
}
