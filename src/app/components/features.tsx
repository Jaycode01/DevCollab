import { didact_gothic, montserrat } from "./fonts";
import Image from "next/image";
import TeamCollabortion from "../../../public/team-collaboration.svg";
import SmartDashboard from "../../../public/smart-dashboard.svg";
import ProjectsOrganization from "../../../public/projects-organization.svg";
import TaskManagement from "../../../public/task-management.svg";

export default function Features() {
  return (
    <>
      <div className=" mx-auto w-11/12 mt-20  ">
        <div className="flex flex-col gap-2.5 ,d:w-1/3 w-full">
          <h1
            className={`${montserrat.className} font-bold md:text-3xl text-2xl`}
          >
            Collaborate and Build with DevCollab
          </h1>
          <p
            className={`${didact_gothic.className} font-bold md:text-lg text-[15px] `}
          >
            Make your projects more organized and track progress on all your
            projects with your team.
          </p>
        </div>
        <div className="flex flex-col md:flex-row itmes-center justify-between gap-8 md:gap-10 md:w-11/12  w-full mx-auto mt-9 ">
          <div className="h-fit md:py-4 py-2  flex-1 aspect-square md:px-5 px-3 bg-gray-50 flex flex-col md:gap-7 gap-3">
            <Image
              alt="Team Collaboration Image"
              src={TeamCollabortion}
              width={150}
              height={150}
            />
            <h2 className="text-lg">Team Collaboration</h2>
            <p className="text-[12px] md:text-sm">
              Work better together, wherever you are. Collaborate in real-time
              with task-based commenting, user mentions, and shared project
              spaces. Empower your team to stay aligned, provide updates, and
              contribute ideas — all within DevCollab.
            </p>
          </div>
          <div className="h-fit md:py-4 py-2  flex-1 aspect-square md:px-5 px-3 bg-gray-50 flex flex-col md:gap-7 gap-3">
            <Image
              src={SmartDashboard}
              alt="Smart Dashboard feature image"
              width={150}
              height={150}
            />
            <h2 className="text-lg">Smart Dashboard</h2>
            <p className="text-[12px] md:text-sm">
              Make smarter decisions with real-time overviews. Your personalized
              dashboard gives you instant visibility into your team workload,
              upcoming deadlines, task status, and overall project health.
              Understand whats happening — and what needs your attention.
            </p>
          </div>
          <div className="h-fit md:py-4 py-2  flex-1 aspect-square md:px-5 px-3 bg-gray-50 flex flex-col md:gap-7 gap-3">
            <Image
              src={ProjectsOrganization}
              alt="Project organization feature image"
              width={150}
              height={150}
            />
            <h2 className="text-lg">Projects Organization</h2>
            <p className="text-[12px] md:text-sm">
              Structure your work with clarity. Group related tasks under
              dedicated projects, set key milestones, and break down large goals
              into manageable steps. With clean project dashboards, everything
              your team needs stays in one place — visible and under control.
            </p>
          </div>
          <div className="h-fit md:py-4 py-2  flex-1 aspect-square md:px-5 px-3 bg-gray-50 flex flex-col md:gap-7 gap-3">
            <Image
              alt="Tasks management Feature image"
              src={TaskManagement}
              width={150}
              height={150}
            />
            <h2 className="text-lg">Tasks Management</h2>
            <p className="text-[12px] md:text-sm">
              Keep your team organized and accountable with DevCollab’s
              intuitive task manager. Easily create tasks, assign them to
              teammates, set deadlines, and track progress from start to finish.
              Use statuses, priorities, and labels to streamline your workflow —
              whether you are managing bugs, features, or sprints.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
