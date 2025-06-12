"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Dots from "../../../public/dots.svg";
import AddIcon from "../../../public/add.svg";
import OpenPanel from "../../../public/open-panel.svg";
import ClosePanel from "../../../public/close-panel.svg";
import User from "../../../public/user.svg";
import CreateTeamModal from "../components/createTeamModal";
import AddTeamMemberModal from "../components/addTeamMemberModal";

type Team = {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt?: string;
  members?: { uid: string; role: string }[];
};

export default function Team() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showCreateModal, setshowCreateModal] = useState(false);
  const [teams, setteams] = useState<Team[]>([]);
  const [showAddMemberModal, setshowAddMemberModal] = useState(false);

  const fetchTeams = async () => {
    const userDataString = localStorage.getItem("userData");
    const userUid = userDataString ? JSON.parse(userDataString)?.uid : null;

    if (!userUid) return;

    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${API_BASE}/api/teams?userUid=${userUid}`);
      const data = await res.json();

      setteams(data.teams || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();

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
        {showCreateModal && (
          <div className=" p-5 fixed top-[25%] left-[25%] w-1/2 bg-white border shadow-md z-50">
            <CreateTeamModal
              onSuccess={() => {
                setshowCreateModal(false);
                fetchTeams();
              }}
              onClose={() => setshowCreateModal(false)}
            />
          </div>
        )}
        {showAddMemberModal && (
          <div className="bg-white border shadow-md z-30 p-5 fixed top-[25%] left-[25%] w-1/2">
            <AddTeamMemberModal onClose={() => setshowAddMemberModal(false)} />
          </div>
        )}
        <div
          className={`fixed top-0 left-0 h-full z-30 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-[70%] md:w-[300px] border-r bg-white flex flex-col gap-5 p-3 shadow-md`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px]">Teams</h2>
            <button type="button" onClick={() => setSidebarOpen(false)}>
              <Image src={ClosePanel} width={20} height={20} alt="close icon" />
            </button>
          </div>

          <div className="flex-1">
            {teams.length === 0 ? (
              <p className="text-sm text-gray-500">No teams created yet.</p>
            ) : (
              teams.map((team) => (
                <div
                  key={team.id}
                  className="flex justify-between items-center hover:bg-gray-50 p-2 rounded hover:border hover:cursor-pointer hover:text-blue-600 relative"
                >
                  <button type="button" className="text-sm">
                    {team.name}
                  </button>
                  <div ref={menuRef} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu((prev) =>
                          prev === team.id ? null : team.id
                        )
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

                    {activeMenu === team.id && (
                      <ul className="bg-white text-gray-900 hover:text-gray-900 absolute left-[-135px]  w-40 top-[45px] border shadow text-sm px-2 py-1 z-20 flex flex-col gap-1.5">
                        <li className="border-gray-900 hover:border-b w-fit">
                          Edit
                        </li>
                        <li className="border-gray-900 hover:border-b w-fit">
                          Info
                        </li>
                        <li className="border-red-600 hover:border-b text-red-600 w-fit">
                          Delete
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            type="button"
            onClick={() => setshowCreateModal(true)}
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

        <section className="flex-1 w-full max-w-full overflow-x-auto">
          <div className="md:flex-row flex-col flex  justify-start md:justify-between px-5 py-3 md:items-center items-stretch h-fit">
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
                onClick={() => setshowAddMemberModal(true)}
                className="flex items-center bg-blue-600 text-sm text-white px-3 py-3 w-fit"
              >
                Add New Member <Image src={AddIcon} alt="add icon" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto mt-5">
            <table className="min-w-full bg-white border border-gray-200 rounded shadow text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3 border-b">Avatar</th>
                  <th className="px-4 py-3 border-b">Name</th>
                  <th className="px-4 py-3 border-b">Role</th>
                  <th className="px-4 py-3 border-b">Email</th>
                  <th className="px-4 py-3 border-b">Status</th>
                  <th className="px-4 py-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Mark Zuckerberg",
                    role: "Frontend Dev",
                    email: "zuckerberg@mark.com",
                    status: "online",
                    statusColor: "bg-green-500",
                  },
                  {
                    name: "Alice Smith",
                    role: "Product Mgr",
                    email: "alice@company.com",
                    status: "away",
                    statusColor: "bg-orange-500",
                  },
                  {
                    name: "Kelvin Okafor",
                    role: "Backend Dev",
                    email: "kelvin@kaf.com",
                    status: "offline",
                    statusColor: "bg-red-500",
                  },
                  {
                    name: "Joseph Lamidi",
                    role: "Product Designer",
                    email: "jay@designs.com",
                    status: "online",
                    statusColor: "bg-green-500",
                  },
                  {
                    name: "Abdullahi Olaiwon",
                    role: "Frontend Dev",
                    email: "olaiwon@404.com",
                    status: "away",
                    statusColor: "bg-orange-500",
                  },
                  {
                    name: "David Lamidi",
                    role: "Photographer",
                    email: "dave@visuals.com",
                    status: "onine",
                    statusColor: "bg-green-500",
                  },
                ].map((member, index) => (
                  <tr
                    className="hover:bg-gray-50 transition-colors border- lat:border-0"
                    key={index}
                  >
                    <td className="px-4 y-3">
                      <Image
                        src={User}
                        alt="user"
                        className="rounded-full w-8 h-8"
                      />
                    </td>
                    <td className="px- py-3">{member.name}</td>
                    <td className="px-4 py-3">{member.role}</td>
                    <td className="px-4 py-3 text-blue-600 underline cursor-pointer">
                      {member.email}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${member.statusColor}`}
                      ></span>
                      <span>{member.status}</span>
                    </td>
                    <td className="px-4 py-3 text-blue-600 space-x-2 cursor-pointer">
                      <span>View</span>/ <span>Remove</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
