import Image from "next/image";
import CancelIcon from "../../../public/cancel.svg";

interface TeamInfoProps {
  team: {
    name: string;
    description?: string;
    createdBy: string;
    createdAt?: string;
    members?: { uid: string; role: string }[];
  };
  onClose: () => void;
}

export default function Teamnfo({ team, onClose }: TeamInfoProps) {
  const formattedDate = team.createdAt
    ? new Date(team.createdAt).toLocaleString()
    : "Unknown";
  return (
    <div className="p-5 flex-col flex gap-5">
      <div className="flex flex-row justify-between">
        <h2 className="">Team Details</h2>
        <button type="button" onClick={onClose}>
          <Image src={CancelIcon} alt="cancel icon" width={22} height={22} />
        </button>
      </div>
      <div className="border p-2.5 flex flex-col gap-2">
        <h3 className="text-[25px]">{team.name}</h3>
        <p className="text-sm">
          {team.description || "No description provided."}
        </p>
        <p className="text-sm">Created By: {team.createdBy}</p>
        <p className="text-sm">Created At:{formattedDate}</p>
        <p className="text-sm">
          Total Number of Members: {team.members?.length || 0}
        </p>
      </div>
    </div>
  );
}
