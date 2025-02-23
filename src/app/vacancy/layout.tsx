import Footer from "@/layout/Footer";
import HeaderMain from "@/layout/HeaderMain";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100vh] flex-col dark:bg-[#141414]">
      <HeaderMain />
      <div className="h-full flex-1 flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

export default layout;
