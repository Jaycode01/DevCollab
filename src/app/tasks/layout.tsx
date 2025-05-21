import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
  description:
    "Page where user can see tasks they are assigned to and create new tasks",
};
export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
