import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "User profile page",
};
export default function ProfiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
