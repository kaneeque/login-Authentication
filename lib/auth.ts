
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const TOKEN_EXPIRY = "1h";

const TOKEN_ISSUER = "login-authentication";
const TOKEN_AUDIENCE = "admin-portal";

interface SessionPayload extends JWTPayload {
  authenticated: true;
}

function getSecret(): Uint8Array {
  const secretValue = process.env.SESSION_SECRET;

  if (!secretValue || new TextEncoder().encode(secretValue).length < 32) {
    throw new Error(
      "SESSION_SECRET must contain at least 32 bytes."
    );
  }

  return new TextEncoder().encode(secretValue);
}

export async function createToken(subject: string): Promise<string> {
  return new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(subject)
    .setIssuer(TOKEN_ISSUER)
    .setAudience(TOKEN_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getSecret());
}

export async function getSession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    });

    if (
      payload.authenticated !== true ||
      typeof payload.sub !== "string"
    ) {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function verifyToken(token: string): Promise<boolean> {
  return (await getSession(token)) !== null;
}
