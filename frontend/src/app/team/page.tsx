"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Dots from "../../../public/dots.svg";
import AddIcon from "../../../public/add.svg";
import OpenPanel from "../../../public/open-panel.svg";
import ClosePanel from "../../../public/close-panel.svg";

export default function Team() {
  const [activeMenu, setactiveMenu] = useState<string | null>(null);
  const [sidebarOpen, setsidebarOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const teams = ["Frontend Team", "Backend Team", "Design Team"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setactiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex bg-gray-50 border-t relative">
        <div
          className={`fixed md:relative top-0 leftf-0 h-full z-30 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-[70%] md:w-[12%] border-r bg-white flex flex-col gap-5 p-3`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px]">Teams</h2>
            <button type="button" onClick={() => setsidebarOpen(false)}>
              <Image src={ClosePanel} width={20} height={20} alt="close icon" />
            </button>
          </div>
          <div className="">
            {teams.map((team) => (
              <div
                key={team}
                className="flex justify-between items-center hover:bg-gray-50 p-2 rounded hover:order hover:text-blue-600 relative"
              >
                <button type="button" className="text-sm">
                  {team}
                </button>
                <div className="">
                  <button
                    type="button"
                    onClick={() =>
                      setactiveMenu((prev) => (prev === team ? null : team))
                    }
                  >
                    <Image
                      src={Dots}
                      width={25}
                      height={25}
                      alt="dots"
                      className="pt-2.5"
                    />
                  </button>

                  {activeMenu === team && (
                    <ul className="bg-white text-gray-900 hover:text-gray-900 absolute top-[45px] w-full border shadow left-0 text-sm px-2 py-1 z-20">
                      <li className="border-gray-900 hover:border-b w-fit">
                        Edit
                      </li>
                      <li className="border-red-600 hover:border-b text-red-600 w-fit">
                        Delete
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="text-[13px] w-full  mt-[30px] bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
          >
            Create New Team
          </button>
        </div>
        {!sidebarOpen && (
          <button
            type="button"
            onClick={() => setsidebarOpen(true)}
            className="fixed top-3 left-3 z-40 md:hidden bg-white border p-2 rounded shadow"
          >
            <Image
              src={OpenPanel}
              width={20}
              height={20}
              alt="open panel icon"
            />
          </button>
        )}
        <section className="md:w-[88%] w-full ml-0 md:ml-0">
          <div className="flex justify-between items-center bg-white w-full px-5 h-[75px]">
            <div>
              <h1 className="text-[25px]">Frontend Team</h1>
            </div>
            <div className="w-[60%]">
              <input
                type="search"
                name="searchTeamMember"
                id="searchTeamMember"
                placeholder="search team member by name..."
                className="border outline-none border-gray-900 w-full bg-white p-3 text-gray-900 text-[12px] lowercase"
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
