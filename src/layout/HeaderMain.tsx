"use client";

import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import MenuDropDown from "./MenuDropDown";
import { HiBars3 } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import ChangeTheme from "@/components/ChangeTheme";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Dynamically import the component with ssr: false
const ClientSideDrawer = dynamic(() => import("./DrawerMain"), {
  ssr: false,
});

function HeaderMain() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { isAdmin,loading } = useAuth();

  return (
    <>
      <header
        className="flex items-center px-2 py-6 text-primary dark:text-white md:px-16"
        id="headermain"
      >
        <Logo />

        <div className="ms-auto flex gap-4 font-bold">
          {!loading && (isAdmin ? (
            <ul className="me-6 hidden gap-6 lg:flex">
              <Link href="/adminpanel">Dashboard</Link>
              <Link href="/adminpanel/vacancies">Vacancies</Link>
              <Link href="/adminpanel/companies">Companies</Link>
              <Link href="/adminpanel/requests">Requests</Link>
            </ul>
          ) : (
            <ul className="me-6 hidden gap-6 lg:flex">
              <Link href="/home">Home</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/aboutus">About us</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </ul>
          ))}

          <ChangeTheme />

          <button
            onClick={() => router.push("/vacancy/add")}
            id="button-add"
            className="hidden bg-primary dark:bg-contrast sm:flex"
          >
            <FaPlus size={24} className="text-contrast dark:text-primary" />
          </button>

          <MenuDropDown />

          <button className="block lg:hidden" onClick={toggleDrawer}>
            <HiBars3 size={32} className="text-primary dark:text-contrast" />
          </button>
        </div>
      </header>
      <ClientSideDrawer toggle={toggleDrawer} isOpen={isOpen} />
    </>
  );
}

export default HeaderMain;
