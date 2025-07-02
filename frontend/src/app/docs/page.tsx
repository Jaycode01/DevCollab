"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import AngleRight from "../../../public/angle-right.svg";
import playSmooth from "../../../public/play-smooth.svg";
import User from "../../../public/user.svg";
import AngleDown from "../../../public/angle-down.svg";
import AngleUp from "../../../public/angle-up.svg";
import TotalProjectDoc from "../../../public/images/total-projects-doc.jpeg";
import PendingTasksDoc from "../../../public/images/pending-tasks-doc.jpeg";
import CompletedTasksDoc from "../../../public/images/completed-tasks-doc.png";
import TotalTeamsDoc from "../../../public/images/total-teams-docs.png";
import TotalHoursLogged from "../../../public/images/total-hours-logged-doc.png";
import ProjectSummaryDoc from "../../../public/images/projects-summary-doc.png";
import LoggedTimeDoc from "../../../public/images/logged-time-doc.png";
import RecentTasksDoc from "../../../public/images/recent-task-doc.png";
import ActivitiesFeedDoc from "../../../public/images/activities-feed.png";
import MayKnowDoc from "../../../public/images/may-know-people.png";
import NotificationDoc from "../../../public/images/notification-doc.png";
import CalendarDoc from "../../../public/images/calendar-doc.png";

