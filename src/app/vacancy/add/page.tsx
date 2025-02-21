"use client";

import HeaderMain from "@/layout/HeaderMain";
import supabase from "@/supabase/client";
import { Vacancy } from "@/types/Vacancy";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { get_locations_enum } from "@/supabase/enum/get_locations_enum";
import { get_currencies_enum } from "@/supabase/enum/get_currencies_enum";
import SkillField from "@/layout/SkillField";
import BenefitField from "@/layout/BenefitsField";
import { Company } from "@/types/Company";

export default function AddVacancy() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Vacancy>>({});
  const [locations, setLocations] = useState<string[] | undefined>();
  const [currencies, setCurrencies] = useState<string[] | undefined>();
  const [companies, setCompanies] = useState<Company[] | undefined>();

  const { user, loading } = useAuth();

  let today = new Date();
  let dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  useEffect(() => {
    if(loading) return;

    if(!user) router.replace("/login");
    
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const new_skills_required = formData.skills_required?.filter(
      (skill) => skill !== "",
    );
    const new_benefits = formData.benefits?.filter((benefit) => benefit !== "");

    const { error } = await supabase.from("request_vacancies").insert({
      ...formData,
      owner: user.id,
      action: "insert",
      skills_required: new_skills_required ? new_skills_required : null,
      benefits: new_benefits ? new_benefits : null,
    });

    if (!error) {
      alert("Your vacancy has been submitted for approval.");
      router.push("/");
    } else {
      console.error("Error adding vacancy:", error);
    }
  };

  return (
    <div className="dark:bg-[#242424]">
      <HeaderMain />
      <h2 className="mb-4 text-center text-2xl font-bold dark:text-white">
        Add Vacancy
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
            defaultValue={""}
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
            required
            defaultValue={""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          >
            <option value={""} disabled>
              Select Location
            </option>
            {locations?.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Salary:
          </span>
          <input
            type="number"
            name="salary"
            required
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Currency:
          </span>
          <select
            required
            name="currency"
            defaultValue={""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          >
            <option value={""} disabled>
              Select Currency
            </option>

            {currencies?.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Deadline:
          </span>
          <input
            type="date"
            required
            min={new Date().toISOString().split("T")[0]} // Correctly sets today's date as min
            name="deadline"
            value={formData.deadline ? formData.deadline.split("T")[0] : ""}
            onChange={handleChange}
            className="scheme-dark mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Remote:
          </span>
          <select
            name="remote"
            required
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
            required
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
            onChange={handleChange}
            className="mt-1 block h-[200px] w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Skills Required:
          </span>
          <SkillField onChange={handleSkillsChange} />
        </label>

        <label className="block">
          <span className="font-bold text-gray-700 dark:text-white">
            Benefits:
          </span>
          <BenefitField onChange={handleBenefitsChange} />
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Submit Vacancy
        </button>
      </form>
      <Footer className="text-black dark:text-white" />
    </div>
  );
}
