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
          className="h-full w-full bg-white dark:bg-[#242424]"
          id="modernDrawer"
          style={{ fontFamily: jost.style.fontFamily }}
        >
          <button id="close-btn" onClick={toggle}>
            <IoIosClose size={32} className="text-primary dark:text-white" />
          </button>

          <button id="btn-explore" onClick={() => router.push("/vacancy/add")} className="!text-primary dark:!text-white">
            Add Job Vacancy
          </button>

          <div className="w-full border border-gray-400 border-opacity-10"></div>

          <div id="links">
            <Link href="/home" className="bg-primary dark:bg-[#202020] text-white">Home</Link>
            <Link href="/contact" className="bg-primary dark:bg-[#202020] text-white">Contact</Link>
            <Link href="/aboutus" className="bg-primary dark:bg-[#202020] text-white">About us</Link>
            <Link href="/privacy" className="bg-primary dark:bg-[#202020] text-white">Privacy Policy</Link>
          </div>
        </div>
      </ModernDrawer>
    </>
  );
}

export default DrawerMain;
