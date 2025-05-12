"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div>
        <Image
          alt="DevCollab ogo"
          src="../../../public/images/devcollab-logo.png"
          width={80}
          height={80}
        />
        <nav></nav>
      </div>
    </>
  );
}
