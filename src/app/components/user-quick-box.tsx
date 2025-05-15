"use client";

import Link from "next/link";
import { User } from "firebase/auth";
import Image from "next/image";
import Online from "../../../public/online.svg";

interface Props {
  user: User;
}

export default function UserQuickBox({ user }: Props) {
  const getInitials = () => {
    if (!user.displayName) return "NN";
    const names = user.displayName.trim().split(" ");
    const firstInitial = names[0]?.[0] || "";
    const lastInitial = names[1]?.[0] || "";
    return (firstInitial + lastInitial).toUpperCase();
  };
  return (
    <>
      <div className="absolute top-14 right-0 mt-2 w-64 bg-white shadow-md rounded-md p-4 z-50">
        <div className="mb-5">
          <Link
            href="/user-profile"
            className="capitalize text-[13px] underline text-gray-90 hover:text-blue-600"
          >
            view profile
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full text-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {getInitials()}
            </div>
          )}
          <div className="flex flex-col text-sm">
            <span className="font-semibold">
              {user.displayName || "No Name"}
            </span>
            <span className="text-gray-700 flex items-center  text-sm">
              <Image src={Online} alt="Online Icon" width={50} height={50} />
              Online
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
