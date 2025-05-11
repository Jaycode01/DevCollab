"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/devcollab-logo.png";
import ProjectsLogo from "../../../public/projects.svg";
import Hamburger from "../../../public/hamburger.svg";
import TasksLogo from "../../../public/tasks.svg";
import Team from "../../../public/team.svg";
import DashboardIcon from "../../../public/dashboard.svg";
import ArrowRight from "../../../public/arrow-right.svg";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-50">
        <nav className="flex justify-between mx-auto items-center gap-32 py-4 w-4/5 bg-transparent">
          <div className="bg-white">
            <Link href="/">
              <Image alt="DevCollab Logo" src={Logo} width={80} height={80} />
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <Image src={Hamburger} alt="Hamburger" width={25} height={25} />
            </button>
          </div>
          <div
            className={`flex gap-28 capitalize text-gray-900 font-medium md:flex space-x-6 ${
              isOpen ? "block" : "hidden"
            } md:block`}
          >
            <Link
              href="/dashboard"
              className="capitalize flex items-center gap-2 hover:border-b-2 border-blue-600 py-2.5 px-1.5"
            >
              <Image
                src={DashboardIcon}
                alt="Dashboard Icon"
                width={25}
                height={25}
              />
              dashboard
            </Link>
            <Link
              href="/projects"
              className="capitalize flex items-center gap-2 hover:border-b-2 border-blue-600 py-2.5 px-1.5"
            >
              <Image
                src={ProjectsLogo}
                alt="Projects Icon"
                width={25}
                height={25}
              />
              projects
            </Link>
            <Link
              href="/tasks"
              className="capitalize flex items-center gap-2 hover:border-b-2 border-blue-600 py-2.5 px-1.5"
            >
              <Image src={TasksLogo} alt="Tasks Icon" width={25} height={25} />
              tasks
            </Link>
            <Link
              href="/team"
              className="capitalize flex items-center gap-2 hover:border-b-2 border-blue-600 py-2.5 px-1.5"
            >
              <Image src={Team} alt="Team Icon" width={25} height={25} />
              team
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="bg-blue-600 text-white text-sm py-4 px-10 capitalize cursor-pointer flex items-center gap-1.5"
            >
              get started
              <Image
                src={ArrowRight}
                alt="Arrow icon for getting strted button"
                width={23}
                height={23}
              />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
