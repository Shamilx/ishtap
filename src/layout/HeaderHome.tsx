"use client";

import Logo from "@/components/Logo";
import React, { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import MenuDropDown from "./MenuDropDown";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the component with ssr: false
const ClientSideDrawer = dynamic(() => import("./Drawer"), {
  ssr: false,
});

function HeaderHome() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className="flex w-full items-center px-8 text-white sm:px-12" id="headerhome">
        <Logo />

        <div className="ms-auto flex gap-6">
          <ul className="hidden gap-6 lg:flex">
            <Link href="/home">Home</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/aboutus">About us</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </ul>

          <Link href="/" id="button-explore" className="hidden sm:flex">
            Explore
          </Link>

          <MenuDropDown />

          <button className="block lg:hidden" onClick={toggleDrawer}>
            <HiBars3 size={32} color="white" />
          </button>
        </div>
      </header>

      <ClientSideDrawer toggle={toggleDrawer} isOpen={isOpen} />
    </>
  );
}

export default HeaderHome;
