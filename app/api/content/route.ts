import { NextRequest, NextResponse } from "next/server";
import { getStoredContent, setStoredContent, kvConfigured } from "@/lib/server/store";
import { isAdmin } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET — public: the live site content (null if never edited / KV off).
export async function GET() {
  const content = kvConfigured ? await getStoredContent() : null;
  return NextResponse.json({ content });
}

// PUT — admin only: save the full content object.
export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  if (!kvConfigured) {
    return NextResponse.json({ error: "Backend yapılandırılmadı." }, { status: 503 });
  }
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Geçersiz içerik." }, { status: 400 });
  }
  await setStoredContent(body);
  return NextResponse.json({ ok: true });
}
