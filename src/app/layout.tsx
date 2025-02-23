import type { Metadata } from "next";
import "./globals.css";
import "@/scss/main.scss";
import { open_sans } from "@/fonts/fonts";
import { AuthProvider } from "@/context/AuthContext";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/context/ThemeProvider";
import React from "react";

export const metadata: Metadata = {
  title: "Ishtap",
  description: "We connect employers with employees.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get("theme")?.value || "light";

  return (
    <html
      lang="en"
      style={{ fontFamily: `${open_sans.style.fontFamily}` }}
      className={`${theme}`}
    >
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>

        <p className="block text-center minimum:hidden">
          Please use a screen at least 300 px width.
        </p>
      </body>
    </html>
  );
}
