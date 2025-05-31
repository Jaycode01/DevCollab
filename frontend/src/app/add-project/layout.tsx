import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Project",
};
export default function AddProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
