import React from "react";

import ModernDrawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { jost } from "@/fonts/fonts";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";

function DrawerMain({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const router = useRouter();

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

          <button id="btn-explore" onClick={() => router.push("/")}>
            Add Job Vacancy
          </button>

          <div className="w-full border border-gray-700 border-opacity-60"></div>

          <div id="links">
            <Link href="/home">Home</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/aboutus">About us</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </ModernDrawer>
    </>
  );
}

export default DrawerMain;
