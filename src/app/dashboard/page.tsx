"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TotalProjects from "../../../public/total-projects.svg";
import PendingTasks from "../../../public/pending-tasks.svg";
import CompletedTasks from "../../../public/completed-tasks.svg";
import TeamMembers from "../../../public/team-members.svg";
import ProjectsSummary from "../components/projectsSummary";
import HoursLogged from "../components/hours-logges";

interface UserProfile {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  username: string;
  photoURL?: string | null;
  provider: string;
  createdAt: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isClient, setIsClient] = useState(false);

  // This ensures we only access localStorage on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run this effect on the client side
    if (!isClient) return;

    try {
      // Add debugging to see what's happening
      console.log("Checking localStorage...");

      // Check if localStorage is available
      if (typeof window !== "undefined" && window.localStorage) {
        console.log("localStorage is available");

        const storedUserData = localStorage.getItem("userData");
        console.log("Raw localStorage data:", storedUserData);

        if (storedUserData) {
          try {
            const userData = JSON.parse(storedUserData) as UserProfile;
            console.log("Parsed user data:", userData);
            setUser(userData);
          } catch (err) {
            console.error("Error parsing stored user data:", err);
          }
        } else {
          console.log("No user data found in localStorage");
        }
      } else {
        console.log("localStorage is not available");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [isClient]);

  return (
    <>
      <div className="bg-gray-50">
        {/* Debug section at the top */}
        <div className="p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded">
          <h2 className="font-bold">Debug Info:</h2>
          <p>Client-side rendering: {isClient ? "Yes" : "No"}</p>
          <p>User data loaded: {user ? "Yes" : "No"}</p>
          <p>First name: {user?.firstName || "Not available"}</p>
          <p>User ID: {user?.uid || "Not available"}</p>
        </div>

        <h1 className="capitalize md:text-[30px] sm:text-[25px] text-[22px] p-4">
          Welcome, {user?.firstName || "Guest"}!
        </h1>

        {/* Rest of your dashboard UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {/* First box of the grid */}
          <div className="bg-white shadow-md p-3 rounded-md flex flex-row items-center gap-3">
            <div className="bg-blue-200 p-3.5 rounded-full w-fit">
              <Image
                src={TotalProjects || "/placeholder.svg"}
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
                src={PendingTasks || "/placeholder.svg"}
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
                src={CompletedTasks || "/placeholder.svg"}
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
                src={TeamMembers || "/placeholder.svg"}
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
