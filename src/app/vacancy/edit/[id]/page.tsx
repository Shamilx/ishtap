"use client";

import HeaderMain from "@/layout/HeaderMain";
import supabase from "@/supabase/client";
import { Vacancy } from "@/types/Vacancy";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/layout/Footer";
import { useAuth } from "@/context/AuthContext";

async function fetchVacancy(id: string) {
  const { data: vacancyArray } = await supabase
    .from("vacancies")
    .select("*")
    .eq("id", id)
    .returns<Vacancy[]>();

  if (!vacancyArray || vacancyArray.length === 0) {
    return null;
  }
  return vacancyArray[0];
}

export default function Edit({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState<Partial<Vacancy>>({});
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(
    null,
  );

  const { user, loading } = useAuth();

  useEffect(() => {
    async function unwrapParams() {
      setUnwrappedParams(await params);
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (loading) return;

    async function getData() {
      if (unwrappedParams) {
        const fetchedVacancy = await fetchVacancy(unwrappedParams.id);
        if (!fetchedVacancy) {
          router.replace("/404");
          return;
        }

        if (fetchedVacancy.owner != user?.id) router.replace("/404");

        setVacancy(fetchedVacancy);
        setFormData(fetchedVacancy);
      }
    }

    getData();
  }, [unwrappedParams, router, loading]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unwrappedParams) return;

    const { error } = await supabase
      .from("request_vacancies")
      .upsert({ ...formData, action: "update" });

    if (!error) {
      alert("Your request has been filled. Wait for confirmation.");
    } else {
      console.error("Error updating vacancy:", error);
    }
  };

  if (!vacancy) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="dark:bg-[#242424]">
      <HeaderMain />
      <h2 className="mb-4 text-center text-2xl font-bold dark:text-white">
        Edit Vacancy
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-4 max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-[#242424]"
      >
        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Title:
          </span>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Location:
          </span>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Salary:
          </span>
          <input
            type="number"
            name="salary"
            value={formData.salary || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Currency:
          </span>
          <input
            type="text"
            name="currency"
            value={formData.currency || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Deadline:
          </span>
          <input
            type="datetime-local"
            name="deadline"
            value={
              formData.deadline
                ? new Date(formData.deadline).toISOString().slice(0, -1)
                : ""
            }
            onChange={handleChange}
            required
            className="scheme-dark mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Remote:
          </span>
          <select
            name="remote"
            value={formData.remote ? "true" : "false"}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Education Required:
          </span>
          <input
            type="text"
            name="education_required"
            value={formData.education_required || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Description:
          </span>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="mt-1 block h-[200px] w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Update Vacancy
        </button>
      </form>

      <Footer className="text-black dark:text-white" />
    </div>
  );
}
