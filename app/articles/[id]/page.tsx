import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    id: number;
  };
};

const getData = async (id: number) => {
  const res = await fetch(`http://localhost:4000/articles/${id}`);
  const data = await res.json();
  return data;
};

// meta data
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const article = await getData(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.titre,
    description: article.contenu,
    authors: [
      {
        name: article.auteur,
      },
    ],
    openGraph: {
      images: [article.lienImage, ...previousImages],
    },
  };
}

export default async function page({ params }: Props) {
  const article = await getData(params.id);

  return (
    <div className="container">
      {/* <Image
        src={article.lienImage}
        width={250}
        height={250}
        alt="Shoes"
        className="w-full rounded-md mb-2"
      /> */}
      <h1 className="titre">{article.titre}</h1>
      <p>{article.contenu}</p>

      <div className="mt-3 bg-slate-400 text-indigo-500">
        <span>{article.auteur}</span>
      </div>
    </div>
  );
}
