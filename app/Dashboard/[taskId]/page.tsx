import { Tache } from "@/types/tache.model";
import React from "react";
import taskillustation from "@/public/task.svg";
import Image from "next/image";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    taskId: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.taskId;

  // fetch data
  const task = await fetch(`http://localhost:3000/api/taches/${id}`).then(
    (res) => res.json()
  );

  return {
    title: task.titre,
    description: task.description,
    authors: [task.user.nom],
  };
}

export default async function Page({ params }: Props) {
  const { taskId } = params;
  const res = await fetch(`http://localhost:3000/api/taches/${taskId}`);
  const task = (await res.json()) as Tache;

  return (
    <main className="mx-4 mt-4 flex gap-3  h-[85vh] p-2 ">
      <section className="flex-1 mt-3">
        <Link
          href="/dashboard"
          className="
            btn btn-ghost btn-sm rounded-btn  mb-4
        "
        >
          Retour
        </Link>
        <h1 className="text-3xl font-bold first-letter:uppercase">
          {task.titre}
        </h1>

        <div className="mt-4">
          <p className=" font-bold">Description</p>
          <p className="">{task.description}</p>
        </div>
        <div className="mt-4">
          <p className=" font-bold">Date de création</p>
          <p className="">
            {/* date in french with all letters */}
            {new Date(task.createdAt).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="mt-4">
          <p className=" font-bold">Status</p>
          <p
            className={`
                      badge badge-outline mt-1 ${
                        task.status == "En cours"
                          ? "badge-primary"
                          : task.status == "Terminé"
                          ? "badge-success"
                          : "badge-warning"
                      }
                    `}
          >
            {task.status}
          </p>
        </div>

        <div className="mt-4">
          <p className=" font-bold">Utilisateur</p>
          <p className="flex gap-3 items-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span>{task.user.nom}</span>
          </p>
          <p className="mt-1 italic">Mail : {task.user.email}</p>
        </div>
      </section>
      <section className="flex-1 md:flex justify-center items-center border-l hidden ">
        <Image src={taskillustation} alt="task illustration" />
      </section>
    </main>
  );
}
