import { NextRequest, NextResponse } from "next/server";
import { checkPassword, setAdminCookie, clearAdminCookie, isAdmin } from "@/lib/server/auth";

export const runtime = "nodejs";

// POST — verify password, set the admin session cookie.
export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(password || "")) {
    return NextResponse.json({ error: "Hatalı şifre." }, { status: 401 });
  }
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}

// GET — is the current session an admin?
export async function GET() {
  return NextResponse.json({ admin: await isAdmin() });
}

// DELETE — logout.
export async function DELETE() {
  await clearAdminCookie();
  return NextResponse.json({ ok: true });
}
