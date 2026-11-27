
import { requireSession } from "@/lib/dal";

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

function getRemainingTime(expiry: number): string {
  const remainingSeconds = Math.max(
    0,
    expiry - Math.floor(Date.now() / 1000)
  );

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} and ${minutes} minute${minutes === 1 ? "" : "s"}`;
  }

  if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }

  return "Less than a minute";
}

export default async function SettingsPage() {
  const session = await requireSession();

  const email =
    typeof session.sub === "string"
      ? session.sub
      : "Not available";

  const expiry = session.exp;

  const expiryText =
    typeof expiry === "number"
      ? formatTimestamp(expiry)
      : "Not available";

  const remainingTime =
    typeof expiry === "number"
      ? getRemainingTime(expiry)
      : "Not available";

  return (
    <section className="mx-auto max-w-7xl space-y-8">
      <div>
        <p className="text-sm font-medium text-teal-700">
          APPLICATION CONFIGURATION
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Settings
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          View your application preferences and account configuration.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-800">
            <span aria-hidden="true">⚙</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              General
            </h3>

            <p className="text-sm text-slate-500">
              Application information
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Application Name
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              Admin Portal
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Application Type
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              Single Admin Portal
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-800">
            <span aria-hidden="true">◐</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Appearance
            </h3>

            <p className="text-sm text-slate-500">
              Current dashboard visual theme
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Active Theme
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="h-8 w-8 rounded-lg bg-[#0F2926]" />
              <span className="h-8 w-8 rounded-lg bg-[#0F766E]" />
              <span className="h-8 w-8 rounded-lg bg-[#10B981]" />
              <span className="h-8 w-8 rounded-lg border border-slate-200 bg-[#E6F4F1]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Deep Teal & Emerald
              </p>

              <p className="text-xs text-slate-500">
                Current application theme
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Theme customization is not available yet.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-800">
            <span aria-hidden="true">🔒</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Security & Session
            </h3>

            <p className="text-sm text-slate-500">
              Information about your current authenticated session
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Authentication Status
            </p>

            <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Authenticated
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Authentication Method
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              JSON Web Token (JWT)
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Session Expires At
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              {expiryText}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Remaining Session Time
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              {remainingTime}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Cookie Protection
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              HTTP-only
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Token Algorithm
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              HS256
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-teal-100 bg-teal-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Your session is protected
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Your JWT is verified on the server. The session cookie
            is HTTP-only, which prevents client-side JavaScript
            from reading its value.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-800">
            <span aria-hidden="true">◉</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Account
            </h3>

            <p className="text-sm text-slate-500">
              Administrator account details
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Account Name
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              Administrator
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Email Address
            </p>

            <p className="mt-2 break-all text-sm font-medium text-slate-800">
              {email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Account Role
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              Admin
            </p>
          </div>
        </div>

        <p className="mt-5 text-xs text-slate-500">
          Account editing is not available yet.
        </p>
      </div>
    </section>
  );
}
