import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};
export default function ContactUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
