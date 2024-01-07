import React from "react";
import Navbar from "../ui/common/Navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Sidebar from "../ui/dashboard/Sidebar";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

function layout({ children }: Props) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }
  return (
    <>
      <div className="flex ">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
}

export default layout;
