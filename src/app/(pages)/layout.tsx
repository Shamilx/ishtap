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

          {/* <div className="flex items-center justify-between gap-4 lg:flex-[0.6] lg:justify-around">
            <button className="relative flex h-[34px] w-full items-center justify-center rounded-[10px] border-2 border-[#D9D9D9] bg-[#EAEAEA] px-4 py-2 dark:border-[#404040] dark:bg-[#242424] sm:w-[176px]">
              <IoFilterSharp
                size={20}
                className="absolute left-4 text-[#6A6A6A] dark:text-white"
              />
              <span className="font-bold text-[#6A6A6A] dark:text-white">
                Filters
              </span>
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              <p className="font-bold text-[#6A6A6A]">Sort by</p>

              <select className="items-center rounded-[5px] border-2 border-[#D9D9D9] bg-[#EAEAEA] px-14 font-bold text-[#6A6A6A] outline-none hover:bg-none dark:border-[#404040] dark:bg-[#242424] dark:text-white">
                <option>Relevance</option>
                <option>Upload Date</option>
              </select>
            </div>
          </div> */}
        </div>

        <div className="mt-12 w-full border-[1.5px] border-[#EAEAEA] dark:border-[#242424]"></div>

        <div id="content-wrapper" className="flex h-full w-full flex-grow">
          <div
            id="navigation"
            className="hidden min-w-[250px] justify-center gap-4 border-r-[2px] border-[#EAEAEA] px-6 dark:border-[#242424] sm:flex sm:flex-col"
          >
            <ClientLink
              href={"/vacancies"}
              className={`has-[.active]:bg-black dark:text-white`}
            >
              <MdBusinessCenter
                size={32}
                className="text-[#242424] dark:text-white"
              />
              Jobs
            </ClientLink>

            <ClientLink href={"/categories"} className={`dark:text-white`}>
              <BiCategoryAlt
                size={32}
                className="text-[#242424] dark:text-white"
              />
              Categories
            </ClientLink>

            <ClientLink href={"/liked"} className={`dark:text-white`}>
              <TbHeartFilled size={32} className="text-[#C90000]" />
              Liked
            </ClientLink>

            <ClientLink href={"/companies"} className={`dark:text-white`}>
              <IoMdBusiness
                size={32}
                className="text-[#242424] dark:text-white"
              />
              Companies
            </ClientLink>
          </div>

          <div className="flex-1 overflow-scroll p-3 no-scrollbar">
            <div className=" max-h-[100px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
