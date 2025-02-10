"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function ClientLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`${className} ${isActive && "bg-[#e1e1e1] dark:bg-[#2a2a2a]"}`}>
      {children}
    </Link>
  );
}

export default ClientLink;
