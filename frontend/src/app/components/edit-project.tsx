"use client";

import { useState, useEffect } from "react";
import CancelIcon from "../../../public/cancel.svg";
import Image from "next/image";
import { getAuth } from "firebase/auth";
interface EditProjectProps {
  project: {
    id: string;
    name: string;
    url: string;
    description: string;
  };
  onClose: () => void;
}
export default function EditProject({ project, onClose }: EditProjectProps) {
  const [name, setname] = useState("");
  const [url, seturl] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setname(project.name);
    seturl(project.url);
    setdescription(project.description);
  }, [project]);

  const handleSubmitEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not loggedin/authenticated.");

      const token = await user.getIdToken();
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_BASE}/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, url, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update project");
      }
      alert("Project updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating project.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="absolute top-[20%] shadow-lg right-[25%] w-1/2 bg-white p-4 z-50 flex flex-col gap-8 border">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px]">Edit Project</h1>
        <button type="button" onClick={onClose}>
          {" "}
          <Image src={CancelIcon} alt="cancel icon" />
        </button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitEditProject}>
        <input
          type="text"
          name="projectName"
          id=""
          onChange={(e) => setname(e.target.value)}
          className="border border-gray-900 w-full text-sm  text-gray-900 outline-none py-3 px-1"
          placeholder="Edit project name"
        />
        <input
          type="url"
          name="projectUrl"
          id=""
          onChange={(e) => seturl(e.target.value)}
          className="border border-gray-900 w-full text-sm text-gray-900 outline-none py-3 px-1"
          placeholder="Edit project url"
        />
        <textarea
          name="projectDesc"
          id=""
          onChange={(e) => setdescription(e.target.value)}
          className="border border-gray-900 text-sm w-full text-gray-900 outline-none py-3 px-1 h-[200px]"
          placeholder="Edit project description"
        />
        <button
          type="submit"
          className="bg-blue-600 w-full text-sm text-white py-3"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Project"}
        </button>{" "}
      </form>
    </div>
  );
}
