"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import CancelIcon from "../../../public/cancel.svg";
import Image from "next/image";

interface AddProjectProps {
  onClose: () => void;
  onProjectAdded: () => void;
}

export default function AddProject({
  onClose,
  onProjectAdded,
}: AddProjectProps) {
  const [projectName, setProjectName] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName || !description || !projectURL) {
      return alert("Please fill in all the fields.");
    }

    setIsSubmitting(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in");

      const token = await user.getIdToken();

      const response = await fetch(
        `https://devcollab-tslf.onrender.com/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: projectName,
            url: projectURL,
            description,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add project.");

      onProjectAdded();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Add project error:", error);
        alert("Failed: " + error.message);
      } else {
        console.error("Unknown error", error);
        alert("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-1/2 w-3/4 bg-white p-5 shadow-lg z-50 border border-gray-300">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-center text-[25px]">Add New Project</h1>
        <button type="button" onClick={onClose} aria-label="close modal">
          <Image
            src={CancelIcon}
            alt="cancel modal"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 w-full">
          <input
            type="text"
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="text-gray-900 text-sm border border-gray-900 py-1.5 px-2.5 outline-none"
            required
          />
          <input
            type="url"
            placeholder="Repository link"
            value={projectURL}
            onChange={(e) => setProjectURL(e.target.value)}
            className="text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none"
            required
          />
          <textarea
            placeholder="Enter project description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none resize-none h-[150px]"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className={`w-full text-center bg-blue-600 text-white py-3.5 px-5 mt-5 text-sm ${
            isSubmitting
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-blue-700 cursor-pointer"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
