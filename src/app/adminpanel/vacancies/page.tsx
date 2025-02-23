"use client";

import VacanciesFilter from "@/layout/VacanciesFilter";
import supabase from "@/supabase/client";
import { Vacancy } from "@/types/Vacancy";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiEdit, CiLocationOn } from "react-icons/ci";
import { MdOutlineImageNotSupported } from "react-icons/md";

function AdminPanelVacancies() {
  const [vacancies, setVacancies] = useState<Vacancy[]>();

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

  useEffect(() => {
    const fetchVacancies = async () => {
      let query = supabase
        .from("vacancies")
        .select("*, companies(title, image)");

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

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching vacancies:", error);
        return;
      }

      setVacancies(data);
    };

    fetchVacancies();
  }, [filteredCompany, filteredLocation, filteredJobType, selectOrder]);

  const handleDetails = (id: number) => {
    redirect(`/vacancy/${id}`);
  };

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    e.stopPropagation();

    redirect(`/vacancy/edit/${id}`);
  };

  return (
    <div>
      <VacanciesFilter
        setSelectedOrder={setSelectedOrder}
        setFilteredCompany={setFilteredCompany}
        setFilteredJobType={setFilteredJobType}
        setFilteredLocation={setFilteredLocation}
      />

      {vacancies &&
        (!(vacancies.length == 0) ? (
          vacancies.map((vacancy) => (
            <div
              onClick={() => handleDetails(vacancy.id)}
              key={`${vacancy.id}-${vacancy.company}-${vacancy.title}`}
              className="mt-4 flex min-h-[150px] cursor-pointer items-center gap-4 rounded-[15px] bg-[#F4F4F4] px-3 py-2 transition-all duration-200 hover:bg-[#e7e7e7] dark:bg-[#202020] dark:text-white dark:hover:!bg-[#191919] sm:h-[100px] sm:min-h-0 sm:gap-4 sm:px-6 sm:py-3"
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

                  <button
                    className="ms-auto"
                    onClick={(e) => handleEdit(e, vacancy.id)}
                  >
                    <CiEdit size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <p className="inline-block w-auto text-lg font-extrabold text-[#A0A0A0] sm:text-xl">
                    {vacancy.companies?.title}
                  </p>

                  <p className="flex items-center gap-1 font-bold text-[#6A6A6A]">
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
          ))
        ) : (
          <div className="flex h-full min-h-[200px] flex-1 flex-col items-center justify-center gap-4 text-center dark:text-white">
            <p className="text-2xl font-bold">
              You didn&apos;t create any vacancies.
            </p>
            <button
              onClick={() => redirect("/vacancy/add")}
              className="rounded-full bg-primary px-12 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-secondary"
            >
              Create One
            </button>
          </div>
        ))}
    </div>
  );
}

export default AdminPanelVacancies;
