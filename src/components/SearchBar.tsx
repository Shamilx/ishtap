"use client";

import { jost } from "@/fonts/fonts";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Loading from "./Loading";
import supabase from "@/supabase/client";
import { useRouter } from "next/navigation";
import { Vacancy } from "@/types/Vacancy";

function SearchBar() {
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<Vacancy[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (searchText.trim() === "") return;

      try {
        const { data, error } = await supabase
          .from("vacancies")
          .select("*")
          .ilike("title", `${searchText}%`);

        if (error) {
          throw error;
        }
        console.log(data);
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [searchText]);

  return (
    <div
      id="searching"
      className="relative mt-4 flex flex-col gap-4 px-2 md:mt-8 lg:items-center lg:px-24"
    >
      <div className="flex h-[50px] w-full items-center border-2 border-[#D9D9D9] bg-[#EAEAEA] dark:border-[#404040] dark:bg-[#242424] lg:w-[500px]">
        <input
          onChange={(e) => setSearchText(e.target.value as string)}
          placeholder="Search job title.."
          className="flex-[0.9] bg-transparent pl-2 font-semibold outline-none placeholder:text-[#A0A0A0] dark:text-white"
          style={{ fontFamily: `${jost.style.fontFamily}` }}
        />

        <div className="flex flex-[0.1] items-center justify-end pe-2">
          <IoSearchSharp size={24} className="text-[#6A6A6A] dark:text-white" />
        </div>
      </div>
      <div
        className={`absolute top-[30px] z-10 mt-4 w-full rounded-sm bg-white transition-all duration-300 dark:bg-[#242424] dark:text-white lg:w-[500px] ${
          searchText
            ? "min-h-[20px] border-2 border-[#D9D9D9] dark:border-[#404040]"
            : "h-0 overflow-hidden"
        }`}
      >
        <div className="overflow-y-auto">
          {results ? (
            results.map((result, index) => (
              <div
                onClick={() => router.push(`/vacancy/${result.id}`)}
                key={index}
                className="flex cursor-pointer gap-1 border-b border-[#D9D9D9] p-2 text-black hover:bg-[#EAEAEA] dark:border-[#404040] dark:text-white dark:hover:bg-[#202020]"
              >
                <p>{result.title}</p>
                <p className="font-bold text-primary dark:text-[#9A9A9A]">
                  {result.location}
                </p>
                <p className="font-bold text-primary dark:text-[#9A9A9A]">
                  {result.salary} {result.currency}
                </p>
              </div>
            ))
          ) : (
            <div className="mt-2 flex items-center justify-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
