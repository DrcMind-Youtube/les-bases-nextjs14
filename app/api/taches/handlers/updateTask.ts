import { prisma } from "@/app/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function updateTask(req: NextRequest) {
  const { id, titre, description, status } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Aucun id" }, { status: 404 });
  }
  if (!titre) {
    return NextResponse.json({ message: "Aucun titre" }, { status: 404 });
  }
  if (!description) {
    return NextResponse.json(
      { message: "Aucune description" },
      { status: 404 }
    );
  }

  await prisma.tache.update({
    where: { id: id },
    data: { titre, description, status },
  });

  return NextResponse.json({ message: "tache modifier" }, { status: 200 });
}
