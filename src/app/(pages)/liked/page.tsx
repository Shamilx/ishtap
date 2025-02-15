"use client";

import LikeButton from "@/components/LikeButton";
import supabase from "@/supabase/client";
import { Vacancy } from "@/types/Vacancy";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineImageNotSupported } from "react-icons/md";

function Page() {
  const router = useRouter();
  const [likedVacancies, setLikedVacancies] = useState<Vacancy[]>();

  useEffect(() => {
    const fetchLikedVacancies = async () => {
      const { data, error } = await supabase
        .from("liked")
        .select("*, vacancies(*, companies(*))");

      if (error) return;

      console.log(data);

      setLikedVacancies(data.map((obj) => obj.vacancies));
    };

    fetchLikedVacancies();
  }, []);

  const handleDetails = (id: number) => {
    router.push(`/vacancy/${id}`);
  };

  return (
    <div>
      <h3 className="text-center text-2xl font-bold dark:text-white">Liked</h3>

      {likedVacancies &&
        likedVacancies.map((vacancy) => (
          <div
            key={`${vacancy.id}-${vacancy.company}-${vacancy.title}`}
            onClick={() => handleDetails(vacancy.id)}
            className="mt-4 flex min-h-[150px] cursor-pointer items-center gap-2 rounded-[15px] border-2 border-[#D9D9D9] bg-[#EAEAEA] px-3 py-2 transition-all duration-200 hover:bg-[#e3e3e3] dark:border-[#404040] dark:bg-[#242424] dark:text-white dark:hover:!bg-[#202020] sm:h-[100px] sm:min-h-0 sm:gap-4 sm:px-6 sm:py-3"
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

      {likedVacancies && likedVacancies.length === 0 && (
        <p className="mt-4 text-center font-bold dark:text-white">
          You didn`t like any vacancy.
        </p>
      )}
    </div>
  );
}

export default Page;
