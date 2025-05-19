"use client";

import Link from "next/link";
import Image from "next/image";
import Online from "../../../public/online.svg";
import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../auth/config";

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

  const handleogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="absolute top-14 right-0 mt-2 w-64 bg-white shadow-md rounded-md p-4 z-50">
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/profile"
            className="capitalize text-[13px] underline text-gray-90 hover:text-blue-600"
          >
            view profile
          </Link>
          <button
            type="button"
            onClick={handleogout}
            className="text-sm text-red-600 hoveer:border-b border-red-600"
          >
            Log out
          </button>
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
