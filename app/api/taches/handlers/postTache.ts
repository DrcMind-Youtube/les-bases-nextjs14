import { prisma } from "@/app/prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

import { EmailTemplate } from "@/app/ui/mail/mailTemplate";
import { resend } from "@/app/mail/resend";

export async function postTask(req: NextRequest) {
  const { titre, description, userId } = await req.json();

  if (!titre) {
    return NextResponse.json({ message: "Aucun titre" }, { status: 404 });
  }
  if (!description) {
    return NextResponse.json(
      { message: "Aucune description" },
      { status: 404 }
    );
  }
  if (!userId) {
    return NextResponse.json({ message: "Aucun userId" }, { status: 404 });
  }

  try {
    await prisma.tache.create({
      data: { titre, description, userId },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { message: "La tache existe dejà" },
          { status: 400 }
        );
      }
      if (e.code === "P2003") {
        return NextResponse.json(
          { message: "L'utilisateur n'existe pas" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json({ message: "Erreur" }, { status: 400 });
    }
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const { data, error } = await resend.emails.send({
    from: "TaskApp <onboarding@resend.dev>",
    to: user?.email || "",
    subject: "Création d'une tache",
    react: EmailTemplate({ description, titre, nom: user?.nom || "New user" }),
    text: "Hello world",
  });

  return NextResponse.json(
    { message: "tache créer", mailEnvoye: data ? data.id : error },
    { status: 200 }
  );
}
