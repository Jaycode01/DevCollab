import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DevCollab",
};
export default function AddProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
