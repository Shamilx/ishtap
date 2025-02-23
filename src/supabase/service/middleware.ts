import { NextResponse, type NextRequest } from "next/server";
import createClient from "../server";
import { cookies } from "next/headers";


export async function updateSession(req: NextRequest) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== "f46f4d3b-41a6-4720-b619-e7b307a03667") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // User is authenticated.  Let the request continue.
  const res = NextResponse.next(); // or NextResponse.next({request: req}) in newer versions
  return res;
}