"use client";

import { useState } from "react";
import AddIcon from "../../../public/add.svg";
import { Circle, CheckCircle, AlertCircle } from "lucide-react";
import DeleteIocn from "../../../public/delete.svg";
import Dots from "../../../public/dots.svg";
import Image from "next/image";

export default function Tasks() {
  const [open, setopen] = useState(false);

  return (
    <>
      <div className="bg-gray-50 px-8 min-h-[100vh] border-t">
        <div className="w-full flex flex-row justify-end gap-5 pt-5 pr-5 items-center">
          <div className="relative inline-block text-left text-sm">
            <button
              className="border px-5 py-3 rounded"
              onClick={() => setopen(!open)}
            >
              All ▼
            </button>
            {open && (
              <div className="absolute mt-2 bg-white border rounded shadow w-40">
                <div className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                  <Circle className="text-yellow-500 w-4 h-4" /> In Progress
                </div>
                <div className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                  <CheckCircle className="text-green-600 w-4 h-4" /> Completed
                </div>
                <div className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                  <AlertCircle className="text-red-500 w-4 h-4" /> Due
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className="bg-blue-600 text-sm text-white py-3 px-5 flex items-center gap-1.5 hover:bg-blue-500"
          >
            Add New Task
            <Image src={AddIcon} alt="add icon" />
          </button>
        </div>
        <div className="">
          {/* Task card - small */}
          <div className="flex flex-col w-[25%] bg-white shadow-md border rounded p-3 gap-5">
            <div className="flex flex-row items-center justify-between">
              <h2>Task Name</h2>
              <div className="flex flex-row gap-1 items-center">
                <Image src={DeleteIocn} alt="delete icon" />
                <Image src={Dots} alt="dots" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <span className="text-sm flex items-center gap-0.5">
                <Circle className="text-yellow-500 w-4 h-4" /> In Progress
              </span>
              <span className="text-sm">21/06/2025</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
