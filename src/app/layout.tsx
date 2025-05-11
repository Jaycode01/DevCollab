import type { Metadata } from "next";
import { Aclonica } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/page";

const aclonica = Aclonica({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aclonica",
});

export const metadata: Metadata = {
  title: {
    default: "DevCollab",
    template: "%s | DevCollab",
  },
  description: "Created and Idea by Nexon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Navbar />
      <body className={aclonica.className}>{children}</body>
    </html>
  );
}
