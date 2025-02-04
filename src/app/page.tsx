import { redirect } from "next/navigation";
import React from "react";

function Page() {
  redirect("/home");
  return <div></div>;
}

export default Page;
