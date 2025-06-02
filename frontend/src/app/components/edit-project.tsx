import CancelIcon from "../../../public/cancel.svg";
import Image from "next/image";

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
  return (
    <div className="absolute top-[20%] shadow-lg right-[25%] w-1/2 bg-white p-4 z-50 flex flex-col gap-8 border">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px]">Edit Project</h1>
        <button type="button" onClick={onClose}>
          {" "}
          <Image src={CancelIcon} alt="cancel icon" />
        </button>
      </div>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="projectName"
          id=""
          className="border border-gray-900 w-full text-sm  text-gray-900 outline-none py-3 px-1"
          placeholder="Edit project name"
        />
        <input
          type="url"
          name="projectUrl"
          id=""
          className="border border-gray-900 w-full text-sm text-gray-900 outline-none py-3 px-1"
          placeholder="Edit project url"
        />
        <textarea
          name="projectDesc"
          id=""
          className="border border-gray-900 text-sm w-full text-gray-900 outline-none py-3 px-1 h-[200px]"
          placeholder="Edit project description"
        />
        <button
          type="submit"
          className="bg-blue-600 w-full text-sm text-white py-3"
        >
          Save Changes
        </button>{" "}
      </form>
    </div>
  );
}
