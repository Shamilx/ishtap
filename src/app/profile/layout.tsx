import ClientLink from "@/components/ClientLink";
import HeaderMain from "@/layout/HeaderMain";
import React from "react";
import { MdBusinessCenter, MdEdit } from "react-icons/md";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-[100vh] flex-col bg-white dark:bg-[#141414]"
      id="profile_vacancies"
    >
      <HeaderMain />

      <div id="main-content" className="flex flex-grow flex-col">
        <div className="mt-12 hidden w-full border-[1.5px] border-[#EAEAEA] dark:border-[#242424] lg:block"></div>

        <div
          id="content-wrapper"
          className="flex h-full w-full flex-grow flex-col lg:flex-row"
        >
          <div
            id="navigation"
            className="mt-12 flex min-w-[250px] flex-row justify-stretch gap-1 border-r-[2px] border-[#EAEAEA]  dark:border-[#242424] lg:mt-0 lg:flex-col lg:justify-center lg:gap-4 lg:px-6 lg:py-3"
          >
            <ClientLink
              href={"/profile/vacancies"}
              className={`flex flex-1 items-center justify-center gap-2 px-2 py-4 lg:py-2 dark:text-white lg:flex-none lg:justify-normal lg:rounded-2xl`}
            >
              <MdBusinessCenter
                size={24}
                className="text-[#242424] dark:text-white"
              />
              Your Vacancies
            </ClientLink>

            <ClientLink
              href={"/profile/editprofile"}
              className={`flex flex-1 items-center justify-center gap-2 px-2 py-4 lg:py-2 dark:text-white lg:flex-none lg:justify-normal lg:rounded-2xl`}
            >
              <MdEdit size={24} className="text-[#242424] dark:text-white" />
              Edit Profile
            </ClientLink>
          </div>

          <div className="mt-0 block w-full border-[1.5px] border-[#EAEAEA] dark:border-[#242424] lg:hidden"></div>

          <div className="no-scrollbar flex-1 overflow-scroll p-3">
            <div className="max-h-[100px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout;
