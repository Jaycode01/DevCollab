"use client";

import { getAuth } from "firebase/auth";
import Image from "next/image";
import { Dot } from "lucide-react";
import placeHolder from "../../../public/images/placeholder-image.png";
import { useState, useEffect } from "react";

type AppUser = {
  id: string;
  name: string;
  role: string;
  status: string;
  image: string | null;
};

export default function Team() {
  const [users, setusers] = useState<AppUser[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(
        `${API_BASE}/api/teams/random-app-users?userUid=${user.uid}`
      );
      const data = await res.json();
      setusers(data.appUsers || []);
      setloading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-4 aspect-square border rounded-sm shadow-md flex flex-col gap-5">
      <h3 className="text-[20px]mb-5 capitalize">People you may know</h3>

      {loading ? (
        <p className="text-sm text-gray-500">Loading team members...</p>
      ) : users.length === 0 ? (
        <p className="text-sm text-gray-500">No users found.</p>
      ) : (
        users.map((user) => (
          <div
            className="flex gap-3 items-center bg-white shadow-md p-2 rounded border transition-transform duration-300 hover:scale-105"
            key={user.id}
          >
            <div className="">
              <Image
                src={user.image || placeHolder}
                alt={user.name}
                width={70}
                height={70}
                className="border shadow rounded-full p-2"
              />
            </div>
            <div className="">
              <p className="text">{user.name}</p>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-gray-500">{user.role}</p>
                <Dot />
                <p className="text-[12px]">{user.status}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
