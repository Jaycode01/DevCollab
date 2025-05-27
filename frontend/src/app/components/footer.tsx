import Image from "next/image";
import Logo from "../../../public/images/devcollab-logo.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gray-500 py-5 flex flex-col md:flex-row justify-center items-start text-sm text-white w-full md:gap-[5%] gap-7 px-3">
      <div className="flex flex-col gap-4 md:w-1/4 w-full">
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
          <Link className=" text-[12px] md:text-sm" href="/about">
            About
          </Link>
          <Link className=" text-[12px] md:text-sm" href="/contact">
            Contact
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-gray-900 md:text-lg font-bold">Resources</h3>
        <div className="flex flex-col gap-1.5">
          <Link className=" text-[12px] md:text-sm" href="">
            Community
          </Link>
          <Link className=" text-[12px] md:text-sm" href="">
            Developers
          </Link>
          <Link className=" text-[12px] md:text-sm" href="">
            Guides
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-gray-900 md:text-lg font-bold">Socials</h3>
        <div className="flex flex-col gap-1.5">
          <Link className=" text-[12px] md:text-sm" href="">
            Twitter(X)
          </Link>
          <Link className=" text-[12px] md:text-sm" href="">
            LinkedIn
          </Link>
          <Link className="text-[12px] md:text-sm" href="">
            GitHub
          </Link>
          <Link className="text-[12px] md:text-sm" href="">
            YouTube
          </Link>
          <Link className="text-[12px] md:text-sm" href="">
            Thread
          </Link>
          <Link className="text-[12px] md:text-sm" href="">
            Instagram
          </Link>
          <Link className="text-[12px] md:text-sm" href="">
            TikTok
          </Link>
        </div>
      </div>
    </div>
  );
}
