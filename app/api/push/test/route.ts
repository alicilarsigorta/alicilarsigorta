import { NextResponse } from "next/server";
import { sendPushToAll, pushConfigured } from "@/lib/server/push";
import { isAdmin } from "@/lib/server/auth";

export const runtime = "nodejs";

// POST — admin: send a test push to all subscriptions.
export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  if (!pushConfigured) {
    return NextResponse.json({ error: "Push (VAPID) yapılandırılmadı." }, { status: 503 });
  }
  const result = await sendPushToAll({
    title: "Alıcılar Sigorta",
    body: "Bildirimler açık — yeni teklifler buraya gelecek.",
    url: "/admin/teklifler",
  });
  return NextResponse.json({ ok: true, ...result });
}
