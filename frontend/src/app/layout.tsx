import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/page";
import { AuthProvider } from "./auth/auth-provider";
import UsageTrackerWrapper from "./components/UsageTrackerWrapper";
import React from "react";

const comic_neue = Comic_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aclonica",
});

export const metadata: Metadata = {
  title: {
    default: "DevCollab",
    template: "DevCollab | %s",
  },
  description: "Created and Idea by Nexon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={comic_neue.className}>
        <Navbar />
        <AuthProvider>
          <UsageTrackerWrapper>{children}</UsageTrackerWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
