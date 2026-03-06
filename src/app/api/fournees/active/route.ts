import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const batch = await prisma.batch.findFirst({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
    include: {
      products: {
        include: { product: true },
      },
      _count: { select: { orders: true } },
    },
  });

  if (!batch) {
    return NextResponse.json(null, { status: 404 });
  }

  // For each product, compute how many have already been ordered this batch
  const orderedQtys = await prisma.orderItem.groupBy({
    by: ["productId"],
    where: {
      order: {
        batchId: batch.id,
        status: { notIn: ["cancelled"] },
      },
    },
    _sum: { quantity: true },
  });

  const qtyMap = new Map(
    orderedQtys.map((r) => [r.productId, r._sum.quantity ?? 0])
  );

  const products = batch.products.map((bp) => ({
    id: bp.product.id,
    name: bp.product.name,
    slug: bp.product.slug,
    category: bp.product.category,
    flavor: bp.product.flavor,
    pricePerUnit: Number(bp.product.pricePerUnit),
    unit: bp.product.unit,
    image: bp.product.image,
    description: bp.product.description,
    maxQty: bp.maxQty ?? bp.product.maxQuantityPerBatch ?? null,
    orderedQty: qtyMap.get(bp.product.id) ?? 0,
  }));

  return NextResponse.json({
    id: batch.id,
    name: batch.name,
    status: batch.status,
    orderOpenAt: batch.orderOpenAt,
    orderCloseAt: batch.orderCloseAt,
    deliveryDate: batch.deliveryDate,
    notes: batch.notes,
    products,
    orderCount: batch._count.orders,
  });
}
