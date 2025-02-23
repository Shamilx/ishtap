import RecentUsersChart from "@/components/RecentUsersChart";
import React from "react";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoMdBusiness } from "react-icons/io";
import { MdBusinessCenter } from "react-icons/md";
import { cookies as COOKIES } from "next/headers";
import createClient from "@/supabase/service/server";
import Link from "next/link";

async function AdminPanel() {
  const cookies = await COOKIES();

  const supabase = await createClient(cookies);

  const { data: companiesCountData } = await supabase
    .from("companies")
    .select("id", { count: "exact" });

  const companiesCount = companiesCountData?.length || 0;

  const { data: vacanciesCountData } = await supabase
    .from("vacancies")
    .select("id", { count: "exact" });

  const vacanciesCount = vacanciesCountData?.length || 0;

  const { data: requestVacanciesData } = await supabase
    .from("request_vacancies")
    .select("id", { count: "exact" });

  const requestVacanciesCount = requestVacanciesData?.length || 0;

  return (
    <div className="dark:bg-[#141414] dark:text-white">
      <div className="pb-7">
        <div className="hidden justify-center lg:flex">
          <RecentUsersChart />
        </div>
        <div className="mt-24 flex flex-wrap gap-4">
          <Link
            href="/adminpanel/vacancies"
            className="flex h-[200px] min-w-[290px] flex-1 cursor-pointer gap-6 rounded-2xl bg-[#f8f8f8] p-6 text-black transition-all duration-200 hover:bg-gray-200 dark:bg-[#242424] dark:text-white dark:hover:bg-[#212121]"
          >
            <div className="flex items-center">
              <MdBusinessCenter
                size={92}
                className="text-black dark:text-white"
              />
            </div>
            <div>
              <p className="text-2xl font-bold">Vacancies</p>
              <p className="mt-2 text-3xl font-semibold">{vacanciesCount}</p>
            </div>
          </Link>

          <Link
            href="/adminpanel/companies"
            className="flex h-[200px] min-w-[290px] flex-1 cursor-pointer gap-6 rounded-2xl bg-[#f8f8f8] p-6 text-black transition-all duration-200 hover:bg-gray-200 dark:bg-[#242424] dark:text-white dark:hover:bg-[#212121]"
          >
            <div className="flex items-center">
              <IoMdBusiness size={92} className="text-black dark:text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">Companies</p>
              <p className="mt-2 text-3xl font-semibold">{companiesCount}</p>
            </div>
          </Link>

          <Link
            href="/adminpanel/requests"
            className="flex h-[200px] min-w-[290px] flex-1 cursor-pointer gap-6 rounded-2xl bg-[#f8f8f8] p-6 text-black transition-all duration-200 hover:bg-gray-200 dark:bg-[#242424] dark:text-white dark:hover:bg-[#212121]"
          >
            <div className="flex items-center">
              <FaCodePullRequest
                size={92}
                className="text-black dark:text-white"
              />
            </div>
            <div>
              <p className="text-2xl font-bold">Requests</p>
              <p className="mt-2 text-3xl font-semibold">
                {requestVacanciesCount}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
