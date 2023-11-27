import React from "react";

type Props = {
  params: {
    id: number;
  };
};

export const revalidate = 1000;

const getData = async (id: number) => {
  const res = await fetch(`http://localhost:4000/articles/${id}`);
  const data = await res.json();
  return data;
};

export default async function page({ params }: Props) {
  const data = await getData(params.id);

  return (
    <div className="container">
      <h1 className="titre">{data.titre}</h1>
      <p>{data.contenu}</p>
    </div>
  );
}
