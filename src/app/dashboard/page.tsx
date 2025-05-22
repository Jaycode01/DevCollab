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
import { useRouter } from "next/navigation";

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
  teamMembers: number;
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found in localStorage");
          router.push("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/src/app/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          cache: "no-store",
        });

        if (!res.ok) {
          console.log("Fetch error, status:", res.status);
          const errorData = await res.json();
          console.log("Error message:", errorData.message);

          if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
          }

          throw new Error(errorData.message || "Failed to fetc dasboard data");
        }

        const data = await res.json();
        console.log("Dashboard data received:", data);
        setDashboardData(data.dashboard);
      } catch (error) {
        console.error("Fetch failed:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();

    const refreshInterval = setInterval(() => {
      fetchDashboard();
    }, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [router]);

  const retryLoading = () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  return (
    <>
      <div className="bg-gray-50 relative min-h-screen">
        <TaskPopup
          isOpen={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
        />
        <h1 className="capitalize md:text-[30px] sm:text-[25px] text-[22px] p-4">
          Welcome!
        </h1>

        {/* Dashboard stats */}
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
              {isLoading ? (
                <p className="text-gray-900 text-[20px] animate-pulse">
                  Loading...
                </p>
              ) : error ? (
                <p className="text-red-500 text-sm">Error loading data</p>
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
                <p className="text-gray-900 text-[20px] animate-pulse">
                  Loading...
                </p>
              ) : error ? (
                <p className="text-red-500 text-sm">Error loading data</p>
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
                <p className="text-gray-900 text-[20px] animate-pulse">
                  Loading...
                </p>
              ) : error ? (
                <p className="text-red-500 text-sm">Error loading data</p>
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
                <p className="text-gray-900 text-[20px] animate-pulse">
                  Loading...
                </p>
              ) : error ? (
                <p className="text-red-500 text-sm">Error loading data</p>
              ) : (
                <p className="text-gray-900 text-[20px]">
                  {dashboardData?.teamMembers || 0}
                </p>
              )}
              <p className="text-gray-400 text-sm">Team Members</p>
            </div>
          </div>
        </div>

        {/* Error message and retry button */}
        {error && (
          <div className="mx-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 mb-2">{error}</p>
            <button
              onClick={retryLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

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
