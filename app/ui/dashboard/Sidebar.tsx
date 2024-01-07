"use client";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {};

export default function Sidebar({}: Props) {
  const currentRoute = usePathname();

  return (
    <aside
      id="default-sidebar"
      className="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 hidden md:block"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-base-200 ">
        <div className=" h-48 flex items-center justify-center flex-shrink-0 px-4 bg-base-100">
          <Image src={logo} alt="logo" className="w-12 h-12" />
        </div>
        <ul className="space-y-2 font-medium mt-6">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center p-2 rounded-md   group ${
                currentRoute === "/dashboard" ? "bg-primary text-white" : ""
              }`}
            >
              <svg
                className={
                  currentRoute === "/dashboard"
                    ? "text-white w-5 h-5 group-hover:text-gray-900 "
                    : "text-gray-500 group-hover:text-gray-900  dark:group-hover:text-white w-5 h-5"
                }
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/employe"
              className={`flex items-center p-2 rounded-md   group ${
                currentRoute === "/dashboard/employe"
                  ? "bg-primary text-white"
                  : "bg-transparent"
              }`}
            >
              <svg
                className={
                  currentRoute === "/dashboard/employe"
                    ? "text-white w-5 h-5 group-hover:text-gray-900 "
                    : "text-gray-500 group-hover:text-gray-900  dark:group-hover:text-white w-5 h-5"
                }
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Employé</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
