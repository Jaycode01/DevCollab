"use client";

import AddIcon from "../../../public/add-black.svg";
import CancelICon from "../../../public/cancel.svg";
import Image from "next/image";

interface AddProjectProps {
  onClose: () => void;
}

export default function AddProject({ onClose }: AddProjectProps) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-1/2 w-3/4 bg-white p-5 shadow-lg z-50 border border-gray-300">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-center text-[25px]">Add New Project</h1>
        <button type="button" onClick={onClose} aria-label="close modal">
          <Image
            src={CancelICon}
            alt="cancel modal"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </button>
      </div>
      <form>
        <div className="flex md:flex-row flex-col gap-5 items-center">
          <div>
            <input
              type="file"
              id="uploadProjectImage"
              accept=".png, .jpg, .svg, .jpeg"
              className="hidden"
              disabled
            />
            <label
              htmlFor="uploadProjectImage"
              className="md:p-7 p-4.5 border border-gray-900 rounded-sm cursor-not-allowed flex items-center justify-center"
              aria-disabled="true"
            >
              <Image
                src={AddIcon}
                alt="Add Project Image"
                width={50}
                height={50}
              />
            </label>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <input
              type="text"
              placeholder="project name"
              className="text-gray-900 text-sm border border-gray-900 py-1.5 px-2.5 outline-none"
              disabled
            />
            <input
              type="url"
              placeholder="repository link"
              className="text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none"
              disabled
            />
          </div>
        </div>
        <textarea
          placeholder="Enter project description here..."
          className="w-full mt-5 text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none resize-none h-[150px]"
          disabled
        ></textarea>
        <button
          type="submit"
          className="w-full text-center bg-blue-600 text-white py-3.5 px-5 mt-1 text-sm cursor-not-allowed"
          disabled
        >
          Add Project
        </button>
      </form>
    </div>
  );
}
