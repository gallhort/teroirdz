import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateBatchStatusSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

const VALID_TRANSITIONS: Record<string, string[]> = {
  draft: ["open"],
  open: ["closed"],
  closed: ["delivered", "open"],
  delivered: [],
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status: newStatus } = updateBatchStatusSchema.parse(body);

  const batch = await prisma.batch.findUnique({ where: { id } });
  if (!batch) {
    return NextResponse.json({ error: "Fournée introuvable" }, { status: 404 });
  }

  const allowed = VALID_TRANSITIONS[batch.status] ?? [];
  if (!allowed.includes(newStatus)) {
    return NextResponse.json(
      {
        error: `Transition invalide : ${batch.status} → ${newStatus}`,
      },
      { status: 400 }
    );
  }

  const updated = await prisma.batch.update({
    where: { id },
    data: { status: newStatus },
  });

  return NextResponse.json(updated);
}
