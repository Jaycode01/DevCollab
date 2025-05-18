"use client";

import Image from "next/image";
import CancelPopup from "../../../public/cancel.svg";

type Project = {
  id: number;
  name: string;
  update: string;
  due: string;
  status: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
};

export default function TaskPopup({ isOpen, onClose, project }: ModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed top-1/2 md:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl p-5 rounded-sm w-[300px] gap-5 border z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[18px] font-semibold">{project.name}</h3>
        <button onClick={onClose} type="button" aria-label="Close modal">
          <Image src={CancelPopup} alt="cancel popup" width={20} height={20} />
        </button>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-600">Last Update: {project.update}</p>
        <p className="text-sm text-gray-600">Due Date: {project.due}</p>
        <p className="text-sm text-gray-600">Status: {project.status}</p>
      </div>
    </div>
  );
}
