import { Space_Grotesk, Didact_Gothic, Montserrat } from "next/font/google";

export const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-spaceGrosek",
});

export const didact_gothic = Didact_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-spaceGrosek",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-montserrat",
});

export default function fonts() {
  return;
}
