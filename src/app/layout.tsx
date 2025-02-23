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
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favorites/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favorites/favicon.svg" />
        <link rel="shortcut icon" href="/favorites/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favorites/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/favorites/site.webmanifest" />
      </head>
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
