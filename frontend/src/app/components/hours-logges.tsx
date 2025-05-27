import ProgressBar from "./progress-bar";
import Image from "next/image";
import Streak from ".././../../public/streak.svg";

export default function HoursLogged() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <h3 className="md:text-2xl text-[22px]">Hours Logged</h3>
        <p className="flex items-center gap-0.5">
          7 <Image alt="streak icon" src={Streak} width={20} height={20} />{" "}
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="mb-2">
          <p className="text-sm mb-1">Monday: 7hrs 30mins</p>
          <ProgressBar value={75} />
        </div>
        <div className="mb-2">
          <p className="text-sm mb-1">Monday: 4hrs 21mins</p>
          <ProgressBar value={42.1} />
        </div>
        <div className="mb-2">
          <p className="text-sm mb-1">Wednesday: 9hrs 2mins</p>
          <ProgressBar value={92} />
        </div>
        <div className="mb-2">
          <p className="text-sm mb-1">Thursday: 2hrs 10mins</p>
          <ProgressBar value={21} />
        </div>
        <div className="mb-2">
          <p className="text-sm mb-1">Friday: 5hrs 0mins</p>
          <ProgressBar value={50} />
        </div>
        <div className="mb-2">
          <p className="text-sm mb-1">Saturday: 6hrs 6mins</p>
          <ProgressBar value={66} />
        </div>
        <div className="mb-2">
          <p className="text-sm mb-1">Sunday: 7hrs 9mins</p>
          <ProgressBar value={79.5} />
        </div>
      </div>
    </div>
  );
}
