import { createClient } from "@/supabase/service/server";
import { cookies as COOKIES } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookies = await COOKIES();

  const supabase = await createClient(cookies)

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) return NextResponse.error();

  return NextResponse.json(data);
}
