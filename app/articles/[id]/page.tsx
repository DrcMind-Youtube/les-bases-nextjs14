import React from "react";

type Props = {
  params: {
    id: number;
  };
};

export const revalidate = 1000;

const getData = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();
  return data;
};

export default async function page({ params }: Props) {
  const data = await getData(params.id);

  return (
    <div className="container">
      <h1 className="titre">{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}
