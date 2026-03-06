import { auth } from "@/auth";
import { uploadImage } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Format non supporté (JPEG, PNG ou WebP uniquement)" },
      { status: 400 }
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Fichier trop volumineux (max 5 Mo)" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadImage(buffer, file.name);

  return NextResponse.json({ url });
}
