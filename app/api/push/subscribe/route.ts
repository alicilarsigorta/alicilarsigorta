import { NextRequest, NextResponse } from "next/server";
import { addSub, removeSub, kvConfigured, type PushSub } from "@/lib/server/store";
import { isAdmin } from "@/lib/server/auth";

export const runtime = "nodejs";

// POST — admin: save a Web Push subscription.
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  if (!kvConfigured) {
    return NextResponse.json({ error: "Backend yapılandırılmadı." }, { status: 503 });
  }
  const sub = (await req.json().catch(() => null)) as PushSub | null;
  if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
    return NextResponse.json({ error: "Geçersiz abonelik." }, { status: 400 });
  }
  await addSub({ endpoint: sub.endpoint, keys: sub.keys });
  return NextResponse.json({ ok: true });
}

// DELETE — admin: remove a subscription (unsubscribe).
export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  const { endpoint } = await req.json().catch(() => ({ endpoint: "" }));
  if (endpoint) await removeSub(endpoint);
  return NextResponse.json({ ok: true });
}
