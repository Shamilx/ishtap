"use client";

import supabase from "@/supabase/client";
import { Company } from "@/types/Company";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

function Companies() {
  const [companies, setCompanies] = useState<Company[] | undefined>(undefined);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase.from("companies").select("*");

      if (error) return;

      setCompanies(data);
    };

    fetchCompanies();
  });

  return (
    <div>
      <h3 className="text-center text-2xl font-bold dark:text-white">
        Companies
      </h3>

      <div className="mt-4 flex flex-wrap justify-center dark:text-white">
        {companies &&
          companies.map((company) => (
            <div
              key={company.id}
              className="flex w-1/5 min-w-[250px] cursor-pointer flex-col items-center justify-center gap-2 border p-4 transition-all duration-200 hover:scale-105 hover:rounded-2xl hover:bg-[#fff] hover:text-black"
            >
              {company.image ? (
                <Image
                  src={company.image}
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
              <p className="font-bold">{company.title}</p>
              <p>{company.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Companies;
