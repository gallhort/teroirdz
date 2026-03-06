import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// [id] is the customer email (URL-encoded)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const email = decodeURIComponent(id);

  const orders = await prisma.order.findMany({
    where: { customerEmail: { equals: email, mode: "insensitive" } },
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      batch: { select: { name: true } },
    },
  });

  if (orders.length === 0) {
    return NextResponse.json({ error: "Client introuvable" }, { status: 404 });
  }

  const customer = {
    email: orders[0].customerEmail,
    name: orders[0].customerName,
    phone: orders[0].customerPhone,
    address: orders[0].customerAddress,
    orderCount: orders.length,
    totalSpent: orders.reduce((sum, o) => sum + Number(o.totalPrice), 0),
    orders,
  };

  return NextResponse.json(customer);
}
