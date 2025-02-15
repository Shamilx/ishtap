import supabase from "../client";

export async function get_locations_enum() {
  const { data } = await supabase.rpc("get_all_locations");
  if (!data) return;
  
  return data;
}
