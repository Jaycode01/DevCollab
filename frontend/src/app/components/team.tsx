"use client";

import Image from "next/image";
import { Dot } from "lucide-react";
import placeHolder from "../../../public/images/placeholder-image.jpg";

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Zach Latta",
      image: "../../../public/images/placeholder-image.jpg",
      role: "Team Manager",
      status: "online",
    },
    {
      id: 2,
      name: "Joseph Lamidi",
      Image: "../../../public/images/placeholder-image.jpg",
      role: "Frontend Developer",
      status: "away",
    },
    {
      id: 3,
      name: "Abdullahi Olaiwon",
      Image: "../../../public/images/placeholder-image.jpg",
      role: "Backend Developer",
      status: "offline",
    },
    {
      id: 4,
      name: "Don Oliver",
      Image: "../../../public/images/placeholder-image.jpg",
      role: "UI designer",
      status: "online",
    },
    {
      id: 5,
      name: "Peter Pan",
      Image: "../../../public/images/placeholder-image.jpg",
      role: "Project Manager",
      status: "busy",
    },
  ];

  return (
    <div className="bg-white p-4 aspect-square border rounded-sm shadow-md flex flex-col gap-5">
      <h3 className="text-[20px]mb-5">Team</h3>
      {teamMembers.map((teamMember) => (
        <div
          className="flex gap-3 items-center bg-white shadow-md p-2 rounded border transition-transform duration-300 hover:scale-105"
          key={teamMember.id}
        >
          <div className="">
            <Image
              src={placeHolder}
              alt={teamMember.name}
              width={70}
              height={70}
              className="border shadow rounded-full p-2"
            />
          </div>
          <div className="">
            <p className="text">{teamMember.name}</p>
            <div className="flex gap-1 items-center">
              <p className="text-sm text-gray-500">{teamMember.role}</p>
              <Dot />
              <p className="text-[12px]">{teamMember.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
