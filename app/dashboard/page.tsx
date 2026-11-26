
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";

// Loading state while authentication is being verified.
function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-64 rounded-lg bg-slate-200" />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-36 rounded-xl bg-slate-200"
          />
        ))}
      </div>
    </div>
  );
}

// Authenticated dashboard content.
async function DashboardContent() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  const session = await getSession(token);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8">

      {/* Welcome Section */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          ADMINISTRATION
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Welcome back, Admin!
        </h2>

        <p>
          Here&apos;s an overview of your account.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <StatCard
          title="Account Status"
          value="Active"
          description="Your account is authenticated"
          icon="✓"
        />

        <StatCard
          title="Authentication"
          value="JWT"
          description="JSON Web Token authentication"
          icon="🔐"
        />

        <StatCard
          title="Session Duration"
          value="1 Hour"
          description="Configured token expiration"
          icon="◷"
        />

      </div>

      {/* Account Information */}
      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Account Information
            </h3>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Verified Session
            </span>
          </div>

          <div className="mt-6 space-y-5">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Administrator Email
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {session.sub}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Authentication Status
              </p>

              <p className="mt-1 text-sm font-medium text-green-600">
                Successfully authenticated
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Session Type
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                HTTP-only Cookie
              </p>
            </div>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h3 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Manage your account
          </p>

          <div className="mt-6 space-y-3">

            <Link
              href="/dashboard/profile"
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              My Profile
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/dashboard/security"
              className="flex items-center justify-between rounded-lg border border-slate-200 p-4 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Security Settings
              <span aria-hidden="true">→</span>
            </Link>

          </div>
        </div>

      </div>

      {/* Session Information */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">

        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            🔒
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Your session is secure
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Your authentication token is stored in an HTTP-only
              cookie and verified on the server before protected
              dashboard content is displayed.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}

// Keep request-time authentication inside Suspense.
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
