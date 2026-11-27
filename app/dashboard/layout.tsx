import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-col md:ml-64">
        <Header />

        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white px-5 py-4 text-center text-xs text-slate-500">
          © 2026 Admin Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
