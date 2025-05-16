"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import type { User } from "firebase/auth";
import ProjectsSummary from "../components/projectsSummary";
import HoursLogged from "../components/hours-logges";
// Import Firebase app instance
import { getApp, getApps, initializeApp } from "firebase/app";

interface Props {
  user: User;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

// Your Firebase config - make sure this is defined
const firebaseConfig = {
  // Your Firebase config should be here
  // If it's not defined here, make sure it's imported from somewhere else
};

// Initialize Firebase if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export default function Dashboard({ user }: Props) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(app);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
          const displayName = user.displayName || "";
          const names = displayName.trim().split(" ");
          setUserData({
            firstName: names[0] || "",
            lastName: names.length > 1 ? names[1] : "",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        // Fallback to Auth data on error
        if (user.displayName) {
          const names = user.displayName.trim().split(" ");
          setUserData({
            firstName: names[0] || "",
            lastName: names.length > 1 ? names[1] : "",
            email: user.email || "",
          });
        } else if (user.email) {
          setUserData({
            firstName: user.email.split("@")[0],
            email: user.email,
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  // Use multiple fallbacks for the name
  const displayingName =
    userData?.firstName ||
    (user?.displayName ? user.displayName.split(" ")[0] : "") ||
    (user?.email ? user.email.split("@")[0] : "") ||
    "Guest";

  return (
    <>
      <div className="bg-gray-50">
        <h1 className="capitalize md:text-[30px] sm:text-[25px] text-[22px] p-4">
          Welcome, {loading ? "Loading..." : displayingName}!
        </h1>

        {/* Rest of your dashboard UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {/* First box of the grid */}
          <div className="bg-white shadow-md p-3 rounded-md flex flex-row items-center gap-3">
            <div className="bg-blue-200 p-3.5 rounded-full w-fit">
              <Image
                src="/total-projects.svg"
                alt="total projects icon"
                width={30}
                height={30}
              />
            </div>
            <div className="">
              <p className="text-gray-900 text-[20px]">1,201</p>
              <p className="text-gray-400 text-sm">Total Projects</p>
            </div>
          </div>
          {/* Second box of the grid */}
          <div className="bg-white shadow-md p-3 rounded-md  flex items-center gap-3">
            <div className="bg-purple-200 w-fit p-3.5 rounded-full">
              <Image
                src="/pending-tasks.svg"
                alt="pending tasks icon"
                width={30}
                height={30}
              />
            </div>
            <div className="">
              <p className="text-gray-900 text-[20px]">602</p>
              <p className="text-gray-400 text-sm">Pending Tasks</p>
            </div>
          </div>
          {/* Third box of the grid */}
          <div className="bg-white shadow-md p-3 rounded-md flex flex-row items-center gap-3">
            <div className="bg-orange-100 p-3.5 rounded-full w-fit">
              <Image
                src="/completed-tasks.svg"
                alt="completed tasks icon"
                width={30}
                height={30}
              />
            </div>
            <div className="">
              <p className="text-gray-900 text-[20px]">23</p>
              <p className="text-gray-400 text-sm">Completed Tasks</p>
            </div>
          </div>
          {/* Fourth box of the grid */}
          <div className="bg-white shadow-md p-3 rounded-md flex flex-row items-center gap-3">
            <div className="bg-red-200 w-fit p-3.5 rounded-full">
              <Image
                src="/team-members.svg"
                alt="team members icon"
                width={30}
                height={30}
              />
            </div>
            <div className="">
              <p className="text-gray-900 text-[20px]">7</p>
              <p className="text-gray-400 text-sm">Team Members</p>
            </div>
          </div>
        </div>

        {/* Second section of the dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 mt-5">
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-4 w-full">
            <ProjectsSummary />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 bg-white shadow rounded-md w-full p-4">
            <HoursLogged />
          </div>
        </div>
      </div>
    </>
  );
}
