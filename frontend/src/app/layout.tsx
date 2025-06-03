import type { Metadata } from "next";
import { Aclonica } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/page";
import { AuthProvider } from "./auth/auth-provider";
import useUsageTracker from "@/hooks/useUsageTracker";
import { useAuth } from "./auth/auth-provider";
import React from "react";

const aclonica = Aclonica({
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

function UsageTrackerWrapper({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  useUsageTracker(token);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={aclonica.className}>
        <Navbar />
        <AuthProvider>
          <UsageTrackerWrapper>{children}</UsageTrackerWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
