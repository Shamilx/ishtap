"use client";

import Logo from "@/components/Logo";
import React, { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import MenuDropDown from "./MenuDropDown";

import dynamic from "next/dynamic";

// Dynamically import the component with ssr: false
const ClientSideDrawer = dynamic(() => import("./Drawer"), {
  ssr: false,
});

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className="flex w-full items-center bg-primary px-4 text-white sm:px-12">
        <Logo />

        <div className="ms-auto flex gap-4">
          <ul className="hidden gap-4 lg:flex">
            <a href="/home">Home</a>
            <a href="/contact">Contact</a>
            <a href="/aboutus">About us</a>
            <a href="/privacy">Privacy Policy</a>
          </ul>

          <a href="/" id="button-explore" className="hidden sm:flex">
            Explore
          </a>

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

export default Header;
