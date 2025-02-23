import HeaderMain from "@/layout/HeaderMain";
import React from "react";

// icons
import { MdBusinessCenter } from "react-icons/md";
import { TbHeartFilled } from "react-icons/tb";
import { IoMdBusiness } from "react-icons/io";
import ClientLink from "@/components/ClientLink";
import SearchBar from "@/components/SearchBar";

async function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-[100vh] flex-col bg-white dark:bg-[#141414]"
      id="main"
    >
      <HeaderMain />

      <div id="main-content" className="flex flex-grow flex-col">
        <SearchBar />

        <div className="mt-12 hidden w-full border-[1.5px] border-[#EAEAEA] dark:border-[#242424] lg:block"></div>

        <div
          id="content-wrapper"
          className="flex h-full w-full flex-grow flex-col lg:flex-row"
        >
          <div
            id="navigation"
            className="mt-12 flex min-w-[250px] flex-row justify-stretch gap-1 border-r-[2px] border-[#EAEAEA] dark:border-[#242424] lg:mt-0 lg:flex-col lg:justify-center lg:gap-4 lg:px-6 lg:py-3"
          >
            <ClientLink
              href={"/vacancies"}
              className={`flex flex-1 items-center justify-center gap-2 py-4 dark:text-white lg:flex-none lg:justify-normal lg:rounded-2xl lg:py-2`}
            >
              <MdBusinessCenter
                size={24}
                className="text-[#242424] dark:text-white"
              />
              Jobs
            </ClientLink>

            <ClientLink
              href={"/liked"}
              className={`flex flex-1 items-center justify-center gap-2 py-4 dark:text-white lg:flex-none lg:justify-normal lg:rounded-2xl lg:py-2`}
            >
              <TbHeartFilled size={24} className="text-[#C90000]" />
              Liked
            </ClientLink>

            <ClientLink
              href={"/companies"}
              className={`flex flex-1 items-center justify-center gap-2 py-4 dark:text-white lg:flex-none lg:justify-normal lg:rounded-2xl lg:py-2`}
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
