"use client";

import { useState, useMemo } from "react";
import Search from "../../../public/search.svg";
import AddIcon from "../../../public/add.svg";
import ProjectTestImage from "../../../public/square-3-stack.svg";
import Avatar from "../../../public/images/fakeUserPic.png";
import Link from "next/link";
import Dots from "../../../public/dots.svg";
import Image from "next/image";
import { projects } from "../../lib/projectsData";

export default function Projects() {
  const [sortOption, setSortOption] = useState("a-z");

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
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
          new Date(b.createdAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
      return 0;
    });
  }, [sortOption]);

  return (
    <div className="w-full bg-gray-50 pb-5 min-h-screen">
      <div className="mt-5 flex md:flex-row flex-col justify-between items-center border-b-2 border-gray-900 py-3 w-full md:px-5 px-2 gap-3.5 md:gap-0 bg-white">
        <div className="md:w-3/5 w-full flex flex-row md:gap-3 gap-2 items-center">
          <input
            type="search"
            className="border border-gray-900 p-4 w-full text-sm outline-none"
          />
          <button
            type="button"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-sm text-white py-3.5 px-7  flex-row gap-2 "
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
            className=" py-4 px-2 bg-gray-100 outline-none border border-gray-900 text-sm"
          >
            <option value="a-z">A - Z</option>
            <option value="date created">Date Created</option>
            <option value="last updated">Last Updated</option>
          </select>
          <button
            type="button"
            className="inline-flex bg-blue-600 py-3.5 px-5 items-center gap-2 text-sm text-white"
          >
            Add New <Image src={AddIcon} alt="add icon" />{" "}
          </button>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className=" bg-white border border-gray-900 rounded-md p-4 shadow-lg flex flex-col gap-3 cursor-pointer hover:scale-98 transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={ProjectTestImage}
                  alt="project image"
                  width={60}
                  height={60}
                  className="border-2 border-gray-900 rounded-md p-2"
                />
                <div className="">
                  <p className="text-[17px]">{project.name}</p>
                  <Link
                    href={project.url}
                    target="_blank"
                    className="text-[14px] text-blue-600 hover:border-b  border-blue-600"
                  >
                    {project.url}
                  </Link>
                </div>
              </div>
              <button type="button" className="">
                <Image src={Dots} alt="project action icon" />
              </button>
            </div>
            <div className="flex relative">
              <Image
                src={Avatar}
                alt="collaborator image"
                width={30}
                height={30}
                className="absolute left-0 top-0 border border-gray-900 rounded-full"
              />
              <Image
                src={Avatar}
                alt="collaborator image"
                width={30}
                height={30}
                className="absolute left-5 top-0 border border-gray-900 rounded-full"
              />
              <Image
                src={Avatar}
                alt="collaborator image"
                width={30}
                height={30}
                className="absolute left-10 top-0 border border-gray-900 rounded-full"
              />
              <Image
                src={Avatar}
                alt="collaborator image"
                width={30}
                height={30}
                className="absolute left-15 top-0 border border-gray-900 rounded-full"
              />
              <Image
                src={Avatar}
                alt="collaborator image"
                width={30}
                height={30}
                className="absolute left-20 top-0 border border-gray-900 rounded-full"
              />
            </div>
            <p className="mt-6 text-sm text-gray-900">{project.updatedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
