import Loading from "@/components/Loading";
import React from "react";

function loading() {
  return (
    <div className="flex min-h-[200px] items-end justify-center">
      <Loading />
    </div>
  );
}

export default loading;
