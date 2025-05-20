import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Page where user can check and view the lists of projects they have created",
};
export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
