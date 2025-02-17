import LoadingScreen from "@/components/LoadingScreen";
import HeaderMain from "@/layout/HeaderMain";
import supabase from "@/supabase/client";
import { Vacancy as VacancyType } from "@/types/Vacancy";

// icons
import { IoLocationSharp } from "react-icons/io5";
import { IoTimerOutline } from "react-icons/io5";

async function Vacancy({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const { data, error } = await supabase
    .from("vacancies")
    .select("*,companies(*)")
    .eq("id", id)
    .returns<VacancyType[]>();

  if (error) return;

  const vacancy = data[0];

  const deadline = new Date(vacancy.deadline);

  return (
    <div className="flex min-h-[100vh] flex-col bg-white dark:bg-[#141414]">
      <HeaderMain />

      <div className="mt-16 px-2 md:px-16">
        <div id="left">
          <p className="text-4xl font-bold dark:text-white sm:text-5xl">
            {vacancy.title}
          </p>
          <div className="mt-6 flex flex-wrap">
            <div className="flex w-[120px] min-w-[120px] items-center justify-center gap-2 rounded-[10px] bg-[#FFCC00] py-2 text-[#fff] dark:bg-[#FFCC00]/10 dark:text-[#FFCC00] sm:w-[170px]">
              <IoTimerOutline size={20} />
              <p className="font-bold">
                {deadline.getDay()}.{deadline.getMonth()}.
                {deadline.getFullYear()}
              </p>
            </div>
          </div>
        </div>
        <div id="right"></div>
      </div>
    </div>
  );
}

export default Vacancy;
