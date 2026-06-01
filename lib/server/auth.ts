import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "as_admin";
const PASSWORD = process.env.ADMIN_PASSWORD || "alicilar2024";
const SECRET = process.env.ADMIN_SECRET || "alicilar-admin-secret-change-me";

/** Deterministic session token derived from the server-only password + secret. */
function sessionToken(): string {
  return createHmac("sha256", SECRET).update(`admin:${PASSWORD}`).digest("hex");
}

export function checkPassword(input: string): boolean {
  const a = Buffer.from(input || "");
  const b = Buffer.from(PASSWORD);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function setAdminCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const val = store.get(COOKIE)?.value;
  if (!val) return false;
  const expected = sessionToken();
  if (val.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(val), Buffer.from(expected));
  } catch {
    return false;
  }
}
