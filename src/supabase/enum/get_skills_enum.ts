import supabase from "../client";

export async function get_skills_enum() {
  const { data } = await supabase.rpc("get_skills_enum").returns<string[]>();
  if (!data) return undefined;
  
  return data;
}
