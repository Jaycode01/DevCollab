"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CancelIcon from "../../../public/cancel.svg";
import Link from "next/link";

interface MemberDetailsModalProps {
  member: {
    name: string;
    email: string;
    bio?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    phone?: string;
    website?: string;
  };
  onClose: () => void;
}
export default function MemberDetailsModal({
  member,
  onClose,
}: MemberDetailsModalProps) {
  const [location, setlocation] = useState<string>("");

  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => {
        setlocation(`${data.city}, ${data.region}, ${data.country_name}`);
      })
      .catch((err) => {
        console.error("Error fetching location:", err);
        setlocation("Unknown");
      });
  }, []);

  return (
    <div className="p-5 flex flex-col gap-5 border">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-[20px]">Member Details</h1>
        <button type="button" onClick={onClose}>
          <Image src={CancelIcon} alt="cancel icon" width={22} height={22} />
        </button>
      </div>
      <div className="border border-gray-900 p-2.5 flex flex-col gap-1.5">
        <p className="text-sm text-gray-900">Name: {member.name}</p>
        <p className="text-sm text-gray-900">Email: {member.email}</p>
        {location && (
          <p className="text-sm text-gray-900">Location:{location} </p>
        )}
        {member.bio && (
          <p className="text-sm text-gray-900">Bio: {member.bio}.</p>
        )}
        {member.github && (
          <Link
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Github
          </Link>
        )}
        {member.linkedin && (
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            LinkedIn
          </Link>
        )}
        {member.twitter && (
          <Link
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Twitter/X
          </Link>
        )}
        {member.phone && (
          <p className="text-sm text-gray-900">Phone: {member.phone}</p>
        )}
        {member.website && (
          <Link
            href={member.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Website
          </Link>
        )}
      </div>
    </div>
  );
}
