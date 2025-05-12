"use client";

import Image from "next/image";
import Logo from "../../../public/images/devcollab-logo.png";
import Link from "next/link";
import ArrowRight from ".././../../public/arrow-right.svg";
import Notification from "../../../public/notification.svg";
import Bars from "../../../public/bars.svg";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between w-full flex-row bg-white shadow-md items-center  py-3">
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
          <div className="flex items-center gap-8 w-full md:w-auto">
            <Image
              alt="DevCollab Logo"
              src={Logo}
              width={55}
              height={55}
              className="ml-4 md:ml-7"
            />
            <div className="capitalize flex flex-col md:flex-row gap-[50px] top-20 absolute z-10 md:static mx-auto md:mx-0 w-full md:w-fit  bg-gray-50 md:bg-white text-center md:text-le\ py-5 md:py-0">
              <Link href="/dashboard">dashboard</Link>
              <Link href="/projects">projects</Link>
              <Link href="/tasks">tasks</Link>
              <Link href="/team">team</Link>
              <Link href="/docs">docs</Link>
              <div className="block md:hidden">
                <button type="button">Get Started</button>
                <button type="button">Sign In</button>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex min-w-fit items-center gap-2.5 md:gap-5 mr-4 md:mr-7 ">
          <button
            type="button"
            className="cursor-pointer hover:bg-gray-50 p-3 rounded-sm"
          >
            <Image
              alt="Notification bell Icon"
              src={Notification}
              width={25}
              height={25}
            />
          </button>
          <button
            type="button"
            className="bg-blue-600 md:flex items-center gap-2 text-white py-3.5 px-5 cursor-pointer rounded-sm hidden "
          >
            Get Started
            <Image
              alt="getting started button"
              src={ArrowRight}
              width={20}
              height={20}
            />
          </button>
          <button type="button" className="md:hidden block cursor-pointer">
            <Image src={Bars} alt="Hamburger Menu " width={25} height={25} />
          </button>
        </div>
      </div>
    </>
  );
}
