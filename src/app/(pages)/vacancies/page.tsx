import Loading from "@/components/Loading";
import supabase from "@/supabase/supabase";
import { Vacancy } from "@/types/Vacancy";
import React, { Suspense } from "react";

async function page() {
  const { data: vacancies, error } = await supabase
    .from("vacancies")
    .select("*")
    .range(0, 3)
    .order("id", { ascending: true })
    .returns<Vacancy[]>();

  if (error) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div id="vacancies" className="flex flex-col gap-4">
        {vacancies &&
          vacancies?.map((vacancy) => {
            return (
              <div
                key={vacancy.id}
                className="h-[100px] bg-[#EAEAEA] p-2 dark:bg-[#404040] dark:text-white"
              >
                <p>{vacancy.title}</p>
              </div>
            );
          })}
      </div>
    </Suspense>
  );
}

export default page;
