import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validations";
import { generateOrderNumber } from "@/lib/order-number";
import {
  sendOrderConfirmationToCustomer,
  sendOrderNotificationToOwner,
} from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

// Public: place an order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createOrderSchema.parse(body);

    // Verify batch is open
    const batch = await prisma.batch.findUnique({
      where: { id: data.batchId },
      include: { products: { include: { product: true } } },
    });

    if (!batch || batch.status !== "open") {
      return NextResponse.json(
        { error: "Cette fournée n'accepte plus de commandes." },
        { status: 400 }
      );
    }

    if (batch.orderCloseAt && new Date() > batch.orderCloseAt) {
      return NextResponse.json(
        { error: "La période de commande est terminée." },
        { status: 400 }
      );
    }

    // Validate products and compute price
    const batchProductMap = new Map(
      batch.products.map((bp) => [bp.productId, bp])
    );

    let totalPrice = 0;
    const itemsForEmail: Array<{
      productName: string;
      quantity: number;
      unitPrice: number;
      unit: string;
    }> = [];

    for (const item of data.items) {
      const bp = batchProductMap.get(item.productId);
      if (!bp) {
        return NextResponse.json(
          { error: `Produit non disponible dans cette fournée.` },
          { status: 400 }
        );
      }

      const maxQty = bp.maxQty ?? bp.product.maxQuantityPerBatch;
      if (maxQty !== null && item.quantity > maxQty) {
        return NextResponse.json(
          {
            error: `Quantité maximale pour "${bp.product.name}" est ${maxQty} ${bp.product.unit}.`,
          },
          { status: 400 }
        );
      }

      const unitPrice = Number(bp.product.pricePerUnit);
      totalPrice += unitPrice * item.quantity;
      itemsForEmail.push({
        productName: `${bp.product.name}${bp.product.flavor ? ` (${bp.product.flavor})` : ""}`,
        quantity: item.quantity,
        unitPrice,
        unit: bp.product.unit,
      });
    }

    const orderNumber = await generateOrderNumber();

    // Create order in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerEmail: data.customerEmail,
          customerAddress: data.customerAddress,
          batchId: data.batchId,
          totalPrice,
          notes: data.notes,
          items: {
            create: data.items.map((item) => {
              const bp = batchProductMap.get(item.productId)!;
              const product = bp.product;
              return {
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: Number(product.pricePerUnit),
                productName: `${product.name}${product.flavor ? ` (${product.flavor})` : ""}`,
              };
            }),
          },
        },
      });
      return newOrder;
    });

    // Send emails (non-blocking, don't fail order if email fails)
    const emailData = {
      orderNumber,
      orderId: order.id,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      batchName: batch.name,
      deliveryDate: batch.deliveryDate,
      items: itemsForEmail,
      totalPrice,
      notes: data.notes,
    };

    Promise.all([
      sendOrderConfirmationToCustomer(emailData).catch(console.error),
      sendOrderNotificationToOwner(emailData).catch(console.error),
    ]);

    return NextResponse.json({ orderNumber, orderId: order.id }, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "issues" in err) {
      return NextResponse.json({ error: "Données invalides", details: err }, { status: 422 });
    }
    console.error("Order creation error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Admin: list orders
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const batchId = searchParams.get("batchId");
  const status = searchParams.get("status");
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  const where: Record<string, unknown> = {};
  if (batchId) where.batchId = batchId;
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { customerName: { contains: q, mode: "insensitive" } },
      { customerPhone: { contains: q } },
      { orderNumber: { contains: q, mode: "insensitive" } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        items: true,
        batch: { select: { name: true } },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({ orders, total, page, limit });
}
