import { NextRequest, NextResponse } from "next/server";
import { addOffer, getOffers, kvConfigured } from "@/lib/server/store";
import { sendPushToAll } from "@/lib/server/push";
import { isAdmin } from "@/lib/server/auth";

export const runtime = "nodejs";

// POST — public: create a new lead and notify the owner.
export async function POST(req: NextRequest) {
  if (!kvConfigured) {
    return NextResponse.json(
      { error: "Backend henüz yapılandırılmadı." },
      { status: 503 }
    );
  }
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const phone = (body.phone || "").toString().trim();
  const insuranceType = (body.insuranceType || body.branch || "Genel").toString().trim();
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Geçerli telefon gerekli." }, { status: 400 });
  }

  const offer = await addOffer({
    name: (body.name || "").toString().trim() || undefined,
    phone,
    tcNo: (body.tcNo || "").toString().trim() || undefined,
    birthDate: (body.birthDate || "").toString().trim() || undefined,
    insuranceType,
    city: (body.city || "").toString().trim() || undefined,
    note: (body.note || "").toString().trim() || undefined,
    source: (body.source || "web").toString().trim(),
  });

  // Fire the push notification (don't fail the request if it errors).
  try {
    await sendPushToAll({
      title: "🔔 Yeni Teklif Başvurusu",
      body: `${offer.insuranceType} · ${offer.name ? offer.name + " · " : ""}${offer.phone}`,
      url: "/admin/teklifler",
    });
  } catch {
    /* ignore push errors */
  }

  return NextResponse.json({ ok: true, id: offer.id });
}

// GET — admin only: list all offers.
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  const offers = await getOffers();
  return NextResponse.json({ offers });
}
