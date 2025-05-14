import Link from "next/link";
import Image from "next/image";
import cancelBox from "../../../public/cancel.svg";

export default function UserQuickBox() {
  return (
    <>
      <div>
        <div>
          <Link href="/user-profile">view profile</Link>
          <Image alt="Camcel Icon" src={cancelBox} width={20} height={20} />
        </div>
      </div>
    </>
  );
}
