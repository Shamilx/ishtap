import createClient from "@/supabase/server";
import { cookies as COOKIES } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookies = await COOKIES();
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  if (!email || !password) {
    return new NextResponse("Missing email or password", { status: 400 });
  }

  try {
    const supabase = await createClient(cookies);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase sign-in error:", error);
      return new NextResponse(error.message, { status: 401 });
    }

    return NextResponse.json({ done: true });
  } catch (err) {
    console.error("Error in login route:", err);
    return new NextResponse("An error occurred during login.", { status: 500 });
  }
}
