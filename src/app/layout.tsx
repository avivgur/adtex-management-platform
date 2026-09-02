import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adtex | Executive Operations Platform",
  description: "A privacy-safe portfolio demo of a multi-source executive operations command center.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
