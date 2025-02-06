"use client";

import ModernDrawer from "react-modern-drawer";
import { useState } from "react";
import "react-modern-drawer/dist/index.css";
import { jost } from "@/fonts/fonts";
import { IoIosClose } from "react-icons/io";

function Drawer({ isOpen, toggle }: { isOpen: any; toggle: any }) {
  return (
    <>
      <ModernDrawer
        open={isOpen}
        onClose={toggle}
        direction="right"
        className="bg-black/80"
      >
        <div
          className="h-full w-full bg-primary"
          id="modernDrawer"
          style={{ fontFamily: jost.style.fontFamily }}
        >
          <button id="close-btn" onClick={toggle}>
            <IoIosClose size={32} color="white" />
          </button>

          <button id="btn-explore">Explore</button>

          <div className="w-full border border-gray-700 border-opacity-60"></div>

          <div id="links">
            <a href="/home">Home</a>
            <a href="/contact">Contact</a>
            <a href="/aboutus">About us</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </ModernDrawer>
    </>
  );
}

export default Drawer;