export default function Docs() {
  const [openBox, setOpenBox] = useState<string | null>(null);

  const router = useRouter();

  const startedOnclick = () => {
    router.push("/profile");
  };

  const toggleBox = (boxId: string) => {
    setOpenBox((prev) => (prev === boxId ? null : boxId));
  };
  return (
    <>
      <div className="pt-5 md:pt-10 px-[7%] flex md:flex-row gap-5 md:gap-0 flex-col w-full justify-between border-b border-gray-500 pb-5 md:pb-10">
        <div className="flex gap-1.5 md:gap-3 items-center w-full md:w-[40%]">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] md:text-[30px]">
              DevCollab Documentation
            </h1>
            <p className="text-[14px] md:text-[16px]">
              Learn how to use devcollab and understand all features in it for
              ease use through tutorials and platform resources.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border p-7 rounded-sm">
          <div className="flex items-center gap-1.5">
            <button className="bg-blue-200 p-2 border border-blue-400 rounded">
              <Image
                src={playSmooth}
                alt="get started icon"
                className="bg-inherit"
              />
            </button>
            <h2 className="text-[25px]">Getting Started</h2>
          </div>
          <p className="">Setup and understand devcollab for collaboration.</p>
          <button
            onClick={startedOnclick}
            className="flex text-[15px] flex-row items-center gap-2 py-2 px-4 border text-gray-700 rounded-3xl mr-3 hover:border-blue-400"
          >
            <Image src={User} alt="user" />
            Start by setting up profile
            <Image src={AngleRight} alt="angle right" />
          </button>
        </div>
      </div>
      <div className="mt-5 p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {" "}
        <div className="border p-5 rounded-sm mb-5">
          <div
            onClick={() => toggleBox("dashboard")}
            className="flex justify-between items-center cursor-pointer"
          >
            <h2 className="text-[22px] font-semibold">Dashboard</h2>
            <Image
              src={openBox === "dashboard" ? AngleUp : AngleDown}
              alt="toggle chevron"
              width={20}
              height={20}
            />
          </div>

          <p className="text-sm text-gray-600 mt-1 flex flex-col gap-1">
            <span>Your whole workspace, simplified and summarized.</span>
            <span>Track stuff, manage things, and stay on top of it all.</span>
          </p>

          {openBox === "dashboard" && (
            <div className="mt-4 text-sm text-gray-800 space-y-2 transition-all duration-300">
              <div className="border p-2.5 rounded">
                <Image src={TotalProjectDoc} alt="total project doc image" />
                <p className="">
                  The <em>total project</em> count box shows the number of
                  projects you have created on the webapp(for a specific
                  user/account)
                </p>
                <p>
                  It is also where all your projects and progress go live. With
                  a clear count of what {`you've`} built.
                </p>
              </div>
              <div className="border p-2.5 rounded">
                <Image src={PendingTasksDoc} alt="pending tasks doc image" />
                <p className="">
                  The <em>pending tasks</em> box shows the number of projects{" "}
                  {`you're`} still working on(Todo).
                </p>
                <p className="">
                  It’s where all your to-dos and reminders stay, with everything
                  waiting for your action.
                </p>
              </div>
              <div className="border p-2.5 rounded">
                <Image
                  src={CompletedTasksDoc}
                  alt="completed tasks doc image"
                />
                <p className="">
                  This box shows all tasks(projects) {`you've`} worked on and
                  done with it, but can make changes if ther is anything to
                  update.
                </p>
                <p>
                  It’s where all your closed tasks and completed goals live,
                  with every tick counting.
                </p>
              </div>
              <div className="border p-2.5 rounded">
                <Image src={TotalTeamsDoc} alt="total teams doc image" />
                <p>
                  This box of summary shows the number of teams {`you're`}{" "}
                  invited to, created teams and also teams other users added you
                  directly.
                </p>
                <p>
                  Gives you a quick overview of how many active teams {`you’re`}
                  part of across the platform, it help you track collaboration
                  at a glance.
                </p>
              </div>
              <div className="border rounded p-2.5">
                <Image
                  src={TotalHoursLogged}
                  alt="total hours logged doc image"
                />
                <p>
                  THis box shows the calculated total hours(time) {`you've`}{" "}
                  logged on the webapp which will also inspire you to spend more
                  time collaborating with others.
                </p>
                <p>
                  Displays the total time you’ve spent working across all
                  projects and tasks.
                </p>
              </div>
              <div className="border p-2.5 rounded">
                <Image
                  src={ProjectSummaryDoc}
                  alt="project summary doc image"
                />
                <p>
                  Summarizes key details of your projects so you can stay
                  focused and on track.
                </p>
                <br />
                <p>
                  This section/box shows <em>quick details</em> about all
                  projects {`you've`} created. The details it shows about
                  project are:
                </p>
                <ul>
                  <li>- Id(The first three characters).</li>
                  <li>- The project name.</li>
                  <li>- The date the project was created.</li>
                  <li>- The date it was last updated.</li>
                  <li>
                    - When clicked on, it show a few more details about the
                    project.
                  </li>
                </ul>
                <p>
                  You want to create one?{" "}
                  <Link href="/add-project" className="text-blue-600 underline">
                    Try out...
                  </Link>
                </p>
              </div>
              <div className="border rounded p-2.5">
                <Image src={LoggedTimeDoc} alt="logged time doc image" />
                <p>
                  This section shows your logegd time, weekly streak and hours
                  spent/day.
                </p>
                <p>
                  The number + fire icon is where your weekly streak will
                  display. The progress bar increases {`it's`} color as your
                  h=logged time increases and when it get to higher by higher
                  level the color of the progress bar changes to other type of
                  color.
                </p>
              </div>
              <div className="border rounded p-2.5">
                <Image src={RecentTasksDoc} alt="recent task doc image" />
                <p>
                  This <em>recent tasks</em> section shows the top 6 recent
                  tasks both the one you are asigned to... and the ones you
                  created for your personal purpose.
                </p>
                <p>
                  What each project shows in the <em>recent tasks</em> section
                  are:
                </p>
                <ul>
                  <li>- Project Name</li>
                  <li>
                    - An indicator which shows if task is{" "}
                    {`"personal" or for "team"`}
                  </li>
                  <li>- Task due date</li>
                  <li>- Users assigned to the tasks.</li>
                </ul>
              </div>
              <div className="border rounded p-2.5">
                <Image
                  src={ActivitiesFeedDoc}
                  alt="activities feed doc image"
                />
                <p>
                  The <em>activities feed</em> section shows few activities
                  carried out on the webapp as a whole. it will show the
                  activity and also the user name who carried out the activity.
                </p>
                <p>
                  Check it out...{" "}
                  <Link href="/dashboard" className="text-blue-600 underline">
                    here
                  </Link>
                </p>
              </div>
              <div className="border rounded p-2.5">
                <Image src={MayKnowDoc} alt="people-you-may-know doc image" />
                <p>
                  This section contains random users info to also now about
                  users who also use the web application.
                  <br />
                  What this section include:
                </p>
                <ul>
                  <li>- User name (Firstname and Lastname)</li>
                  <li>- Status (either {`"online" or "offline"`})</li>
                  <li>- User role on the webapp</li>
                </ul>
              </div>
              <div className="border p-2.5 rounded">
                <Image src={NotificationDoc} alt="notification doc image" />
                <p>
                  This <em>notification</em> section show the notification for
                  user(you).
                  <br />
                  Notifications which this section can include or display are:
                </p>
                <ul>
                  <li>- Notification concerning task assignment.</li>
                  <li>
                    - Notification about project (creation, edit, deletion).
                  </li>
                  <li>- Notification about time logged.</li>
                  <li>
                    - Notification about tasks (updated, edit info, creation,
                    deletion).
                  </li>
                  <li>
                    - Notification about teams (creation, addition, invitation,
                    edit, deletion).
                  </li>
                </ul>
              </div>
              <div className="rounded border p-2.5">
                <Image src={CalendarDoc} alt="calender doc image" />
                <p>
                  This section show a calender of the current date(day, month,
                  year) we are, which will help you check dates of tasks which
                  will due soon instead of gettting to use other application to
                  chek out the dates.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="border p-5 rounded-sm mb-5">
          <div
            onClick={() => setOpenBox("projects")}
            className="flex justify-between items-center cursor-pointer"
          >
            <h2 className="text-[22px] font-semibold">Projects</h2>
            <Image
              src={openBox === "projects" ? AngleUp : AngleDown}
              alt="toggle chevron"
              width={20}
              height={20}
            />
          </div>

          <p className="text-sm text-gray-600 mt-1 flex flex-col gap-1">
            <span>Start something new or pick up where you left off.</span>
            <span>Your workspace for building cool stuff.</span>
          </p>

          {openBox === "projects" && (
            <div className="mt-4 text-sm text-gray-800 space-y-2 transition-all duration-300"></div>
          )}
        </div>
        <div className="border p-5 rounded-sm mb-5">
          <div
            onClick={() => setOpenBox("teams")}
            className="flex justify-between items-center cursor-pointer"
          >
            <h2 className="text-[22px] font-semibold">Teams</h2>
            <Image
              src={openBox === "teams" ? AngleUp : AngleDown}
              alt="toggle chevron"
              width={20}
              height={20}
            />
          </div>

          <p className="text-sm text-gray-600 mt-1 flex flex-col gap-1">
            <span>Bring people together and get things done.</span>
            <span>Because great things happen when you work together.</span>
          </p>

          {openBox === "tasks" && (
            <div className="mt-4 text-sm text-gray-800 space-y-2 transition-all duration-300"></div>
          )}
        </div>
        <div className="border p-5 rounded-sm mb-5">
          <div
            onClick={() => setOpenBox("tasks")}
            className="flex justify-between items-center cursor-pointer"
          >
            <h2 className="text-[22px] font-semibold">Tasks</h2>
            <Image
              src={openBox === "tasks" ? AngleUp : AngleDown}
              alt="toggle chevron"
              width={20}
              height={20}
            />
          </div>

          <p className="text-sm text-gray-600 mt-1 flex flex-col gap-1">
            <span>Plan it. Do it. Done.</span>
            <span>All your to-dos, totally under control.</span>
          </p>

          {openBox === "tasks" && (
            <div className="mt-4 text-sm text-gray-800 space-y-2 transition-all duration-300"></div>
          )}
        </div>
      </div>
    </>
  );
}
