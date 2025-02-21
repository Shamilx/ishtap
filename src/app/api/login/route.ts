import { createServerClient } from "@supabase/ssr";
import { cookies as COOKIES } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Initialize Supabase client (outside the handler)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(req: NextRequest) {
  const cookies = await COOKIES();
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  if (!email || !password) {
    return new NextResponse("Missing email or password", { status: 400 });
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            cookies.set(name, value);
          });
        },
      },
    });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase sign-in error:", error);
      return new NextResponse(error.message, { status: 401 });
    }

    // Redirect AFTER successful Supabase sign-in (crucial!)
    const response = NextResponse.redirect(new URL("/adminpanel", req.url), {
      status: 302,
    });

    return response;
  } catch (err) {
    console.error("Error in login route:", err);
    return new NextResponse("An error occurred during login.", { status: 500 });
  }
}
