"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Dots from "../../../public/dots.svg";
import AddIcon from "../../../public/add.svg";
import OpenPanel from "../../../public/open-panel.svg";
import ClosePanel from "../../../public/close-panel.svg";

export default function Team() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const teams = ["Frontend Team", "Backend Team", "Design Team"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex bg-gray-50 border-t relative min-h-screen">
        <div
          className={`fixed top-0 left-0 h-full z-30 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-[70%] md:w-[300px] border-r bg-white flex flex-col gap-5 p-3`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px]">Teams</h2>
            <button type="button" onClick={() => setSidebarOpen(false)}>
              <Image src={ClosePanel} width={20} height={20} alt="close icon" />
            </button>
          </div>

          <div className="flex-1">
            {teams.map((team) => (
              <div
                key={team}
                className="flex justify-between items-center hover:bg-gray-50 p-2 rounded hover:border hover:cursor-pointer hover:text-blue-600 relative"
              >
                <button type="button" className="text-sm">
                  {team}
                </button>
                <div ref={menuRef} className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMenu((prev) => (prev === team ? null : team))
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
                    <ul className="bg-white text-gray-900 hover:text-gray-900 absolute left-[-135spx]  w-40 top-[45px] border shadow text-sm px-2 py-1 z-20">
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
            className="text-[13px] w-full mt-[30px] bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
          >
            Create New Team
          </button>
        </div>

        {!sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="fixed top-3 left-3 z-40 bg-white border p-2 rounded shadow"
          >
            <Image
              src={OpenPanel}
              width={20}
              height={20}
              alt="open panel icon"
            />
          </button>
        )}

        <section className="flex-1 md:flex-row flex-col flex  justify-start md:justify-between px-5 py-3 md:items-center items-stretch h-fit">
          <h1 className="text-[25px]">Team Name</h1>
          <div className="flex h-fit gap-3 md:flex-row flex-col">
            <input
              type="search"
              name="searchTeamMember"
              id="searchTeamMember"
              placeholder="search team member..."
              className="outline-none border border-gray-900 p-2.5  text-sm w-full md:w-[350px]"
            />
            <button
              type="button"
              className="flex items-center bg-blue-600 text-sm text-white px-3 py-3 w-fit"
            >
              Add New Member <Image src={AddIcon} alt="add icon" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
