"use client";
import Image from "next/image";
import SearchIcon from "../../../public/search.svg";
import { taskCards } from "@/lib/tasks";

export default function Tasks() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mt-5 flex md:flex-row flex-col justify-between items-center border-b-2 border-gray-900 py-3 w-full md:px-5 px-2 gap-3.5 md:gap-0 bg-white">
        <div className="md:w-3/5 w-full flex flex-row md:gap-3 gap-2 items-center">
          <input
            type="search"
            name=""
            id=""
            className="border border-gray-900 outline-none w-full py-4 px-2 text-sm"
          />
          <button
            type="button"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-sm text-white py-3.5 px-7  flex-row gap-2"
          >
            Search
            <Image src={SearchIcon} alt="search icon" />
          </button>
        </div>
        <div className="flex flex-row items-center gap-5 w-full md:w-auto">
          <select
            name=""
            id=""
            className="text-sm text-gray-900 bg-gray-100 p-2 outline-none py-3.5 px-3 "
          >
            <option defaultValue="filter">Filter</option>
            <option value="todo">Todo</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            name=""
            id=""
            className="text-sm text-gray-900 bg-gray-100 p-2 outline-none py-3.5 px-3"
          >
            <option defaultValue="sort">Sort</option>
            <option value="deadline">Deadline</option>
            <option value="design">Design</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
        {taskCards.map((taskCard) => (
          <div
            key={taskCard.id}
            className="bg-white flex flex-row items-center p-4 gap-5 rounded-md shadow-lg cursor-pointer hover:scale-102 transition-all duration-300 ease-in-out"
          >
            <input
              type="radio"
              name=""
              id=""
              className="scale-200 accent-blue-600"
            />
            <div className="flex flex-col gap-0.5 w-full">
              <p className="flex flex-row items-center justify-between">
                <span className="text-[15px] text-gray-900">
                  {taskCard.name}
                </span>
                <span className="text-[12px]">{taskCard.status}</span>
              </p>

              <p className="flex justify-between items-center w-full">
                <span className="text-[12px] text-gray-700">
                  {taskCard.date}
                </span>
                <span className="text-[11px]">{taskCard.tag}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
