import UserTable from "@/app/ui/dashboard/UserTable";
import { User } from "@prisma/client";
import React from "react";

type Props = {};
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/user", {
    // cache: "no-store",
  });
  const data = await res.json();
  return data;
};
export default async function page({}: Props) {
  const users = (await getData()) as User[];
  return (
    <div className="mx-3 p-5  rounded-md mt-3">
      <h2>
        <span className="text-2xl font-bold">Employés</span>
      </h2>
      <div className="mt-2">
        <UserTable users={users} />
      </div>
    </div>
  );
}
