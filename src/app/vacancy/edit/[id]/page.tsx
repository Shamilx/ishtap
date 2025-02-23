"use client";

import supabase from "@/supabase/client";
import { Vacancy } from "@/types/Vacancy";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { get_locations_enum } from "@/supabase/enum/get_locations_enum";
import { get_currencies_enum } from "@/supabase/enum/get_currencies_enum";
import SkillField from "@/layout/SkillField";
import BenefitField from "@/layout/BenefitsField";
import { Company } from "@/types/Company";

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

  const [locations, setLocations] = useState<string[] | undefined>();
  const [currencies, setCurrencies] = useState<string[] | undefined>();
  const [companies, setCompanies] = useState<Company[] | undefined>();

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

        if (
          fetchedVacancy.owner != user?.id &&
          user?.id != process.env.NEXT_PUBLIC_SUPABASE_ADMIN_UID!
        )
          router.replace("/404");

        setVacancy(fetchedVacancy);
        setFormData(fetchedVacancy);
      }
    }

    getData();
  }, [unwrappedParams, router, loading]);

  useEffect(() => {
    if (loading) return;

    const fetchData = async () => {
      const locations = await get_locations_enum();
      const currencies = await get_currencies_enum();

      const { data: companies } = await supabase
        .from("companies")
        .select("id,title")
        .returns<Company[]>();

      setLocations(locations);
      setCurrencies(currencies);

      if (!companies) return;
      setCompanies(companies);
    };

    fetchData();
  }, [loading]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (newSkills: string[]) => {
    setFormData({ ...formData, skills_required: newSkills });
  };

  const handleBenefitsChange = (newBenefits: string[]) => {
    setFormData({ ...formData, benefits: newBenefits });
  };

  const deleteVacancy = async () => {
    if (!unwrappedParams) return;

    const confirmation = confirm("Are you sure to DELETE?");

    if (!confirmation) return;

    const { error } = await supabase
      .from("vacancies")
      .delete()
      .eq("id", unwrappedParams.id);

    if (error) alert("Failed To Delete");
    else router.replace("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unwrappedParams) return;

    const new_skills_required = formData.skills_required?.filter(
      (skill) => skill != "",
    );

    const new_benefits = formData.benefits?.filter((benefit) => benefit != "");

    if (user?.id == process.env.NEXT_PUBLIC_SUPABASE_ADMIN_UID) {
      const newData = {
        ...formData,
        skills_required: new_skills_required
          ? new_skills_required.length > 0
            ? new_skills_required
            : null
          : null,
        benefits: new_benefits
          ? new_benefits.length > 0
            ? new_benefits
            : null
          : null,
      };

      const { error } = await supabase
        .from("vacancies")
        .update(newData)
        .eq("id", unwrappedParams.id);

      if (!error) {
        alert("Vacancy has been updated.");
      } else {
        console.error("Error updating vacancy:", error);
      }

      return;
    }

    const { error } = await supabase
      .from("request_vacancies")
      .upsert({
        ...formData,
        action: "update",
        skills_required:
          new_skills_required.length > 0 ? new_skills_required : null,
        benefits: new_benefits.length > 0 ? new_benefits : null,
        vacancyID: unwrappedParams.id,
      })
      .eq("vacancyID", unwrappedParams.id);

    if (!error) {
      alert("Your request has been filled. Wait for confirmation.");
    } else {
      console.error("Error updating vacancy:", error);
    }
  };

  if (!vacancy) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="dark:bg-[#141414]">
      <h2 className="mb-4 text-center text-2xl font-bold dark:text-white">
        Edit Vacancy
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-4 max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-lg shadow-gray-800/20 dark:bg-[#242424] dark:shadow-black/30"
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
            Company:
          </span>
          <select
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          >
            <option value={""} disabled>
              Select Company
            </option>
            {companies?.map((company) => (
              <option key={company.id} value={company.id}>
                {company.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Location:
          </span>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          >
            {locations &&
              locations.map((location) => {
                return (
                  <option key={location} value={location}>
                    {location}
                  </option>
                );
              })}
          </select>
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
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          >
            {currencies &&
              currencies.map((currency) => {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
          </select>
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

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Skills Required:
          </span>
          <SkillField
            skillsToShow={formData.skills_required}
            onChange={handleSkillsChange}
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Benefits:
          </span>
          <BenefitField
            benefitsToShow={formData.benefits}
            onChange={handleBenefitsChange}
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Update Vacancy
        </button>

        <button
          onClick={deleteVacancy}
          type="button"
          className="w-full rounded-md bg-red-600 py-2 text-white transition hover:bg-red-700"
        >
          Delete Vacancy
        </button>
      </form>
    </div>
  );
}
