import supabase from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { data } = await supabase.from("companies").select("*");

    if (!data) return;
    
    return NextResponse.json(data);
}