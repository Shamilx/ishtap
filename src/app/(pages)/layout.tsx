import { jost } from "@/fonts/fonts";
import HeaderMain from "@/layout/HeaderMain";
import React from "react";

// icons
import { IoSearchSharp } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { TbHeartFilled } from "react-icons/tb";
import { IoMdBusiness } from "react-icons/io";
import ClientLink from "@/components/ClientLink";

async function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-[100vh] flex-col bg-contrast dark:bg-[#141414]"
      id="main"
    >
      <HeaderMain />

      <div id="main-content" className="flex flex-grow flex-col">
        <div
          id="searching"
          className="mt-4 flex gap-4 px-6 md:mt-8 md:px-16 lg:items-center lg:px-24"
        >
          <div className="flex h-[50px] w-full items-center border-2 border-[#D9D9D9] bg-[#EAEAEA] dark:border-[#404040] dark:bg-[#242424] lg:w-[500px]">
            <input
              placeholder="Search job title, company name et.c"
              className="flex-[0.9] bg-transparent pl-2 font-semibold outline-none placeholder:text-[#A0A0A0] dark:text-white"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            />

            <div className="flex flex-[0.1] items-center justify-end pe-2">
              <IoSearchSharp
                size={24}
                className="text-[#6A6A6A] dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 hidden w-full border-[1.5px] border-[#EAEAEA] dark:border-[#242424] lg:block"></div>

        <div
          id="content-wrapper"
          className="flex h-full w-full flex-grow flex-col lg:flex-row"
        >
          <div
            id="navigation"
            className="mt-12 flex min-w-[250px] flex-row justify-stretch gap-1 px-1 py-2 border-r-[2px] border-[#EAEAEA] dark:border-[#242424] lg:mt-0 lg:flex-col lg:justify-center lg:gap-4 lg:px-6"
          >
            <ClientLink
              href={"/vacancies"}
              className={`flex-1 has-[.active]:bg-black dark:text-white lg:flex-none`}
            >
              <MdBusinessCenter
                size={24}
                className="text-[#242424] dark:text-white"
              />
              Jobs
            </ClientLink>

            <ClientLink
              href={"/liked"}
              className={`flex-1 dark:text-white lg:flex-none`}
            >
              <TbHeartFilled size={24} className="text-[#C90000]" />
              Liked
            </ClientLink>

            <ClientLink
              href={"/companies"}
              className={`flex-1 dark:text-white lg:flex-none`}
            >
              <IoMdBusiness
                size={24}
                className="text-[#242424] dark:text-white"
              />
              Companies
            </ClientLink>
          </div>

          <div className="mt-0 block w-full border-[1.5px] border-[#EAEAEA] dark:border-[#242424] lg:hidden"></div>

          <div className="no-scrollbar flex-1 overflow-scroll p-3">
            <div className="max-h-[100px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
