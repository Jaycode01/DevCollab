import cancelIcon from "../../../public/cancel.svg";
import Image from "next/image";

interface Props {
  onClose: () => void;
  task: {
    name: string;
    description: string;
  };
}

export default function EditTaskModal({ onClose, task }: Props) {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-5">
        <h1>Edit Task Details</h1>
        <button type="button" onClick={onClose}>
          <Image src={cancelIcon} alt="cancel icon" />
        </button>
      </div>
      <form action="" className="flex flex-col gap-5">
        <input
          type="text"
          defaultValue={task.name}
          className="text-sm border border-gray-900 px-4 py-2.5 outline-none"
          placeholder="Edit Task Name"
        />
        <textarea
          defaultValue={task.description}
          className="text-sm border border-gray-900 px-4 py-2.5 outline-none h-[200px]"
          placeholder="Edit Task Description"
        />
        <button type="submit" className="bg-blue-600 text-sm text-white py-2.5">
          Edit Task
        </button>
      </form>
    </div>
  );
}
