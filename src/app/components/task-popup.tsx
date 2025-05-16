"use client";

import Image from "next/image";
import CancelPopup from "../../../public/cancel.svg";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function TaskPopup({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed top-1/2  md:top-1/4 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl p-5 rounded-sm h-fit flex flex-col justify-center  w-[300px] gap-5 border">
      <div className="flex justify-between items-center">
        <h3 className="text-[18px]">Project Name</h3>
        <button onClick={onClose} type="button">
          <Image src={CancelPopup} alt="cancel popup" width={20} height={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Description...</p>
        <p className="text-[11px]">Tag</p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="border px-2 py-1">Figma</p>
        <p className="border px-2 py-1">Next.js</p>
        <p className="border px-2 py-1">Firebase</p>
      </div>
      <div className="text-gray-500 text-[12px]">
        <p className="">Notes...</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="">Zach Latta</p>
        <p className="">17/05</p>
      </div>
    </div>
  );
}
