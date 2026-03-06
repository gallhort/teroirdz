import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  // Aggregate unique customers from orders
  const where: Record<string, unknown> = {};
  if (q) {
    where.OR = [
      { customerName: { contains: q, mode: "insensitive" } },
      { customerPhone: { contains: q } },
      { customerEmail: { contains: q, mode: "insensitive" } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    select: {
      customerEmail: true,
      customerName: true,
      customerPhone: true,
      customerAddress: true,
      totalPrice: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Deduplicate by email
  const clientMap = new Map<
    string,
    {
      email: string;
      name: string;
      phone: string;
      address: string | null;
      orderCount: number;
      totalSpent: number;
      lastOrderAt: Date;
    }
  >();

  for (const order of orders) {
    const key = order.customerEmail.toLowerCase();
    const existing = clientMap.get(key);
    if (existing) {
      existing.orderCount++;
      existing.totalSpent += Number(order.totalPrice);
      if (order.createdAt > existing.lastOrderAt) {
        existing.lastOrderAt = order.createdAt;
      }
    } else {
      clientMap.set(key, {
        email: order.customerEmail,
        name: order.customerName,
        phone: order.customerPhone,
        address: order.customerAddress,
        orderCount: 1,
        totalSpent: Number(order.totalPrice),
        lastOrderAt: order.createdAt,
      });
    }
  }

  const clients = Array.from(clientMap.values()).sort(
    (a, b) => b.lastOrderAt.getTime() - a.lastOrderAt.getTime()
  );

  return NextResponse.json(clients);
}
