"use client";

import { useState } from "react";
import AddIcon from "../../../public/add-black.svg";
import CancelICon from "../../../public/cancel.svg";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { app } from "../auth/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AddProjectProps {
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    url: string;
    description: string;
    imageUrl: string;
  }) => void;
}

export default function AddProject({ onClose, onSubmit }: AddProjectProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 🚨 prevent page reload

    if (!name || !url || !description || !imageFile) {
      alert("All fields and images are required.");
      return;
    }

    try {
      setUploading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        `projects/${user.uid}/${Date.now()}_${imageFile.name}`
      );

      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // 🔥 Send data to parent for saving to backend
      await onSubmit({
        name,
        url,
        description,
        imageUrl,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-1/2 w-3/4 bg-white p-5 shadow-lg z-50 border border-gray-300">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-center text-[25px] ">Add New Project</h1>
        <button type="button" onClick={onClose}>
          <Image
            src={CancelICon}
            alt="cancel modal"
            width={30}
            height={30}
            aria-label="close"
            className="cursor-pointer"
          />
        </button>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex md:flex-row flex-col gap-5 items-center">
          <div className="">
            <input
              type="file"
              id="uploadProjectImage"
              src={AddIcon}
              alt=""
              accept=".png, .jpg, .svg, .jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="uploadProjectImage"
              className="md:p-7 p-4.5 border border-gray-900 rounded-sm cursor-pointer hover:bg-blue-600 hover:shadow-md transition-all duration-500 flex items-center justify-center"
            >
              <Image
                src={AddIcon}
                alt="Add Project Image"
                width={50}
                height={50}
              />
            </label>
            {imageFile && <p className="text-sm mt-1">{imageFile.name}</p>}
          </div>
          <div className="flex flex-col gap-5 w-full">
            <input
              type="text"
              name="projectName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id=""
              placeholder="project name"
              className="text-gray-900 text-sm border border-gray-900 py-1.5 px-2.5 outline-none"
            />
            <input
              type="url"
              name=""
              id=""
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="repository link"
              className="text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none"
            />
          </div>
        </div>
        <textarea
          name="projectDescription"
          id=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description here..."
          className="w-full mt-5 text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none resize-none h-[150px]"
        ></textarea>
        <button
          type="submit"
          disabled={uploading}
          className={`w-full text-center bg-blue-600 text-white py-3.5 px-5 mt-1 hover:bg-blue-500 transition-all duration-500 text-sm ${
            uploading
              ? "bg-gray-400 hover:cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}
        >
          {uploading ? "Uploading..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
