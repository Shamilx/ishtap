import HeaderMain from "@/layout/HeaderMain";
import React from "react";

function Page() {
  return (
    <div className="min-h-[100vh] bg-contrast dark:bg-[#141414]">
      <HeaderMain />

      <div id="main-content"></div>
    </div>
  );
}

export default Page;
