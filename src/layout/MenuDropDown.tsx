"use client";

import Loading from "@/components/Loading";
import supabase from "@/supabase/supabase";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosLogIn } from "react-icons/io";
import { HiUserAdd } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function MenuDropDown() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) {
    return (
      <Menu>
        <MenuButton className="rounded-md focus:outline-none">
          <a id="button-login">
            <AiOutlineUser size={24} color="black" />
          </a>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="mt-4 w-52 origin-top-right rounded-xl border border-white/5 bg-primary/20 p-1 text-[16px] font-[600] text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
              onClick={() => router.push("/login")}
            >
              <IoIosLogIn size={24} color="white" />
              Sign in
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
              onClick={() => router.push("/register")}
            >
              <HiUserAdd size={24} color="white" />
              Sign Up
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    );
  }

  if (user) {
    return (
      <Menu>
        <MenuButton className="rounded-md focus:outline-none">
          <a id="button-login">
            <AiOutlineUser size={24} color="black" />
          </a>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="mt-4 w-52 origin-top-right rounded-xl border border-white/5 bg-primary/20 p-1 text-sm/6 font-[500] text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              <IoIosLogIn size={24} color="white" />
              Sign out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    );
  }
}

export default MenuDropDown;
