import type { Metadata } from "next";
import { bebas_neue } from '@/app/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "Tampereen Kahviviikko 2024",
  description: "Piristysruiske Tampereen kahvilakultuuriin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bebas_neue.className}>{children}</body>
    </html>
  );
}
