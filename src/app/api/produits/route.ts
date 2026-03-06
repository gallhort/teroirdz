import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createProductSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categorie = searchParams.get("categorie");
  const adminView = searchParams.get("admin") === "true";

  const session = adminView ? await auth() : null;
  if (adminView && !session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const where: Record<string, unknown> = {};
  if (!adminView) where.isAvailable = true;
  if (categorie) where.category = categorie;

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const data = createProductSchema.parse(body);

  const slug = slugify(
    `${data.name}${data.flavor ? "-" + data.flavor : ""}`,
    { lower: true, strict: true, locale: "fr" }
  );

  const product = await prisma.product.create({
    data: {
      ...data,
      slug,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
