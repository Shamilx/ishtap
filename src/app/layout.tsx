import type { Metadata } from "next";
import "./globals.css";
import "@/scss/main.scss";
import { open_sans } from "@/fonts/fonts";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Ishtap",
  description: "We connect employers with employees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ fontFamily: `${open_sans.style.fontFamily}` }}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
