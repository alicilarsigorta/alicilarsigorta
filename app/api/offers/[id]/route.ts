import { NextRequest, NextResponse } from "next/server";
import { updateOffer, deleteOffer } from "@/lib/server/store";
import { isAdmin } from "@/lib/server/auth";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const patch: { status?: "pending" | "contacted" | "completed" | "rejected"; note?: string } = {};
  if (body.status) patch.status = body.status;
  if (typeof body.note === "string") patch.note = body.note;
  const updated = await updateOffer(id, patch);
  if (!updated) return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });
  return NextResponse.json({ ok: true, offer: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteOffer(id);
  return NextResponse.json({ ok });
}
