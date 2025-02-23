import Footer from "@/layout/Footer";
import HeaderHome from "@/layout/HeaderHome";
import HeaderMain from "@/layout/HeaderMain";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100vh] flex-col dark:bg-[#141414] dark:text-white">
      <HeaderMain />
      <div className="h-full flex-1 flex-grow px-2 md:px-16">{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
