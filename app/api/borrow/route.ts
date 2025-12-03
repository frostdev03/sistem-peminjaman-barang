import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { toolId, qty, nim, borrower, phone } = body;
    if (!toolId || !qty || !nim || !borrower) {
      return NextResponse.json({ error: "missing" }, { status: 400 });
    }

    return await prisma.$transaction(async (tx) => {
      // return await prisma.$transaction(async (tx: PrismaClient) => {
      const tool = await tx.tool.findUnique({ where: { id: Number(toolId) } });
      if (!tool)
        return NextResponse.json({ error: "not_found" }, { status: 404 });
      if (tool.quantity < qty)
        return NextResponse.json({ error: "insufficient" }, { status: 409 });

      await tx.tool.update({
        where: { id: Number(toolId) },
        data: { quantity: tool.quantity - qty, borrowed: tool.borrowed + qty },
      });

      await tx.history.create({
        data: {
          toolId: Number(toolId),
          toolName: tool.name,
          qty,
          nim,
          borrower,
          phone,
        },
      });

      return NextResponse.json({ ok: true });
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
