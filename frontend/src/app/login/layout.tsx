import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Login page for former users to logint o theor profile and continue from where they stop...",
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
