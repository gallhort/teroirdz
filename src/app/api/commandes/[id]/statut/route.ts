import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateOrderStatusSchema } from "@/lib/validations";
import { sendOrderReadyEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const { status } = updateOrderStatusSchema.parse(body);

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { batch: true },
  });

  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  const updated = await prisma.order.update({
    where: { id: params.id },
    data: { status },
  });

  // Send "ready" notification to customer
  if (status === "ready") {
    sendOrderReadyEmail({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      batchName: order.batch.name,
      deliveryDate: order.batch.deliveryDate,
      totalPrice: Number(order.totalPrice),
    }).catch(console.error);
  }

  return NextResponse.json(updated);
}
