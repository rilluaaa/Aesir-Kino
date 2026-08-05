import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AESIR Impact Report | Premium 3D Experience",
  description:
    "A cinematic, glassmorphic impact report experience for AESIR's AI care, SEN intervention, elderly rehabilitation, and sports technology ecosystem."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
