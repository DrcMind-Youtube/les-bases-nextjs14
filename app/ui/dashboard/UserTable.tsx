"use client";
import { User } from "@/types/user.model";
import React, { useEffect } from "react";
import Actions from "./Actions";
import AddUser from "./AddUser";

type Props = {
  users: User[];
};

export default function UserTable({ users }: Props) {
  useEffect(() => {
    console.log(users);
    console.log("hey");
  }, []);
  return (
    <div className="overflow-x-auto flex-1  rounded-md p-2 bg-base-300 px-3">
      <AddUser />
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-primary text-lg">Utilisateurse</h1>
        <button
          className="btn btn-primary btn-sm" //@ts-ignore
          onClick={() => document.getElementById("my_modal_1").show()}
        >
          Ajouter
        </button>
      </div>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Nom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th>{index}</th>
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <Actions user={user} />
            </tr>
          ))}
          {/* row 1 */}
        </tbody>
      </table>
    </div>
  );
}
