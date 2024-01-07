import { prisma } from "@/app/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

import { getTasks } from "./handlers/getTache";
import { postTask } from "./handlers/postTache";
import { updateTask } from "./handlers/updateTask";

export async function GET() {
  return await getTasks();
}

export async function POST(req: NextRequest) {
  return postTask(req);
}

export async function PUT(req: NextRequest) {
  return updateTask(req);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Aucun id" }, { status: 404 });
  }

  const tache = await prisma.tache.delete({
    where: { id: id },
  });

  return NextResponse.json({ message: "tache supprimer" }, { status: 200 });
}
