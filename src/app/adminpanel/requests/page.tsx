"use client";

import supabase from "@/supabase/client";
import { Vacancy } from "@/types/Vacancy";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineImageNotSupported } from "react-icons/md";

export type request_vacancy = Vacancy & {
  action: "update" | "insert";
  vacancyID: number;
  owner: string;
};

function AdminPanelRequests() {
  const [vacancy_requests, setVacancyRequests] = useState<request_vacancy[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchRequestVacancies = async () => {
      const { data, error } = await supabase
        .from("request_vacancies")
        .select("*,companies(*)")
        .returns<request_vacancy[]>();

      if (error) return;

      setVacancyRequests(data);
    };

    fetchRequestVacancies();
  }, []);

  const handleDetails = (changedVacancy: request_vacancy) => {
    router.push(`./requests/${changedVacancy.id}`);
  };

  return (
    <div>
      {" "}
      {vacancy_requests &&
        (!(vacancy_requests.length == 0) ? (
          vacancy_requests.map((vacancy) => (
            <div
              onClick={() => handleDetails(vacancy)}
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
              There is no any Vacancy Requests.
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

export default AdminPanelRequests;
