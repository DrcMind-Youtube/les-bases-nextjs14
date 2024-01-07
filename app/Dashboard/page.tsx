import React from "react";
import Table from "../ui/dashboard/Table";
import { Tache } from "@/types/tache.model";
import AddTask from "../ui/dashboard/AddTask";

type Props = {};

const getTache = async () => {
  const res = await fetch("http://localhost:3000/api/taches", {
    // cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function page({}: Props) {
  const taches = (await getTache()) as Tache[];

  return (
    <div className="mx-3 p-5  rounded-md mt-3">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex gap-5 w-full mt-2 flex-col lg:flex-row">
        <Table taches={taches} />
      </div>

      {/* Modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <AddTask />
    </div>
  );
}
