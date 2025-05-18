import FakePic from "../../../public/images/fakeUserPic.jpg";
import Image from "next/image";
import EditPen from "../../../public/edit-pen.svg";
import GitHub from "../../../public/github.svg";
import LinkedIn from "../../../public/linkedin.svg";
import Twitter from "../../../public/twitter.svg";
import Globe from "../../../public/globe.svg";
import Link from "next/link";

export default function UsersProfile() {
  return (
    <div className="">
      <div className="">
        <div className="">
          <Image src={FakePic} alt="user pic" />
          <Image src={EditPen} alt="edit pen" />
        </div>
        <div className="">
          <p className="">Joseph Lamidi (Nexon)</p>
          <p className="">me@test.com</p>
          <p className="">+234 9060748887</p>
          <p className="">Role: Admin</p>
        </div>
        <div className="">
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos tenetur ratione recusandae libero distinctio
            necessitatibus iste vero. Voluptate fugit laudantium ducimus esse,
            quia sit modi laborum, qui, assumenda dignissimos excepturi.
          </p>
        </div>
        <div className="">
          <p className="">Location: Lagos, Nigeria</p>
          <p className="">Time: 9:15PM (GMT)</p>
        </div>
        <ul>
          <li className="">
            <Link href="/">
              <Image src={GitHub} alt="github" />
              GitHub
            </Link>
          </li>
          <li className="">
            <Link href="/">
              <Image src={LinkedIn} alt="globe" />
              LinkedIn
            </Link>
          </li>
          <li className="">
            <Link href="/">
              <Image src={Twitter} alt="globe" />
              Twitter/X
            </Link>
          </li>
          <li className="">
            <Link href="/">
              <Image src={Globe} alt="globe" />
              Portfolio
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
