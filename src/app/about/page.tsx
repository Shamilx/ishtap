"use client";

import React, { useState } from "react";

function Page() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

export default Page;
