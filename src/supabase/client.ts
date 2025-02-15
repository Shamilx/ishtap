import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tkoadlvpkmcfrdhbslug.supabase.co";

const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrb2FkbHZwa21jZnJkaGJzbHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NTc5MjMsImV4cCI6MjA1NDIzMzkyM30.5kWjlP0wukllgc2J0GvuHgqyHBDy_3DLCiCWDJKiMtw",
);

export default supabase;
