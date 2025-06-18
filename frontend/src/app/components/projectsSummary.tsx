"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

interface RawProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

type Project = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type ProjectsSummaryProps = {
  onProjectClick: (project: Project) => void;
};

export default function ProjectsSummary({
  onProjectClick,
}: ProjectsSummaryProps) {
  const [projects, setprojects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const token = await user.getIdToken();
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http:localhost:5000";
        const res = await fetch(`${API_BASE}/api/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch projects");

        const formatted = (data.projects as RawProject[]).map((p) => ({
          id: p.id,
          name: p.name,
          createdAt: new Date(p.createdAt).toLocaleDateString(),
          updatedAt: new Date(p.updatedAt).toLocaleDateString(),
        }));

        setprojects(formatted);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-full mx-auto md:p-6 p-3">
      <h1 className="md:text-2xl text-[20px] font-bold mb-4">
        Projects Summary
      </h1>
      {projects.length === 0 ? (
        <p className="text-gray-600 text-sm mt-5">No Projects Yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm">
            <thead className="text-left bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">#Id</th>
                <th className="py-2 px-4 border-b">Project Name</th>
                <th className="py-2 px-4 border-b">Date Created</th>
                <th className="py-2 px-4 border-b">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => onProjectClick(project)}
                  className="hover:text-blue-600 cursor-pointer text-gray-900"
                >
                  <td className="py-2 px-4 border-b">
                    {project.id.slice(0, 6)}
                  </td>
                  <td className="py-2 px-4 border-b">{project.name}</td>
                  <td className="py-2 px-4 border-b">{project.createdAt}</td>
                  <td className="py-2 px-4 border-b">{project.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
