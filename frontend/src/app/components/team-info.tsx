import Image from "next/image";
import CancelIcon from "../../../public/cancel.svg";

interface TeamInfoProps {
  team: {
    name: string;
    description?: string;
    creatorName?: string;
    createdAt?: {
      _seconds: number;
      _nanoseconds: number;
    };
    members?: { uid: string; role: string }[];
    memberCount?: number;
  };
  onClose: () => void;
}

export default function Teamnfo({ team, onClose }: TeamInfoProps) {
  return (
    <div className="p-5 flex-col flex gap-5">
      <div className="flex flex-row justify-between">
        <h2 className="text-[25px]">Team Details</h2>
        <button type="button" onClick={onClose}>
          <Image src={CancelIcon} alt="cancel icon" width={22} height={22} />
        </button>
      </div>
      <div className="border p-2.5 flex flex-col gap-2">
        <h3 className="text-[20px]">Name: {team.name}</h3>
        <p className="text-sm">
          Description: {team.description || "No description provided."}
        </p>
        <p className="text-sm">Created By: {team.creatorName || "Unknown"}</p>
        <p className="text-sm">
          Created At:{" "}
          {team.createdAt
            ? new Date(team.createdAt._seconds * 1000).toLocaleString()
            : "N/A"}
        </p>

        <p className="text-sm">
          Total Number of Member(s):{" "}
          {team.memberCount || team.members?.length || 0}
        </p>
      </div>
    </div>
  );
}
