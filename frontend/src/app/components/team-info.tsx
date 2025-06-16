import Image from "next/image";
import CancelIcon from "../../../public/cancel.svg";

interface TeamInfoProps {
  team: {
    name: string;
    description?: string;
    createdBy: string;
    createdAt?: string;
    members?: { uid: string; role: string; name?: string }[];
  };
  onClose: () => void;
}

export default function Teamnfo({ team, onClose }: TeamInfoProps) {
  const creator = team.members?.find((m) => m.uid === team.createdBy);

  function parseFirestoreDateString(dateStr: string): string {
    if (!dateStr || typeof dateStr !== "string") return "Unknown";

    const cleaned = dateStr.replace(/UTC[+-]\d+/, "").trim();
    const parsed = Date.parse(cleaned);

    if (!isNaN(parsed)) {
      return new Date(parsed).toLocaleString();
    }

    return "Invalid Date";
  }

  console.log("Team:", team);

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
        <p className="text-sm">Created By: {creator?.name || team.createdBy}</p>
        <p className="text-sm">
          Created At: {parseFirestoreDateString(team.createdAt || "")}
        </p>
        <p className="text-sm">
          Total Number of Member(s): {team.members?.length || 0}
        </p>
      </div>
    </div>
  );
}
