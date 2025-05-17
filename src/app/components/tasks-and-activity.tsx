"use client";
import { useState } from "react";

type TriggerModalProps = {
  onTrigger: () => void;
};

export default function TasksAndActivity({ onTrigger }: TriggerModalProps) {
  const [sorting, setSorting] = useState<string>("");

  const taskCards = [
    {
      id: 1,
      name: "Project Title",
      assignee: "Zach",
      date: "01/06",
      tag: "design",
    },
    {
      id: 2,
      name: "Project Title",
      assignee: "Thomas",
      date: "01/06",
      tag: "frontend",
    },
    {
      id: 3,
      name: "Project Title",
      assignee: "Christina",
      date: "01/06",
      tag: "design",
    },
    {
      id: 4,
      name: "Project Title",
      assignee: "Tom",
      date: "01/06",
      tag: "backend",
    },
    {
      id: 5,
      name: "Project Title",
      assignee: "Quinn",
      date: "01/06",
      tag: "backend",
    },
  ];

  const sortedCards = [...taskCards].sort((a, b) => {
    if (!sorting) return 0;
    if (a.tag === sorting && b.tag !== sorting) return -1;
    if (a.tag !== sorting && b.tag === sorting) return 1;
    return 0;
  });

  const activities = [
    {
      id: 1,
      time: "2 mins ago",
      user: "Mark",
      description: "Created a new task: Fix landing page bug",
    },
    {
      id: 2,
      time: "5 mins ago",
      user: "Thomas",
      description: "Updated project Marketing Website status to In Progress",
    },
    {
      id: 3,
      time: "8 mins ago",
      user: "Chris",
      description: "Commented on task Design login page",
    },
    {
      id: 4,
      time: "32 mins ago",
      user: "Deven",
      description: "Completed task Add feature section",
    },
    {
      id: 5,
      time: "1 hour ago",
      user: "Sofia",
      description: "Added new member John Doe to team Frontend Devs",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full p-4 gap-3 md:gap-5">
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-md md:p-6 p-3">
        <h3 className="md:text-[25px] text-[22px] font-bold">Tasks</h3>
        <div>
          <div className="flex flex-row justify-between mt-3">
            <select
              name="filter"
              id="filter"
              className="bg-gray-200 p-2 outline-0 text-sm"
              defaultValue="default"
            >
              <option value="default">Filter</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="completed">Completed</option>
            </select>
            <select
              name="sort"
              id="sort"
              className="bg-gray-200 p-2 outline-0 text-sm"
              onChange={(e) => setSorting(e.target.value)}
              defaultValue="default"
            >
              <option value="default">Sort</option>
              <option value="design">design</option>
              <option value="frontend">frontend</option>
              <option value="backend">backend</option>
            </select>
          </div>

          <div className="flex flex-col gap-5 mt-7">
            {sortedCards.map((taskCard) => {
              let bgColor = "";
              let textColor = "#000";

              if (taskCard.tag === "design") {
                bgColor = "#ADD8E6";
                textColor = "#fff";
              } else if (taskCard.tag === "frontend") {
                bgColor = "#90ee90";
                textColor = "#fff";
              } else if (taskCard.tag === "backend") {
                bgColor = "#808080";
                textColor = "#fff";
              }

              return (
                <div
                  onClick={onTrigger}
                  key={taskCard.id}
                  className="flex flex-col shadow-md rounded border p-3 gap-4"
                >
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-[18px]">{taskCard.name}</h3>
                    <p
                      className="text-[11px] px-2 py-1 rounded"
                      style={{
                        backgroundColor: bgColor,
                        color: textColor,
                      }}
                    >
                      {taskCard.tag}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>{taskCard.assignee}</p>
                    <p className="text-[14px] text-gray-700">{taskCard.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white shadow-md rounded-md p-6">
        <h3 className="md:text-[25px] text-[22px] font-bold">
          Activities Feed
        </h3>
        {activities.map((activity) => (
          <div
            className="flex flex-col pb-3 gap-3 md:gap-0 md:flex-row justify-between mt-10 border-b-2 hover:text-blue-600"
            key={activity.id}
          >
            <div className="w-full md:w-[30%]">{activity.time}</div>
            <div className="w-full md:w-[30%]">{activity.user}</div>
            <div className="w-full md:w-[30%]">{activity.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
