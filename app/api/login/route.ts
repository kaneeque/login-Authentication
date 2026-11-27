
import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(request: Request) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { message: "Authentication is not configured." },
      { status: 500 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    !("password" in body)
  ) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  const { email, password } = body;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return NextResponse.json(
      { message: "Please provide valid credentials." },
      { status: 400 }
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const configuredEmail = adminEmail.trim().toLowerCase();

  if (
    normalizedEmail !== configuredEmail ||
    password !== adminPassword
  ) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 }
    );
  }

  try {
    const token = await createToken(normalizedEmail);

    const response = NextResponse.json({
      message: "Login successful.",
    });

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Unable to complete login." },
      { status: 500 }
    );
  }
}
