"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TotalProjects from "../../../public/total-projects.svg";
import PendingTasks from "../../../public/pending-tasks.svg";
import CompletedTasks from "../../../public/completed-tasks.svg";
import TeamMembers from "../../../public/team-members.svg";
import ProjectsSummary from "../components/projectsSummary";
import HoursLogged from "../components/hours-logges";
import TasksAndActivity from "../components/tasks-and-activity";
import TaskPopup from "../components/task-popup";
import TeamAndNotifications from "../components/team,notifications-and-stats";
import TotalHourLogged from "../../../public/flame.svg";
import { useRouter } from "next/navigation";
import { getIdToken } from "firebase/auth";
import { auth } from "../auth/config";

type Project = {
  id: number;
  name: string;
  update: string;
  due: string;
  status: string;
};

type DashboardData = {
  totalProjects: number;
  pendingTasks: number;
  completedTasks: number;
  totalTeams: number;
  totalHoursLogged: number;
};

type UserData = {
  firstName: string;
  lastName: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setuserData] = useState<UserData | null>(null);
  const [totalHours, settotalHours] = useState<number | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || " http://localhost:5000";

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(`${API_BASE}/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            "Server returned non-JSON response. Check your backend server."
          );
        }

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
          }
          throw new Error(errorData.message || `Server error: ${res.status}`);
        }

        const data = await res.json();
        setDashboardData(data.dashboard);
      } catch (error) {
        if (
          error instanceof TypeError &&
          error.message.includes("Failed to fetch")
        ) {
          setError(
            "Cannot connect to backnd, ensure you have a good network connection. "
          );
        } else {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load dashboard data"
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [router, API_BASE]);

  const retryLoading = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_BASE}/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server returned non-JSON response. Check your backend server."
        );
      }

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setDashboardData(data.dashboard);
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        setError(
          "Cannot connect to backend server. Please ensure your network connection is stable"
        );
      } else {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        setuserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  useEffect(() => {
    const fetchTotalHours = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const token = await getIdToken(user);

      const res = await fetch(`${API_BASE}/api/total-hours`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Total hours response:", data);

      const hours = typeof data.hours === "number" ? data.hours : 0;
      const minutes = typeof data.minutes === "number" ? data.minutes : 0;

      const totalMinutes = hours * 60 + minutes;
      const decimalHours = (totalMinutes / 60).toFixed(1);
      settotalHours(Number(decimalHours));
    };

    fetchTotalHours();
  }, [API_BASE]);

  return (
    <>
      <div className="bg-gray-50 relative min-h-screen">
        <TaskPopup
          isOpen={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
        />

        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="capitalize md:text-[30px] sm:text-[25px] text-[22px]">
            Welcome, {userData?.firstName || "User"}!
          </h1>
        </div>

        {/* Error message and retry button */}
        {error && (
          <div className="mx-4 mb-4 py-4 px-2 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 mb-2 text-sm">{error}</p>
            <button
              onClick={retryLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Dashboard stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
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
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-12 mb-1"></div>
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm">--</p>
              ) : (
                <p className="text-gray-900 text-[20px]">
                  {dashboardData?.totalProjects || 0}
                </p>
              )}
              <p className="text-gray-400 text-sm">Total Projects</p>
            </div>
          </div>
          {/* Second box of the grid */}
          <div className="bg-white shadow-md p-3 rounded-md flex items-center gap-3">
            <div className="bg-purple-200 w-fit p-3.5 rounded-full">
              <Image
                src={PendingTasks || "/placeholder.svg"}
                alt="pending tasks icon"
                width={30}
                height={30}
              />
            </div>
            <div className="">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-12 mb-1"></div>
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm">--</p>
              ) : (
                <p className="text-gray-900 text-[20px]">
                  {dashboardData?.pendingTasks || 0}
                </p>
              )}
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
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-12 mb-1"></div>
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm">--</p>
              ) : (
                <p className="text-gray-900 text-[20px]">
                  {dashboardData?.completedTasks || 0}
                </p>
              )}
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
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-12 mb-1"></div>
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm">--</p>
              ) : (
                <p className="text-gray-900 text-[20px]">
                  {dashboardData?.totalTeams || 0}
                </p>
              )}
              <p className="text-gray-400 text-sm">Total Teams</p>
            </div>
          </div>
          <div className="bg-white shadow-md p-3 rounded-md flex flex-row items-center gap-3 sm:w-[100%]">
            <div className="bg-green-200 w-fit p-3.5 rounded-full">
              <Image
                src={TotalHourLogged || "placeholder.svg"}
                alt="total hours logged"
                width={30}
                height={30}
              />
            </div>
            <div className="">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h6 bg-gray-300 rounded w-12 mb-1"></div>
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm">--</p>
              ) : (
                <p className="text-gray-900 text-[20px]">
                  {totalHours !== null ? `${totalHours}` : "--"}
                </p>
              )}
              <p className="text-gray-400 text-sm">Total Hours Logged</p>
            </div>
          </div>
        </div>

        {/* Second section of the dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 mt-5">
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-4 w-full">
            <ProjectsSummary
              onProjectClick={(project) => {
                setSelectedProject(project);
                openModal();
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 bg-white shadow rounded-md w-full p-4">
            <HoursLogged />
          </div>
        </div>
        {/* Third Section on the dashbaord page */}
        <TasksAndActivity />
        {/* Fourth section of the dashboard page */}
        <div className="">
          <TeamAndNotifications />
        </div>
      </div>
    </>
  );
}
