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

  const batch = await prisma.batch.findUnique({
    where: { id: params.id },
    include: {
      products: { include: { product: true } },
      orders: {
        include: { items: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!batch) {
    return NextResponse.json({ error: "Fournée introuvable" }, { status: 404 });
  }

  // Compute production summary: total qty per product across non-cancelled orders
  const productionMap = new Map<
    string,
    { productName: string; unit: string; totalQty: number }
  >();

  for (const order of batch.orders) {
    if (order.status === "cancelled") continue;
    for (const item of order.items) {
      const existing = productionMap.get(item.productId);
      if (existing) {
        existing.totalQty += item.quantity;
      } else {
        productionMap.set(item.productId, {
          productName: item.productName,
          unit: "", // filled below
          totalQty: item.quantity,
        });
      }
    }
  }

  // Fill units from products
  for (const bp of batch.products) {
    const entry = productionMap.get(bp.productId);
    if (entry) entry.unit = bp.product.unit;
  }

  const productionSummary = Array.from(productionMap.values()).sort((a, b) =>
    a.productName.localeCompare(b.productName)
  );

  return NextResponse.json({ ...batch, productionSummary });
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

  const batch = await prisma.batch.update({
    where: { id: params.id },
    data: {
      name: body.name,
      orderOpenAt: body.orderOpenAt ? new Date(body.orderOpenAt) : undefined,
      orderCloseAt: body.orderCloseAt ? new Date(body.orderCloseAt) : undefined,
      deliveryDate: body.deliveryDate ? new Date(body.deliveryDate) : undefined,
      notes: body.notes,
    },
  });

  return NextResponse.json(batch);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  await prisma.batch.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
