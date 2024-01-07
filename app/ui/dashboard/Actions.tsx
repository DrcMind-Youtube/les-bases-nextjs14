"use client";

import { User } from "@/types/user.model";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  user: User;
};

export default function Actions({ user }: Props) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleDeleteUser = async (id: string) => {
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    toast.success("Utilisateur supprimé avec succès");
    router.refresh();
    setLoading(false);
  };
  return (
    <td className="flex gap-3">
      <button
        className="btn btn-primary btn-sm"
        //@ts-ignore
        onClick={() => document.getElementById("my_modal_1")?.showModal()}
      >
        Edit
      </button>
      <button
        className="btn btn-warning btn-sm"
        onClick={() => handleDeleteUser(user.id)}
      >
        {loading && (
          <span className="loading loading-spinner loading-sm"></span>
        )}

        {!loading && " Delete"}
      </button>
    </td>
  );
}
