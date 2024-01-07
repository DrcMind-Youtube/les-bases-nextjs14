import { NextResponse } from "next/server";
import { prisma } from "@/app/prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: Request) {
  const { email, nom } = await req.json();

  try {
    const user = await prisma.user.create({
      data: { email, nom },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { message: "L'adressse mail existe dejà" },
          { status: 400 }
        );
      }
    }
  }

  return NextResponse.json({ message: "utilisateur créer" }, { status: 200 });
}

export async function GET() {
  const users = await prisma.user.findMany();

  if (!users) {
    return NextResponse.json({ message: "Aucun utilisateur" }, { status: 404 });
  }
  return NextResponse.json(users);
}

export async function PUT(req: Request) {
  const { id, nom } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Aucun id" }, { status: 404 });
  }
  if (!nom) {
    return NextResponse.json({ message: "Aucun nom" }, { status: 404 });
  }

  const user = await prisma.user.update({
    where: { id: id },
    data: { nom },
  });

  return NextResponse.json(
    { message: "utilisateur modifier" },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Aucun id" }, { status: 404 });
  }

  const user = await prisma.user.delete({
    where: { id: id },
  });

  return NextResponse.json(
    { message: "utilisateur supprimer" },
    { status: 200 }
  );
}
