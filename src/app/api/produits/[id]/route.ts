import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateProductSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const data = updateProductSchema.parse(body);

  const product = await prisma.product.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(product);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Soft delete: mark as unavailable
  const product = await prisma.product.update({
    where: { id: params.id },
    data: { isAvailable: false },
  });

  return NextResponse.json(product);
}
