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

type Member = {
  uid: string;
  name: string;
  email: string;
  role: string;
  photoURL?: string | null;
};

export default function Team() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showCreateModal, setshowCreateModal] = useState(false);
  const [teams, setteams] = useState<Team[]>([]);
  const [selectedTeamId, setselectedTeamId] = useState<null | string>(null);
  const [showAddMemberModal, setshowAddMemberModal] = useState<null | string>(
    null
  );
  const [members, setmembers] = useState<Member[]>([]);
  const [searchQuery, setsearchQuery] = useState("");

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

  const fetchTeamMembers = async (teamId: string) => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_BASE}/api/teams/${teamId}/members`);
      const data = await res.json();

      if (res.ok) {
        console.log("Members:", data.members);
        setmembers(data.members || []);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  const handleRemoveMember = async (uid: string) => {
    if (!selectedTeamId) {
      alert("No team selected");
      return;
    }

    const confirm = window.confirm(
      "Are you sure you want to remove this member?"
    );
    if (!confirm) return;

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(
        `${API_BASE}/api/teams/${selectedTeamId}/remove-member`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to remove member");
      } else {
        alert("Member removed successfully.");
        fetchTeams();
        fetchTeamMembers(selectedTeamId);
      }
    } catch (err) {
      console.error("Error removing member:", err);
      alert("Something went wrong");
    }
  };

  const selectedTeam = teams.find((team) => team.id === selectedTeamId);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <AddTeamMemberModal
              teamId={showAddMemberModal}
              onSuccess={() => {
                setshowAddMemberModal(null);
                setselectedTeamId(null);
                fetchTeams();
              }}
              onClose={() => {
                setshowAddMemberModal(null);
                setselectedTeamId(null);
              }}
            />
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
                  <button
                    type="button"
                    className={`text-sm ${
                      selectedTeamId === team.id
                        ? "text-blue-600 font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      setselectedTeamId(team.id);
                      fetchTeamMembers(team.id);
                      setActiveMenu(null);
                    }}
                  >
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
                        <li
                          className="hover:underline text-blue-600 text-sm cursor-pointer"
                          onClick={() => {
                            setselectedTeamId(team.id);
                            setshowAddMemberModal(team.id);
                            setActiveMenu(null);
                          }}
                        >
                          Add Member
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
            <h1 className="text-[25px]">
              {selectedTeam ? selectedTeam.name : "Select a Team"}
            </h1>
            <div className="flex h-fit gap-3 md:flex-row flex-col">
              <input
                type="search"
                name="searchTeamMember"
                id="searchTeamMember"
                placeholder="search team member..."
                value={searchQuery}
                onChange={(e) => setsearchQuery(e.target.value)}
                className="outline-none border border-gray-900 p-2.5  text-sm w-full md:w-[350px]"
              />
              <button
                type="button"
                onClick={() => {
                  if (!selectedTeamId) {
                    alert("Please select a team first.");
                    return;
                  }
                  setshowAddMemberModal(selectedTeamId);
                }}
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
                  <th className="px-4 py-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-4 text-gray-500 text-sm"
                    >
                      No members found.
                    </td>
                  </tr>
                )}
                {filteredMembers.map((member) => (
                  <tr
                    className="hover:bg-gray-50 transition-colors border-last:border-0"
                    key={`${member.uid}-${member.email}`}
                  >
                    <td className="px-4 y-3">
                      <Image
                        src={member.photoURL || User}
                        alt="user"
                        className="rounded-full w-8 h-8 object-cover"
                        width={32}
                        height={32}
                      />
                    </td>
                    <td className="px- py-3">{member.name}</td>
                    <td className="px-4 py-3">{member.role}</td>
                    <td className="px-4 py-3 text-blue-600 underline cursor-pointer">
                      {member.email}
                    </td>
                    <td className="px-4 py-3 text-blue-600 space-x-2 cursor-pointer">
                      <span>View</span>
                      {member.role.toLowerCase() !== "admin" ? (
                        <>
                          /{" "}
                          <span
                            onClick={() => handleRemoveMember(member.uid)}
                            className="text-red-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400 ml-2">(Admin)</span>
                      )}
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
