import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="mx-3 p-5  rounded-md mt-3">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex gap-5 w-full mt-4 flex-col">
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-6 w-full"></div>
      </div>
    </div>
  );
}
