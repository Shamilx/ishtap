import React from "react";
import { Koulen } from "next/font/google";

const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
});

function Logo() {
  return (
    <a href="/" style={{fontSize: 48, fontFamily: `${koulen.style.fontFamily}` }}>
      ISHTAP
    </a>
  );
}

export default Logo;
