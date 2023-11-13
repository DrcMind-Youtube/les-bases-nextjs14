import React from "react";

type Props = {
  params: {
    id: number;
  };
};

export default function page({ params }: Props) {
  return <div>Vous etes sur {params.id} article </div>;
}
