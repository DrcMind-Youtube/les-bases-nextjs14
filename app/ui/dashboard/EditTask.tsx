"use client";

import { Tache } from "@/types/tache.model";
import { User } from "@/types/user.model";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { toast } from "sonner";

type Props = {
  tache: Tache;
};
type Inputs = {
  nom: string;
  description: string;
  userid: string;
  status: "A faire" | "En cours" | "Terminé";
};

export default function EditTask({ tache }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);
  const [data, setData] = React.useState<Inputs>({
    nom: "",
    description: "",
    userid: "",
    status: "A faire",
  });
  const router = useRouter();

  console.log(tache);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    const d = {
      id: tache.id,
      titre: data.nom,
      description: data.description,
      status: data.status,
    };
    fetch("http://localhost:3000/api/taches", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        reset();
        toast.success("Tache modifiée avec succès");
        router.refresh();
        // @ts-ignore
        document.getElementById("my_modal_3").close();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));

    if (tache) {
      setValue("nom", tache.titre);
      setValue("description", tache.description);
      setValue("userid", tache.user.nom);
      setValue("status", tache.status);
    }
  }, [tache]);

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-96">
          <h3 className="font-bold text-lg">Modifier une tache</h3>

          <form
            className="flex flex-col gap-4 mt-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Titre de la tache"
              className="input input-bordered w-full max-w-full"
              {...register("nom", { required: true })}
            />

            <textarea
              className="textarea textarea-bordered"
              placeholder="Description de la tache"
              {...register("description", { required: true })}
            ></textarea>

            <select
              className="select select-bordered w-full max-w-xs"
              {...register("userid", { required: true })}
            >
              <option disabled selected>
                Assigner à
              </option>
              {users.map((user) => (
                <option value={user.id}>{user.nom}</option>
              ))}
            </select>
            <select
              className="select select-bordered w-full max-w-xs"
              {...register("status", { required: true })}
            >
              <option disabled selected>
                Status
              </option>
              <option value="A faire">A faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
            <button
              className="btn btn-primary"
              disabled={Object.keys(errors).length > 0}
            >
              {!loading && "Modifier"}

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
    </div>
  );
}
