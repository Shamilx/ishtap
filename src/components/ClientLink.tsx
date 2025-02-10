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
    <Link href={href} className={`${className} ${isActive && "active"}`}>
      {children}
    </Link>
  );
}

export default ClientLink;
