import Footer from "@/layout/Footer";
import HeaderMain from "@/layout/HeaderMain";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] flex flex-col dark:bg-[#141414]">
      <HeaderMain />
      <div className="flex-1 flex-grow h-full px-2 md:px-16">{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
