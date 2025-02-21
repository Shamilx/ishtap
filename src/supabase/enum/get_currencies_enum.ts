import supabase from "../client";

export async function get_currencies_enum() {
  const { data } = await supabase.rpc("get_all_currencies").returns<string[]>();
  if (!data) return undefined;

  return data;
}
