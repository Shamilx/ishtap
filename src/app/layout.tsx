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
        <div className="minimum:block hidden">
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </div>

        <p className="minimum:hidden block text-center">
          Please use a screen at least 300 px width.
        </p>
      </body>
    </html>
  );
}
