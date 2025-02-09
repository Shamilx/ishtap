import { jost } from "@/fonts/fonts";
import HeaderMain from "@/layout/HeaderMain";
import React from "react";

// icons
import { IoSearchSharp } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

function Page() {
  return (
    <div className="min-h-[100vh] bg-contrast dark:bg-[#141414]">
      <HeaderMain />

      <div id="main-content">
        <div
          id="searching"
          className="flex flex-col gap-4 px-4 md:mt-16 md:px-16 lg:flex-row lg:items-center lg:justify-between lg:px-24"
        >
          <div className="flex h-[50px] w-full items-center rounded-[10px] border-2 border-[#D9D9D9] bg-[#EAEAEA] dark:border-[#404040] dark:bg-[#242424] lg:w-[400px] lg:flex-[0.4]">
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

          <div className="flex items-center justify-between gap-4 lg:flex-[0.6] lg:justify-around">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
