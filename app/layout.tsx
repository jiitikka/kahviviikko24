import type { Metadata } from "next";
import { bebas_neue } from '@/app/fonts';
import "./globals.css";
import HotjarSnippet from "./scripts/HotjarSnippet";

export const metadata: Metadata = {
  title: "Tampereen Kahviviikko 2024",
  description: "Piristysruiske Tampereen kahvilakultuuriin. 8.4.–14.4.2024",
  verification: {
    google: 'fJTi1kgCeV0uuPKqLrrQxaHfU7JZoXZCMZoxa6ue1mE',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={bebas_neue.className}>
        {children}
      </body>
      <HotjarSnippet/>
    </html>
  );
}
