import Image from "next/image";
import CancelIcon from "../../../public/cancel.svg";

export default function AddTeamMemberModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div>
      <div className="flex flex-row justify-end mb-2">
        <button type="button" onClick={onClose}>
          <Image alt="cancel icon" src={CancelIcon} />
        </button>
      </div>
      <form action="" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="">{`User's Email`}</label>
          <input
            type="email"
            name="usersEmail"
            id="usersEmail"
            className="border border-gray-900 px-5 py-3 outline-none text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">{`User's Role`}</label>
          <input
            type="text"
            name="UsersROle"
            id="usersrole"
            className="border border-gray-900 px-5 py-3 outline-none text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white text-sm py-3 hover:bg-blue-500"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}
