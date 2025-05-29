"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Search from "../../../public/search.svg";
import AddIcon from "../../../public/add.svg";
import ProjectTestImage from "../../../public/square-3-stack.svg";
import Avatar from "../../../public/images/fakeUserPic.png";
import Link from "next/link";
import Dots from "../../../public/dots.svg";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import AddProject from "../components/add-project";

interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  collaborators?: string[];
}

export default function Projects() {
  const [sortOption, setSortOption] = useState("a-z");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Memoize fetchProjects to avoid useEffect warnings
  const fetchProjects = useCallback(async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.warn("No user is currently logged in.");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch(`${API_BASE}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch projects.");

      setProjects(data.projects ?? []);
    } catch (error) {
      console.error("Fetch projects error:", error);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortOption === "a-z") {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === "date created") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortOption === "last updated") {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
      return 0;
    });
  }, [sortOption, searchQuery, projects]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 pb-5 min-h-screen relative">
      {showAddProjectModal && (
        <AddProject
          onClose={() => setShowAddProjectModal(false)}
          onProjectAdded={fetchProjects}
        />
      )}
      <div className="mt-5 flex md:flex-row flex-col justify-between items-center border-b-2 border-gray-900 py-3 w-full md:px-5 px-2 gap-3.5 md:gap-0 bg-white">
        <div className="md:w-3/5 w-full flex flex-row md:gap-3 gap-2 items-center">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="border border-gray-900 p-4 w-full text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => {}}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-sm text-white py-3.5 px-7 gap-2"
          >
            Search
            <Image src={Search} alt="search icon" />
          </button>
        </div>
        <div className="flex flex-row items-center gap-5 w-full md:w-auto">
          <select
            name="sort projects"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="py-4 px-2 bg-gray-100 outline-none border border-gray-900 text-sm"
          >
            <option value="a-z">A - Z</option>
            <option value="date created">Date Created</option>
            <option value="last updated">Last Updated</option>
          </select>
          <button
            type="button"
            onClick={() => setShowAddProjectModal(true)}
            className="inline-flex bg-blue-600 py-3.5 px-5 items-center gap-2 text-sm text-white"
          >
            Add New <Image src={AddIcon} alt="add icon" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
        {filteredAndSortedProjects.length === 0 ? (
          <p className="col-span-full text-center text-gray-700 mt-10">
            No projects found.
          </p>
        ) : (
          filteredAndSortedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-900 rounded-md p-4 shadow-lg flex flex-col gap-3 cursor-pointer hover:scale-98 transition-all duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={project.imageUrl || ProjectTestImage}
                    alt="project image"
                    width={60}
                    height={60}
                    className="border-2 border-gray-900 rounded-md p-2"
                    unoptimized
                  />
                  <div>
                    <p className="text-[17px]">{project.name}</p>
                    <Link
                      href={project.url}
                      target="_blank"
                      className="text-[14px] text-blue-600 hover:border-b border-blue-600"
                    >
                      {project.url}
                    </Link>
                  </div>
                </div>
                <div className="relative" ref={menuRef}>
                  <button type="button" className="z-20">
                    <Image
                      src={Dots}
                      alt="project action icon"
                      onClick={() =>
                        setMenuOpen((prev) =>
                          prev === project.id ? null : project.id
                        )
                      }
                    />
                  </button>

                  {menuOpen === project.id && (
                    <ul className="absolute bg-white right-0 mt-2 shadow-xl rounded-md border border-gray-300 py-2.5 px-5 w-64 text-sm z-30">
                      <li className="hover:border-b w-fit border-gray-700">
                        <Link href="#">Edit</Link>
                      </li>
                      <li className="text-red-600 hover:border-b w-fit border-red-600">
                        <Link href="#">Delete</Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex relative h-[30px]">
                {[0, 5, 10, 15, 20].map((left, i) => (
                  <Image
                    key={i}
                    src={Avatar}
                    alt="collaborator"
                    width={30}
                    height={30}
                    style={{
                      position: "absolute",
                      left: `${left}px`,
                      top: 0,
                      border: "1px solid #1F2937",
                      borderRadius: "9999px",
                    }}
                  />
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-900">{project.updatedAt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
