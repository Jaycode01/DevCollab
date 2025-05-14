"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../auth/config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/images/devcollab-logo.png";
import Link from "next/link";
import ArrowRight from ".././../../public/arrow-right.svg";
import Notification from "../../../public/notification.svg";
import Bars from "../../../public/bars.svg";
import Cancel from "../../../public/cancel.svg";
import UserIcon from "../../../public/user.svg";
import DashboardIcon from "../../../public/dashboard.svg";
import ProjectsIcon from "../../../public/projects.svg";
import TasksIcon from "../../../public/tasks.svg";
import TeamIcon from "../../../public/team.svg";
import DocsIcon from "../../../public/docs.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const router = useRouter();
  const handleSignUpPageClick = () => {
    router.push("/getstarted");
  };

  const handleBackHomeClick = () => {
    router.push("/");
  };
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
              onClick={handleBackHomeClick}
            />
            {user && (
              <div
                className={`capitalize flex flex-col md:flex-row gap-[50px] top-20 absolute z-10 md:static mx-auto md:mx-0 w-full md:w-fit bg-gray-50 md:bg-white text-center md:text-left
                 transition-all duration-300 ease-in-out md:overflow-visible py-5 md:py-0 shadow-sm md:shadow-none
                 ${
                   menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                 } md:max-h-full md:opacity-100`}
              >
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 mx-auto md:hover:border-blue-600 md:hover:border-b-2 px-2 text-sm md:text-[1rem] md:hover:bg-white md:hover:rounded-none hover:bg-gray-100 rounded-sm md:py-2"
                >
                  <Image
                    alt="Dashboard Icon"
                    src={DashboardIcon}
                    width={22}
                    height={22}
                  />
                  dashboard
                </Link>
                <Link
                  href="/projects"
                  className=" flex items-center gap-2 mx-auto md:hover:border-blue-600  text-sm md:text-[1rem] md:hover:border-b-2 px-2 md:hover:bg-white md:hover:rounded-none hover:bg-gray-100 rounded-sm md:py-2"
                >
                  <Image
                    alt="Projects Icon"
                    src={ProjectsIcon}
                    width={22}
                    height={22}
                  />
                  projects
                </Link>
                <Link
                  href="/tasks"
                  className="flex items-center gap-2 mx-auto md:hover:border-blue-600  text-sm md:text-[1rem] md:hover:border-b-2 px-2 md:hover:bg-white md:hover:rounded-none hover:bg-gray-100 rounded-sm md:py-2"
                >
                  <Image
                    alt="Tasks Icon"
                    src={TasksIcon}
                    width={22}
                    height={22}
                  />
                  tasks
                </Link>
                <Link
                  href="/team"
                  className="flex items-center gap-2 mx-auto md:hover:border-blue-600  text-sm md:text-[1rem] md:hover:border-b-2 px-2 md:hover:bg-white md:hover:rounded-none hover:bg-gray-100 rounded-sm md:py-2"
                >
                  <Image
                    alt="Team Icon"
                    src={TeamIcon}
                    width={22}
                    height={22}
                  />
                  team
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-2 mx-auto md:hover:border-blue-600  text-sm md:text-[1rem] md:hover:border-b-2 px-2 md:hover:bg-white md:hover:rounded-none hover:bg-gray-100 rounded-sm md:py-2"
                >
                  <Image
                    alt="Docs Icon"
                    src={DocsIcon}
                    width={22}
                    height={22}
                  />
                  docs
                </Link>
              </div>
            )}
          </div>
        </nav>
        <div className="flex min-w-fit items-center gap-2 md:gap-5 mr-4 md:mr-7 ">
          <button
            type="button"
            className="cursor-pointer hover:bg-gray-50 p-3 rounded-sm"
          >
            <Image
              alt="Notification bell Icon"
              src={Notification}
              width={23}
              height={23}
            />
          </button>

          {!user && (
            <button
              type="button"
              className="bg-blue-600 md:flex items-center gap-2 text-white py-3.5 px-5 cursor-pointer rounded-sm hidden "
              onClick={handleSignUpPageClick}
            >
              Get Started
              <Image
                alt="getting started button"
                src={ArrowRight}
                width={20}
                height={20}
              />
            </button>
          )}

          <button
            type="button"
            className="block md:hidden hover:bg-gray-50 p-2 rounded-sm cursor-pointer"
          >
            <Image
              alt="User Icon for Settings and Getting Started"
              src={UserIcon}
              width={23}
              height={23}
              onClick={handleSignUpPageClick}
            />
          </button>
          <button
            type="button"
            className="md:hidden block cursor-pointer"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            <Image
              src={menuOpen ? Cancel : Bars}
              alt="Hamburger Menu "
              width={25}
              height={25}
            />
          </button>
        </div>
      </div>
    </>
  );
}
