import supabase from "./client";
import companies from "@/../extras/companies.json";

export async function updateAllLogos() {
  const { data, error } = await supabase
    .from("vacancies")
    .select("*, companies(title,image)");

  console.log(data);
  console.log(error);

  // for (let i = 0; i <= 50; i++) {
  //   const randomNumber = Math.floor(Math.random() * 20);

  //   const { data, error } = await supabase
  //     .from("vacancies")
  //     .update({ company: randomNumber })
  //     .eq("id", i);

  //   console.log(data);
  //   console.log(error);
  // }
}
