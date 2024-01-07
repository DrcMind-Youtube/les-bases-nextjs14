"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  id: number;
};

export default function RemoveBtn({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRemoveTask = (id: number) => {
    setLoading(true);
    fetch(`http://localhost:3000/api/taches/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        toast.success("Tache supprimée avec succès");
        router.refresh();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Une erreur est survenue");
      });
  };
  return (
    <button
      className="btn btn-sm btn-outline btn-secondary"
      onClick={() => handleRemoveTask(id)}
    >
      {loading && <span className="loading loading-spinner loading-sm"></span>}
      {!loading && "Supprimer"}
    </button>
  );
}
