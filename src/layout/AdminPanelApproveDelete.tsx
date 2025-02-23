"use client";

import { request_vacancy } from "@/app/adminpanel/requests/page";
import Loading from "@/components/Loading";
import supabase from "@/supabase/client";
import { useState } from "react";

function AdminPanelApproveDelete({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const handleAprove = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("request_vacancies")
      .select("*,companies(*)")
      .eq("id", id)
      .returns<request_vacancy[]>();

    if (!data) {
      setError(true);
      return;
    }

    const newVacancy = data[0];

    const { action, companies, vacancyID, ...vacancyToUpdate } = newVacancy;

    console.log(action, companies, vacancyID);

    const { error } = await supabase
      .from("vacancies")
      .upsert(vacancyToUpdate)
      .eq("id", id);

    if (error) {
      console.log(error);
      setError(true);
    }

    const { error: lastError } = await supabase
      .from("request_vacancies")
      .delete()
      .eq("id", id);

    if (!lastError) setDone(true);
    else setError(true);
  };

  const handleDelete = async () => {
    setLoading(true);

    const { error: lastError } = await supabase
      .from("request_vacancies")
      .delete()
      .eq("id", id);

    if (!lastError) setDone(true);
    else setError(true);
  };

  if (done) return <p className="text-lg font-bold text-green-600">Done</p>;

  return (
    <>
      {error && <p className="text-lg font-bold text-red-600">Error</p>}

      {!error &&
        (loading ? (
          <Loading />
        ) : (
          <>
            <button onClick={handleAprove} className="font-bold text-green-800">
              Approve
            </button>
            <button onClick={handleDelete} className="font-bold text-red-800">
              Delete
            </button>
          </>
        ))}
    </>
  );
}

export default AdminPanelApproveDelete;
