"use client";

import { useState } from "react";
import Image from "next/image";
import AngleRight from "../../../public/angle-right.svg";
import playSmooth from "../../../public/play-smooth.svg";
import User from "../../../public/user.svg";
import { useRouter } from "next/navigation";

export default function Docs() {
  const [isOpen, setisOpen] = useState(false);

  const router = useRouter();

  const startedOnclick = () => {
    router.push("/profile");
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
    </>
  );
}
