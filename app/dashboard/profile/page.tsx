
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

function ProfileLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded-lg bg-slate-200" />
      <div className="h-64 rounded-xl bg-slate-200" />
    </div>
  );
}

async function ProfileContent() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  const session = await getSession(token);

  if (!session) {
    redirect("/login");
  }

  const email =
    typeof session.sub === "string"
      ? session.sub
      : "Not available";

  const initials = email.charAt(0).toUpperCase();

  return (
    <section className="mx-auto max-w-7xl space-y-8">

      {/* Page Heading */}
      <div>
        <p className="text-sm font-medium text-teal-700">
          ACCOUNT MANAGEMENT
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          My Profile
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          View your administrator account information.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="h-32 bg-gradient-to-r from-teal-800 to-emerald-700" />

        <div className="px-6 pb-8">

          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-teal-50 text-3xl font-bold text-teal-800 shadow-sm">
                {initials}
              </div>

              <div className="pb-1">
                <h3 className="text-xl font-bold text-slate-900">
                  Administrator
                </h3>

                <p className="text-sm text-slate-500">
                  System Administrator
                </p>
              </div>
            </div>

            <span className="mb-1 inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Active Account
            </span>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-8">

            <h3 className="text-lg font-semibold text-slate-900">
              Personal Information
            </h3>

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

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Authentication Method
                </p>

                <p className="mt-2 text-sm font-medium text-slate-800">
                  JWT Authentication
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="rounded-xl border border-teal-100 bg-teal-50 p-6">

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-teal-800">
            🔒
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Account Security
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your profile is accessible only after successful
              server-side session verification. Your authentication
              token is stored in an HTTP-only cookie.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
}
