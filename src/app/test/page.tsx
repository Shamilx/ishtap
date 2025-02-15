import { createClient } from "@/supabase/server";

async function page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  console.log(data);
  console.log(error);

  return <div>page</div>;
}

export default page;
