"use client";

// import Link from "next/link";
import { User } from "firebase/auth";
import Image from "next/image";
// import cancelBox from "../../../public/cancel.svg";

interface Props {
  user: User;
}

export default function UserQuickBox({ user }: Props) {
  return (
    <>
      <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-md rounded-md p-4 z-50">
        <div className="flex items-center gap-3">
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col text-sm">
            <span className="font-semibold">
              {user.displayName || "No Name"}
            </span>
            <span className="text-gray-700">{user.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}
