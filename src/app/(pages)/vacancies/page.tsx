"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import supabase from "@/supabase/client";
import { Vacancy } from "@/types/Vacancy";
import Image from "next/image";
import { MdOutlineImageNotSupported } from "react-icons/md";
import Loading from "@/components/Loading";
import VacanciesFilter from "@/layout/VacanciesFilter";
import { IoLocationSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import LikeButton from "@/components/LikeButton";

const LIMIT = 5;

const VacanciesPage = () => {
  const router = useRouter();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [selectOrder, setSelectedOrder] = useState<
    | "upload_date_desc"
    | "upload_date_asc"
    | "salary_desc"
    | "salary_asc"
    | string
  >("default");

  const [filteredCompany, setFilteredCompany] = useState<string>();
  const [filteredLocation, setFilteredLocation] = useState<string>();
  const [filteredJobType, setFilteredJobType] = useState<string>();

  const fetchVacancies = useCallback(async () => {
    if (loading || noMoreData) return;

    setLoading(true);
    const start = page * LIMIT;
    const end = start + LIMIT - 1;

    let query = supabase.from("vacancies").select("*, companies(title, image)");

    // Apply filters if present
    if (filteredCompany) {
      query = query.eq("company", filteredCompany);
    }

    if (filteredLocation) {
      query = query.eq("location", filteredLocation);
    }

    if (filteredJobType) {
      query = query.eq("job_type", filteredJobType);
    }

    // Handle ordering logic
    if (selectOrder === "upload_date_asc") {
      query = query.order("posted_date", { ascending: false });
    } else if (selectOrder === "upload_date_desc") {
      query = query.order("posted_date", { ascending: true });
    } else if (selectOrder === "salary_asc") {
      query = query.order("salary", { ascending: false });
    } else if (selectOrder === "salary_desc") {
      query = query.order("salary", { ascending: true });
    } else {
      query = query.order("id", { ascending: true });
    }

    if (
      selectOrder === "default" &&
      !filteredCompany &&
      !filteredLocation &&
      !filteredJobType
    ) {
      query = query.range(start, end);
    } else {
      setNoMoreData(true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching vacancies:", error);
      setLoading(false);
      return;
    }

    if (data.length === 0) {
      setNoMoreData(true);
    } else {
      setVacancies((prev) => {
        const uniqueVacancies = [
          ...new Map(prev.concat(data).map((item) => [item.id, item])).values(),
        ];
        return uniqueVacancies;
      });
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  }, [
    page,
    loading,
    noMoreData,
    selectOrder,
    filteredCompany,
    filteredLocation,
    filteredJobType,
  ]);

  useEffect(() => {
    setVacancies([]);
    setPage(0);
    setNoMoreData(false);
    fetchVacancies();
  }, [selectOrder, filteredCompany, filteredLocation, filteredJobType]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !noMoreData) {
          fetchVacancies();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchVacancies, loading, noMoreData]);

  const handleDetails = (id: number) => {
    router.push(`/vacancy/${id}`);
  };

  return (
    <div id="vacancies" className="flex flex-col gap-4">
      {vacancies.length === 0 && loading && <Loading />}

      <VacanciesFilter
        setSelectedOrder={setSelectedOrder}
        setFilteredCompany={setFilteredCompany}
        setFilteredLocation={setFilteredLocation}
        setFilteredJobType={setFilteredJobType}
      />

      {vacancies.map((vacancy) => (
        <div
          key={`${vacancy.id}-${vacancy.company}-${vacancy.title}`}
          onClick={() => handleDetails(vacancy.id)}
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
              <LikeButton vacancyId={vacancy.id} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <p className="inline-block w-auto text-lg font-extrabold text-[#A0A0A0] sm:text-xl">
                {vacancy.companies?.title}
              </p>

              <p className="flex items-center gap-1 font-bold text-[#6A6A6A]">
                <IoLocationSharp
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
