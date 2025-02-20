import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tkoadlvpkmcfrdhbslug.supabase.co";

const supabase = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default supabase;
