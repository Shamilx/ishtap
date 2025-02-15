"use client";

import { IoFilterSharp } from "react-icons/io5";

function VacanciesFilter() {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 sm:flex-row lg:flex-[0.6]">
        <button className="relative flex h-[34px] w-full items-center justify-center rounded-[10px] border-2 border-[#D9D9D9] bg-[#EAEAEA] px-4 py-2 dark:border-[#404040] dark:bg-[#242424] sm:w-[176px]">
          <IoFilterSharp
            size={20}
            className="absolute left-4 text-[#6A6A6A] dark:text-white"
          />
          <span className="font-bold text-[#6A6A6A] dark:text-white">
            Filters
          </span>
        </button>

        <div className="flex w-full justify-end sm:justify-normal items-center gap-2">
          <p className="font-bold text-[#6A6A6A]">Sort by</p>

          <select className="rounded-[5px] border-2 border-[#D9D9D9] bg-[#EAEAEA] px-2 font-bold text-[#6A6A6A] outline-none hover:bg-none dark:border-[#404040] dark:bg-[#242424] dark:text-white sm:flex-none sm:px-14">
            <option>Relevance</option>
            <option>Upload Date</option>
            <option>Salary</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default VacanciesFilter;
