import { prisma } from "@/app/prisma/prisma";
import { NextResponse } from "next/server";

export async function getTasks() {
  const taches = await prisma.tache.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!taches) {
    return NextResponse.json({ message: "Aucune tache" }, { status: 404 });
  }

  return NextResponse.json(taches);
}
