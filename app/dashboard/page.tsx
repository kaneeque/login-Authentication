
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const isAuthenticated = token
    ? await verifyToken(token)
    : false;

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome back! You have successfully logged in.
            </p>
          </div>

          <LogoutButton />
        </div>

      </div>
    </main>
  );
}
