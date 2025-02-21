import type { NextRequest } from "next/server";
import { updateSession } from "./supabase/service/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/adminpanel"],
};
