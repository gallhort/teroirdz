import { prisma } from "./prisma";

export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.order.count({
    where: {
      createdAt: { gte: new Date(`${year}-01-01`) },
    },
  });
  return `TRD-${year}-${String(count + 1).padStart(4, "0")}`;
}
