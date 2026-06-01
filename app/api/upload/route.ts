import { NextRequest, NextResponse } from "next/server";
import { uploadToR2, r2Configured } from "@/lib/server/r2";
import { isAdmin } from "@/lib/server/auth";

export const runtime = "nodejs";

const MAX = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

// POST — admin only: upload an image to Cloudflare R2, return its public URL.
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  if (!r2Configured) {
    return NextResponse.json(
      { error: "Resim deposu (R2) yapılandırılmadı." },
      { status: 503 }
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya gerekli." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Desteklenmeyen dosya türü." }, { status: 400 });
  }
  if (file.size > MAX) {
    return NextResponse.json({ error: "Dosya çok büyük (max 8 MB)." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadToR2(buffer, file.type);
  return NextResponse.json({ ok: true, url });
}
