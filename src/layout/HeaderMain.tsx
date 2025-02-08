"use client";

import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import MenuDropDown from "./MenuDropDown";
import { HiBars3 } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";

function HeaderMain() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header
      className="flex items-center px-8 py-6 text-primary md:px-16"
      id="headermain"
    >
      <Logo />

      <div className="ms-auto flex gap-6 font-bold">
        <ul className="hidden gap-6 lg:flex">
          <Link href="/home">Home</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/aboutus">About us</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </ul>
        
        <button id="button-add">
          <FaPlus size={24} color="white" />
        </button>

        <MenuDropDown />

        <button className="block lg:hidden" onClick={toggleDrawer}>
          <HiBars3 size={32} color="#213555" />
        </button>
      </div>
    </header>
  );
}

export default HeaderMain;
