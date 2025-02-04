import Logo from "@/components/Logo";
import React from "react";

import { AiOutlineUser } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";

function Header() {
  return (
    <header className="w-full bg-primary py-4 px-4 sm:px-12 text-white flex items-center">
      <Logo />

      <div className="ms-auto flex gap-4">
        <ul className="hidden lg:flex gap-4">
          <a href="/home">Home</a>
          <a href="/contact">Contact</a>
          <a href="/aboutus">About us</a>
          <a href="/privacy">Privacy Policy</a>
        </ul>

        <a href="/" id="button-explore" className="hidden sm:flex">
          Explore
        </a>

        <a href="/login" id="button-login">
          <AiOutlineUser size={24} color="black" />
        </a>

        <button className="block lg:hidden"><HiBars3 size={32} color="white"/></button>
      </div>
    </header>
  );
}

export default Header;
