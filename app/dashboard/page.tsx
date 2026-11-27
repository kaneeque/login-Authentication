
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import { requireSession } from "@/lib/dal";

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <section className="mx-auto max-w-7xl space-y-8">
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
