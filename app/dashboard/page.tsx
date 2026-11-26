
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

// Displays while the server checks the user's session.
function DashboardLoading() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-8 w-64 rounded bg-gray-200" />

        <div className="mt-6 h-32 rounded-lg bg-gray-100" />
      </div>
    </main>
  );
}

// This component accesses request-specific cookies.
// Suspense allows Next.js to render it at request time.
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
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">
          Welcome to your Dashboard
        </h1>

        <p className="mt-3 text-gray-600">
          You are successfully authenticated.
        </p>

        <div className="mt-6 rounded-lg border p-5">
          <h2 className="text-lg font-semibold">
            Account Information
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Email: {session.sub}
          </p>

          <p className="mt-1 text-sm text-gray-600">
            Authentication: Active
          </p>
        </div>
          <div className="mt-6">
            <LogoutButton />
        </div>
      </div>
    </main>
  );
}

// Static page shell with a request-time authentication section.
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
