import { prisma } from "@/app/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: {
    taskId: string;
  };
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { taskId } = params;
  const task = await prisma.tache.findUnique({
    where: { id: Number(taskId) },
    include: { user: true },
  });

  if (!task) {
    return NextResponse.json({ message: "Aucune tache" }, { status: 404 });
  }

  return NextResponse.json(task);
}
