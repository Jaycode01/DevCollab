"use client";

import { useState } from "react";
import Image from "next/image";
import Dots from "../../../public/dots.svg";
import AddIcon from "../../../public/add.svg";

export default function Team() {
  const [show, setshow] = useState(false);

  return (
    <>
      <div className="flex bg-gray-50 border-t">
        <section className="w-[12%] border-r  h-[100vh] flex flex-col gap-5 p-3 bg-white">
          <h2 className="text-[20px]">Teams</h2>
          <div className="">
            <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded hover:border hover:cursor-pointer hover:text-blue-600 relative">
              <button type="button" className="text-sm">
                Frontend Team
              </button>
              <button
                className="relative"
                type="button"
                onClick={() => setshow(!show)}
              >
                <Image src={Dots} width={25} height={25} alt="dots" />
              </button>
              {show && (
                <ul className="bg-white text-gray-900  hover:text-gray-900 absolute top-[45px] w-full border shadow left-0 text-sm px-2 py-1">
                  <li className="border-gray-900 hover:border-b w-fit">Edit</li>
                  <li className="border-red-600 hover:border-b text-red-600 w-fit">
                    Delete
                  </li>
                </ul>
              )}
            </div>
            <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded hover:border hover:cursor-pointer hover:text-blue-600">
              <button type="button" className="text-sm">
                Backend Team
              </button>
              <button className="" type="button">
                <Image src={Dots} width={25} height={25} alt="dots" />
              </button>
            </div>
            <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded hover:border hover:cursor-pointer hover:text-blue-600">
              <button type="button" className="text-sm">
                Design Team
              </button>
              <button className="" type="button">
                <Image src={Dots} width={25} height={25} alt="dots" />
              </button>
            </div>
          </div>
        </section>
        <section className="w-[88%]">
          <div className="flex justify-between items-center bg-white w-full px-5 h-[75px]">
            <div>
              <h1 className="text-[25px]">Frontend Team</h1>
            </div>
            <div className="w-[60%]">
              <input
                type="search"
                name="searchTeamMember"
                id="searchTeamMember"
                className="border outline-none border-gray-900 w-full bg-white p-3 text-gray-900 text-[12px]"
              />
            </div>
            <div className="">
              <button
                type="button"
                className="bg-blue-600 flex items-center gap-2 p-3.5 text-white text-sm"
              >
                Add New Member{" "}
                <Image src={AddIcon} width={20} height={20} alt="add icon" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
