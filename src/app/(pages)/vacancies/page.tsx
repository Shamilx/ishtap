"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import supabase from "@/supabase/client";
import { Vacancy } from "@/types/Vacancy";
import Image from "next/image";
import { MdOutlineImageNotSupported } from "react-icons/md";
import Loading from "@/components/Loading";
import VacanciesFilter from "@/layout/VacanciesFilter";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { updateAllLogos } from "@/supabase/test";

const LIMIT = 5;

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    console.log("Handle like");

    await updateAllLogos();
  };

  const handleDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("Details");
  };

  const fetchVacancies = useCallback(async () => {
    if (loading || noMoreData) return;

    setLoading(true);
    const start = page * LIMIT;
    const end = start + LIMIT - 1;

    const { data, error } = await supabase
      .from("vacancies")
      .select("*,companies(title,image)")
      .order("id", { ascending: true })
      .range(start, end);

    if (error) {
      console.error("Error fetching vacancies:", error);
    } else if (data.length === 0) {
      setNoMoreData(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setVacancies((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  }, [page, loading, noMoreData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchVacancies();
        }
      },
      { threshold: 0.3 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchVacancies, loading]);

  return (
    <div id="vacancies" className="flex flex-col gap-4">
      {vacancies.length === 0 && loading && <Loading />}

      {!loading && vacancies.length !== 0 && <VacanciesFilter />}

      {vacancies.map((vacancy) => (
        <div
          onClick={handleDetails}
          key={vacancy.id}
          className="flex min-h-[150px] cursor-pointer items-center gap-2 rounded-[15px] border-2 border-[#D9D9D9] bg-[#EAEAEA] px-3 py-2 transition-all duration-200 hover:bg-[#e3e3e3] dark:border-[#404040] dark:bg-[#242424] dark:text-white dark:hover:!bg-[#202020] sm:h-[100px] sm:min-h-0 sm:gap-4 sm:px-6 sm:py-3"
        >
          {vacancy.companies?.image ? (
            <Image
              src={vacancy.companies.image}
              alt=""
              className="h-[76px] w-[76px]"
              width={76}
              height={76}
            />
          ) : (
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[76px] bg-[#6A6A6A]">
              <MdOutlineImageNotSupported size={24} color="white" />
            </div>
          )}

          <div className="flex flex-1 flex-col justify-center sm:flex-none sm:gap-2">
            <div className="flex items-center gap-2">
              <p className="max-w-auto inline-block whitespace-normal text-lg font-bold sm:text-xl">
                {vacancy.title}
              </p>
              <button className="ms-auto sm:m-0 sm:p-2" onClick={handleLike}>
                <FaRegHeart size={20} className="text-[#C90000]" />
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <p className="inline-block w-auto text-lg font-extrabold text-[#A0A0A0] sm:text-xl">
                {vacancy.companies?.title}
              </p>

              <p className="flex items-center gap-1">
                <CiLocationOn
                  size={24}
                  className="text-primary dark:text-white"
                />
                {vacancy.location}
              </p>

              <div className="flex items-center sm:hidden">
                <p className="text-xl font-bold">
                  {vacancy.salary} {vacancy.currency}
                </p>
              </div>
            </div>
          </div>

          <div className="ms-auto hidden items-center sm:flex">
            <p className="text-xl font-bold">
              {vacancy.salary} {vacancy.currency}
            </p>
          </div>
        </div>
      ))}

      {loading && vacancies.length > 0 && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {noMoreData && (
        <p className="text-center text-gray-500 dark:text-white">
          No more vacancies available.
        </p>
      )}

      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

export default VacanciesPage;
