import React from "react";
import { koulen } from "@/fonts/fonts";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" style={{fontSize: 48, fontFamily: `${koulen.style.fontFamily}` }}>
      ISHTAP
    </Link>
  );
}

export default Logo;
