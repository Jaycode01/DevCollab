import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
  keywords: ["Edit Profile", "User Profile", "Settings"],
};
export default function EditProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
