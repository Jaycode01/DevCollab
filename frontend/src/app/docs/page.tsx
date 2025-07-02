"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import AngleRight from "../../../public/angle-right.svg";
import playSmooth from "../../../public/play-smooth.svg";
import User from "../../../public/user.svg";
import AngleDown from "../../../public/angle-down.svg";
import AngleUp from "../../../public/angle-up.svg";

export default function Docs() {
  const [openBox, setOpenBox] = useState<string | null>(null);

  const router = useRouter();

  const startedOnclick = () => {
    router.push("/profile");
  };

  const toggleBox = (boxId: string) => {
    setOpenBox((prev) => (prev === boxId ? null : boxId));
  };
  return (
    <>
      <div className="pt-5 md:pt-10 px-[7%] flex md:flex-row gap-5 md:gap-0 flex-col w-full justify-between border-b border-gray-500 pb-5 md:pb-10">
        <div className="flex gap-1.5 md:gap-3 items-center w-full md:w-[40%]">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] md:text-[30px]">
              DevCollab Documentation
            </h1>
            <p className="text-[14px] md:text-[16px]">
              Learn how to use devcollab and understand all features in it for
              ease use through tutorials and platform resources.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border p-7 rounded-sm">
          <div className="flex items-center gap-1.5">
            <button className="bg-blue-200 p-2 border border-blue-400 rounded">
              <Image
                src={playSmooth}
                alt="get started icon"
                className="bg-inherit"
              />
            </button>
            <h2 className="text-[25px]">Getting Started</h2>
          </div>
          <p className="">Setup and understand devcollab for collaboration.</p>
          <button
            onClick={startedOnclick}
            className="flex text-[15px] flex-row items-center gap-2 py-2 px-4 border text-gray-700 rounded-3xl mr-3 hover:border-blue-400"
          >
            <Image src={User} alt="user" />
            Start by setting up profile
            <Image src={AngleRight} alt="angle right" />
          </button>
        </div>
      </div>
      <div className="mt-5 p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {" "}
        <div className="border p-5 rounded-sm mb-5">
          <div
            onClick={() => toggleBox("dashboard")}
            className="flex justify-between items-center cursor-pointer"
          >
            <h2 className="text-[22px] font-semibold">Dashboard</h2>
            <Image
              src={openBox === "dashboard" ? AngleUp : AngleDown}
              alt="toggle chevron"
              width={20}
              height={20}
            />
          </div>

          <p className="text-sm text-gray-600 mt-1 flex flex-col gap-1">
            <span>Your whole workspace, simplified and summarized.</span>
            <span>Track stuff, manage things, and stay on top of it all.</span>
          </p>

          {openBox === "dashboard" && (
            <div className="mt-4 text-sm text-gray-800 space-y-2 transition-all duration-300"></div>
          )}
        </div>
        <div className="border p-5 rounded-sm mb-5">
          <div
            onClick={() => setOpenBox("projects")}
            className="flex justify-between items-center cursor-pointer"
          >
            <h2 className="text-[22px] font-semibold">Projects</h2>
            <Image
              src={openBox === "projects" ? AngleUp : AngleDown}
              alt="toggle chevron"
              width={20}
              height={20}
            />
          </div>

          <p className="text-sm text-gray-600 mt-1 flex flex-col gap-1">
            <span>Start something new or pick up where you left off.</span>
            <span>Your workspace for building cool stuff.</span>
          </p>

          {openBox === "projects" && (
            <div className="mt-4 text-sm text-gray-800 space-y-2 transition-all duration-300"></div>
          )}
        </div>
        <div className="border p-5 rounded-sm mb-5">
          <div
            onClick={() => setOpenBox("teams")}
            className="flex justify-between items-center cursor-pointer"
          >
            <h2 className="text-[22px] font-semibold">Teams</h2>
            <Image
              src={openBox === "teams" ? AngleUp : AngleDown}
              alt="toggle chevron"
              width={20}
              height={20}
            />
          </div>

          <p className="text-sm text-gray-600 mt-1 flex flex-col gap-1">
            <span>Bring people together and get things done.</span>
            <span>Because great things happen when you work together.</span>
          </p>

          {openBox === "tasks" && (
            <div className="mt-4 text-sm text-gray-800 space-y-2 transition-all duration-300"></div>
          )}
        </div>
        <div className="border p-5 rounded-sm mb-5">
          <div
            onClick={() => setOpenBox("tasks")}
            className="flex justify-between items-center cursor-pointer"
          >
            <h2 className="text-[22px] font-semibold">Tasks</h2>
            <Image
              src={openBox === "tasks" ? AngleUp : AngleDown}
              alt="toggle chevron"
              width={20}
              height={20}
            />
          </div>

          <p className="text-sm text-gray-600 mt-1 flex flex-col gap-1">
            <span>Plan it. Do it. Done.</span>
            <span>All your to-dos, totally under control.</span>
          </p>

          {openBox === "tasks" && (
            <div className="mt-4 text-sm text-gray-800 space-y-2 transition-all duration-300"></div>
          )}
        </div>
      </div>
    </>
  );
}
