"use client";
import { Tache } from "@/types/tache.model";
import { User } from "@/types/user.model";

import EditTask from "./EditTask";

import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { useState } from "react";

type Props = {
  taches: Tache[];
};

export default function Table({ taches }: Props) {
  const [selectedTask, setSelectedTask] = useState<Tache>() as [Tache, any];

  return (
    <div className="overflow-x-auto flex-1  rounded-md bg-base-300 p-4 min-h-[70vh]">
      <EditTask tache={selectedTask} />
      <div className="flex justify-between items-center">
        <h2 className="p-2  text-lgfont-bold text-primary">Taches </h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            // @ts-ignore
            document.getElementById("my_modal_2").showModal();
          }}
        >
          Ajouter une tache
        </button>
      </div>

      {
        // @ts-ignore
        taches?.length == 0 ? (
          <div className="flex justify-center items-center h-40">
            <h1 className="text-2xl font-bold text-gray-500">
              Aucune tache pour le moment
            </h1>
          </div>
        ) : (
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-lg font-bold">
                <th></th>
                <th>Titre </th>
                <th>Utilisateur</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {taches?.map((tache, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <Link href={`/dashboard/${tache.id}`}>{tache.titre}</Link>
                  </td>
                  <td>{tache.user.nom}</td>
                  <td>
                    {new Date(tache.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <span
                      className={`
                      badge badge-outline ${
                        tache.status == "En cours"
                          ? "badge-primary"
                          : tache.status == "Terminé"
                          ? "badge-success"
                          : "badge-warning"
                      }
                    `}
                    >
                      {tache.status}
                    </span>
                  </td>
                  <td className="flex gap-3 items-center">
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => {
                        setSelectedTask(tache);
                        // @ts-ignore
                        document.getElementById("my_modal_3").showModal();
                      }}
                    >
                      {/* edit svg */}
                      Modifier
                    </button>
                    <RemoveBtn id={tache.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
}
