"use client";

import { User } from "@/types/user.model";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  user?: User;
};

type Inputs = {
  nom: string;
  email: string;
};

export default function AddUser({ user }: Props) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((e) => {
      console.log(e);
      setLoading(false);
      toast.success("Utilisateur ajouté avec succès");
      //   Close the modal
      //   @ts-ignore
      document.getElementById("my_modal_1")?.close();
      router.refresh();
      reset();
    });
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-96">
        <h3 className="font-bold text-lg">Ajouter un utilisateur</h3>

        <form
          className="flex flex-col gap-4 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Saisir le nom"
            className="input input-bordered w-full max-w-full"
            {...register("nom", { required: true })}
          />
          <input
            type="text"
            placeholder="Saisir l'email"
            className="input input-bordered w-full max-w-full"
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entrez une adresse email valide",
              },
            })}
          />
          <button
            className="btn btn-primary"
            disabled={Object.keys(errors).length > 0}
          >
            {!loading && "  Ajouter"}

            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
