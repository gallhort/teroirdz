import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: { include: { product: { select: { unit: true, image: true } } } },
      batch: true,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  return NextResponse.json(order);
}
