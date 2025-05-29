"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AddIcon from "../../../public/add-black.svg";
import CancelICon from "../../../public/cancel.svg";
import Image from "next/image";

interface AddProjectProps {
  onClose: () => void;
  onProjectAdded: () => void;
}

export default function AddProject({
  onClose,
  onProjectAdded,
}: AddProjectProps) {
  const [projectNAme, setProjectNAme] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectNAme || !description || !projectURL || !imageFile) {
      return alert("Please fill in the fields.");
    }
    setIsSubmitting(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in");

      const token = await user.getIdToken();
      let imageUrl = "";

      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `project/${Date.now()}-${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: projectNAme,
            url: projectURL,
            description,
            imageUrl,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add project.");

      onProjectAdded();
      onClose();
    } catch (error) {
      console.error("Add project error:", error);
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
            src={CancelICon}
            alt="cancel modal"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex md:flex-row flex-col gap-5 items-center">
          <div>
            <input
              type="file"
              id="uploadProjectImage"
              accept=".png, .jpg, .svg, .jpeg"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <label
              htmlFor="uploadProjectImage"
              className="md:p-7 p-4.5 border border-gray-900 rounded-sm cursor-not-allowed flex items-center justify-center"
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
              value={projectNAme}
              onChange={(e) => setProjectNAme(e.target.value)}
              className="text-gray-900 text-sm border border-gray-900 py-1.5 px-2.5 outline-none"
              required
            />
            <input
              type="url"
              placeholder="repository link"
              value={projectURL}
              onChange={(e) => setProjectURL(e.target.value)}
              className="text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none"
              required
            />
          </div>
        </div>
        <textarea
          placeholder="Enter project description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-5 text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none resize-none h-[150px]"
          required
        ></textarea>
        <button
          type="submit"
          className={`w-full text-center bg-blue-600 text-white py-3.5 px-5 mt-1 text-sm ${
            isSubmitting
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-blue-700 cursor-pointer"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding" : "Add Project"}
        </button>
      </form>
    </div>
  );
}
