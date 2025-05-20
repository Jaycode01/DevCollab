"use client";

import { useState, useEffect } from "react";
import FakePic from "../../../public/images/fakeUserPic.jpg";
import Image from "next/image";
import GitHub from "../../../public/github.svg";
import LinkedIn from "../../../public/linkedin.svg";
import Twitter from "../../../public/twitter.svg";
import Globe from "../../../public/globe.svg";
import Settings from "../../../public/settings.svg";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/config";
import { app } from "../auth/config";
import LocalTime from "../components/local-time";
import UserLocation from "../components/user-location";

type CustomUser = {
  name: string;
  email: string | null;
  photo: string | null;
  uid: string;
  tel?: string;
  bio?: string;
};

export default function UsersProfile() {
  const [user, setUser] = useState<CustomUser | null>(null);

  const userImage = user?.photo ? user.photo : FakePic;

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        setUser({
          name:
            userData.name && userData.name.trim() !== ""
              ? userData.name
              : `${userData.firstName ?? ""} ${
                  userData.lastName ?? ""
                }`.trim() ||
                firebaseUser.displayName ||
                "Guest User",
          email: firebaseUser.email,
          photo: firebaseUser.photoURL ?? null,
          uid: firebaseUser.uid,
          tel: userData.tel ?? "",
          bio: userData.bio ?? "",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditProfileBtn = () => {};
  return (
    <div className="">
      <div className="flex flex-col gap-7 w-11/12 md:w-1/2 mx-auto mt-7 border p-5 rounded-md">
        <Link
          href="/"
          className="flex items-center justify-end gap-1 text-sm hover:text-blue-600 text-gray-900"
        >
          <Image src={Settings} alt="settings icon" />
          <span className="">Settings</span>
        </Link>
        <div className="flex gap-5 items-center border justify-center py-3 rounded px-2">
          <Image
            src={userImage}
            alt="user pic"
            width={250}
            height={250}
            className="md:w-[250px] w-[170px] md:h-[250px] h-[170px] rounded-full relative"
          />
          <div className="">
            <p className="text-[20px]">{user?.name || "Guest User"}</p>
            <p className="text-[14px]">{user?.email || "Not logged in"}</p>
            <p className="text-gray-500 text-[12px] md:text-[14px]">
              {user?.tel || "No Phone Yet"}
            </p>
            <Link href="/edit-profile">
              <button
                type="button"
                onClick={handleEditProfileBtn}
                className="py-2  px-4 bg-blue-600 text-sm text-white rounded mt-3"
              >
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        <div className=" flex flex-col gap-2.5 border rounded p-4">
          <p className="text-sm">{user?.bio || "No bio yet"}</p>
          <LocalTime />
          <UserLocation />
          <ul className="flex flex-col gap-4 text-sm mt-5">
            <li className="">
              <Link href="/" className="flex items-center gap-1.5">
                <Image src={GitHub} alt="github" />
                GitHub
              </Link>
            </li>
            <li className="">
              <Link href="/" className="flex items-center gap-1.5">
                <Image src={LinkedIn} alt="globe" />
                LinkedIn
              </Link>
            </li>
            <li className="">
              <Link href="/" className="flex items-center gap-1.5">
                <Image src={Twitter} alt="globe" />
                Twitter/X
              </Link>
            </li>
            <li className="">
              <Link href="/ " className="flex items-center gap-1.5">
                <Image src={Globe} alt="globe" />
                Portfolio
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
