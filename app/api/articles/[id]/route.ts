import { NextResponse } from "next/server";

type RouteParams = {
  params: {
    id: string;
  };
};

// GET
const getOneArticle = async (id: string) => {
  const res = await fetch(`http://localhost:4000/articles/${id}`);
  const data = await res.json();
  return data;
};

export async function GET(req: Request, { params }: RouteParams) {
  const data = await getOneArticle(params.id);

  return NextResponse.json({
    message: "Données récupérées avec succès depuis nextjs api",
    data,
  });
}

// PUT

export async function PUT(req: Request, { params }: RouteParams) {
  const { titre, contenu, auteur } = await req.json();

  const article = await getOneArticle(params.id);

  const nouvelArticle = {
    ...article,
    titre: titre || article.titre,
    contenu: contenu || article.contenu,
    auteur: auteur || article.auteur,
  };

  await fetch(`http://localhost:4000/articles/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(nouvelArticle),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json({
    message: "Article modifié avec succès",
    data: nouvelArticle,
  });
}

// DELETE

export async function DELETE(req: Request, { params }: RouteParams) {
  await fetch(`http://localhost:4000/articles/${params.id}`, {
    method: "DELETE",
  });

  return NextResponse.json({
    message: `Article avec l'id ${params.id} supprimé avec succès`,
  });
}
