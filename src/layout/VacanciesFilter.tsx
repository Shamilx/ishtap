"use client";

import supabase from "@/supabase/client";
import { get_locations_enum } from "@/supabase/enum/get_locations_enum";
import { Company } from "@/types/Company";
import { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

type Props = {
  setSelectedOrder: React.Dispatch<React.SetStateAction<string>>;
  setFilteredCompany: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFilteredLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFilteredJobType: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function VacanciesFilter(props: Props) {
  const [companies, setCompanies] = useState<Company[] | undefined>(undefined);
  const [locations, setLocations] = useState<string[] | undefined>(undefined);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data } = await supabase.from("companies").select("*");

      if (!data) return;

      setCompanies(data);
    };

    const fetchLocations = async () => {
      setLocations(await get_locations_enum());
    };

    fetchCompanies();
    fetchLocations();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDiv}
          className="relative flex h-[34px] w-[80px] items-center justify-center rounded-[10px] border-2 border-[#D9D9D9] bg-[#EAEAEA] py-2 dark:border-[#404040] dark:bg-[#242424] sm:w-[176px]"
        >
          <IoFilterSharp
            size={20}
            className="absolute text-[#6A6A6A] dark:text-white sm:left-4"
          />
          <span className="hidden font-bold text-[#6A6A6A] dark:text-white sm:block">
            Filters
          </span>
        </button>

        <div className="flex w-full items-center justify-end gap-2 sm:justify-normal">
          <select
            className="rounded-[5px] border-2 border-[#D9D9D9] bg-[#EAEAEA] font-bold text-[#6A6A6A] outline-none hover:bg-none dark:border-[#404040] dark:bg-[#242424] dark:text-white sm:flex-none sm:px-2"
            onChange={(e) => {
              props.setSelectedOrder(e.target.value as string);
            }}
          >
            <option value={"default"}>Sort By..</option>
            <option value="upload_date_asc">↓ Upload Date</option>
            <option value="upload_date_desc">↑ Upload Date</option>
            <option value="salary_asc">↓ Salary</option>
            <option value="salary_desc">↑ Salary</option>
          </select>
        </div>
      </div>

      <div
        style={{
          height: isOpen ? "50px" : "0",
        }}
        className={`${isOpen && `min-h-[150px]`} mt-4 flex items-center overflow-hidden rounded-[10px] sm:min-h-0 ${isOpen && `border-2`} border-[#D9D9D9] bg-[#EAEAEA] dark:border-[#404040] dark:bg-[#242424]`}
      >
        <div className="flex w-full flex-col justify-stretch gap-2 px-2 py-2 dark:text-white sm:flex-row sm:items-center">
          <div className="flex-1 items-center gap-2">
            <select
              className="w-full rounded-[5px] border-2 border-[#D9D9D9] bg-[#EAEAEA] px-2 font-bold text-[#6A6A6A] outline-none hover:bg-none dark:border-[#404040] dark:bg-[#242424] dark:text-white sm:flex-none"
              onChange={(e) => {
                props.setFilteredCompany(
                  e.target.value === "default" ? undefined : e.target.value,
                );
              }}
            >
              <option value={"default"}>Company..</option>
              {companies?.map((company) => {
                return (
                  <option key={company.id} value={company.id}>
                    {company.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex-1 gap-2 sm:items-center">
            <select
              className="w-full rounded-[5px] border-2 border-[#D9D9D9] bg-[#EAEAEA] px-2 font-bold text-[#6A6A6A] outline-none hover:bg-none dark:border-[#404040] dark:bg-[#242424] dark:text-white sm:flex-none"
              onChange={(e) => {
                props.setFilteredJobType(
                  e.target.value === "default" ? undefined : e.target.value,
                );
              }}
            >
              <option value={"default"}>Job Type..</option>
              <option value={"Part-time"}>Part-time</option>
              <option value={"Full-time"}>Full-time</option>
            </select>
          </div>

          <div className="flex-1 items-center gap-2">
            <select
              className="w-full rounded-[5px] border-2 border-[#D9D9D9] bg-[#EAEAEA] px-2 font-bold text-[#6A6A6A] outline-none hover:bg-none dark:border-[#404040] dark:bg-[#242424] dark:text-white sm:flex-none"
              onChange={(e) => {
                props.setFilteredLocation(
                  e.target.value === "default" ? undefined : e.target.value,
                );
              }}
            >
              <option value={"default"}>Location..</option>
              {locations?.map((location) => {
                return (
                  <option key={location} value={location}>
                    {location}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VacanciesFilter;
