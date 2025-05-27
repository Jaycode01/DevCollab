import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Get started by sgn up page...created by me",
};
export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
