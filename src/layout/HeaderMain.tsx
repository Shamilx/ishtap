"use client";

import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import MenuDropDown from "./MenuDropDown";
import { HiBars3 } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import ChangeTheme from "@/components/ChangeTheme";
import dynamic from "next/dynamic";

// Dynamically import the component with ssr: false
const ClientSideDrawer = dynamic(() => import("./DrawerMain"), {
  ssr: false,
});

function HeaderMain() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <header
        className="flex items-center px-2 py-6 text-primary md:px-16 dark:text-white"
        id="headermain"
      >
        <Logo />

        <div className="ms-auto flex gap-4 font-bold">
          <ul className="me-6 hidden gap-6 lg:flex">
            <Link href="/home">Home</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/aboutus">About us</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </ul>

          <ChangeTheme />

          <button
            id="button-add"
            className="hidden bg-primary sm:flex dark:bg-contrast"
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
