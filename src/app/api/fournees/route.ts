import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createBatchSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const batches = await prisma.batch.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { orders: true, products: true } },
    },
  });

  return NextResponse.json(batches);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const data = createBatchSchema.parse(body);

  const batch = await prisma.batch.create({
    data: {
      name: data.name,
      orderOpenAt: data.orderOpenAt ? new Date(data.orderOpenAt) : null,
      orderCloseAt: data.orderCloseAt ? new Date(data.orderCloseAt) : null,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      notes: data.notes,
      products: {
        create: data.productIds.map((productId) => ({ productId })),
      },
    },
    include: { products: true },
  });

  return NextResponse.json(batch, { status: 201 });
}
