import LikeButton from "@/components/LikeButton";
import Footer from "@/layout/Footer";
import HeaderMain from "@/layout/HeaderMain";
import supabase from "@/supabase/client";
import { Vacancy as VacancyType } from "@/types/Vacancy";
import Image from "next/image";

// icons
import { IoLocationSharp } from "react-icons/io5";
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineImageNotSupported } from "react-icons/md";

async function Vacancy({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const { data } = await supabase
    .from("vacancies")
    .select("*,companies(*)")
    .eq("id", id)
    .returns<VacancyType[]>();

  if (!data) return;

  const vacancy = data[0];

  const deadline = new Date(vacancy.deadline);

  return (
    <div className="flex min-h-[100vh] flex-col bg-white dark:bg-[#141414]">
      <HeaderMain />

      <div className="mt-16 flex flex-col gap-2 text-wrap break-all px-2 pb-6 md:px-16 lg:flex-row">
        <div id="left" className="flex-1">
          <div className="flex items-center gap-6">
            <p className="text-4xl font-bold dark:text-white sm:text-5xl">
              {vacancy.title}
            </p>
            <LikeButton vacancyId={vacancy.id} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex w-[120px] items-center justify-center gap-1 rounded-[10px] bg-[#FFCC00]/25 py-1 text-[#FFCC00] dark:bg-[#FFCC00]/10 dark:text-[#FFCC00] sm:w-[170px]">
              <IoTimerOutline size={20} />
              <p className="text-md font-bold">
                {deadline.getDay()}.{deadline.getMonth()}.
                {deadline.getFullYear()}
              </p>
            </div>

            <div className="flex items-center justify-center gap-1 py-1">
              <IoLocationSharp
                size={20}
                className="text-primary dark:text-white"
              />
              <p className="text-md font-bold dark:text-white">
                {vacancy.location}
              </p>
            </div>

            <div className="flex items-center gap-1 py-1">
              <p className="text-xl font-bold dark:text-white">
                {vacancy.salary} {vacancy.currency}
              </p>
            </div>
          </div>
          <p className="mt-6 whitespace-pre-line font-semibold leading-[26px] tracking-tight text-[#777]">
            {vacancy.description}
          </p>
        </div>

        <div
          id="right"
          className="mt-6 flex flex-1 flex-col lg:mt-0 lg:items-center"
        >
          <div className="flex max-w-[600px] flex-col items-center lg:px-12">
            <div
              id="company"
              className="flex h-[150px] w-full items-center gap-4 rounded-[10px] bg-[#F4F4F4] p-4 dark:bg-[#202020] lg:min-w-[400px]"
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

              <div className="h-[76px]">
                <p className="text-2xl font-extrabold text-[#242424] dark:text-white">
                  {vacancy.companies?.title}
                </p>
                <p className="font-bold text-[#202020] dark:text-[#E8E8E8]">
                  {vacancy.companies?.email}
                </p>
              </div>
            </div>

            <div
              id="properties"
              className="mt-6 flex w-full flex-col gap-2 dark:text-white"
            >
              {!(vacancy.remote === null) && (
                <div className="flex items-center gap-2">
                  <label className="break-keep text-lg font-bold">
                    Remote:
                  </label>
                  <p className="dark:text-[#c0c0c0]">
                    {vacancy.remote ? "Remote" : "Not Remote"}
                  </p>
                </div>
              )}

              {vacancy.job_type && (
                <div className="flex items-center gap-2">
                  <label className="break-keep text-lg font-bold">
                    Job Type:
                  </label>
                  <p className="dark:text-[#c0c0c0]">{vacancy.job_type}</p>
                </div>
              )}

              {vacancy.education_required && (
                <div className="flex items-center gap-2">
                  <label className="break-keep text-lg font-bold">
                    Education:
                  </label>
                  <p className="dark:text-[#c0c0c0]">
                    {vacancy.education_required}
                  </p>
                </div>
              )}

              {vacancy.experience_level && (
                <div className="flex items-center gap-2">
                  <label className="break-keep text-lg font-bold">
                    Experience Level:
                  </label>
                  <p className="dark:text-[#c0c0c0]">
                    {vacancy.experience_level}
                  </p>
                </div>
              )}
            </div>

            {vacancy.skills_required && (
              <div id="skills-required" className="mt-8 w-full">
                <p className="text-2xl font-bold text-black dark:text-white">
                  Skills Required
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {vacancy.skills_required.map((skill) => (
                    <>
                      <div
                        key={skill}
                        className="rounded-3xl bg-[#E2E2E2] px-6 py-2 font-bold dark:bg-[#202020] dark:text-white"
                      >
                        {skill}
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}

            {vacancy.benefits && (
              <div id="benefits-required" className="mt-8 w-full">
                <p className="text-2xl font-bold text-black dark:text-white">
                  Benefits
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {vacancy.benefits.map((benefit) => (
                    <>
                      <div
                        key={benefit}
                        className="rounded-3xl bg-[#E2E2E2] px-6 py-2 font-bold dark:bg-[#202020] dark:text-white"
                      >
                        {benefit}
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer className="!text-black dark:!text-white" />
    </div>
  );
}

export default Vacancy;
