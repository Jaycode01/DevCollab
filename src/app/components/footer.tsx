import Image from "next/image";
import Logo from "../../../public/images/devcollab-logo.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gray-500 py-5 flex justify-center items-start text-sm text-white w-full md:gap-[5%] gap-7 px-3">
      <div className="flex flex-col gap-4 w-1/4">
        <Image
          alt="decollab logo"
          src={Logo}
          width={80}
          height={80}
          className="bg-white rounded-xl"
        />
        <p className="text-white">
          Build, Collabprate, and Ship fast your project with your team using
          devcollab today.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-gray-900 font-bold md:text-lg">Quick Links</h3>
        <div className="flex flex-col gap-1.5">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-gray-900 md:text-lg font-bold">Resources</h3>
        <div className="flex flex-col gap-1.5">
          <Link href="">Community</Link>
          <Link href="">Developers</Link>
          <Link href="">Guides</Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-gray-900 md:text-lg font-bold">Socials</h3>
        <div className="flex flex-col gap-1.5">
          <Link href="">Twitter(X)</Link>
          <Link href="">LinkedIn</Link>
          <Link href="">GitHub</Link>
          <Link href="">YouTube</Link>
          <Link href="">Thread</Link>
          <Link href="">Instagram</Link>
          <Link href="">TikTok</Link>
        </div>
      </div>
    </div>
  );
}
