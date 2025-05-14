import { space_grotesk } from "../layout";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "../../../public/hero-image.svg";
import PlayIcon from "../../../public/play.svg";
import AngleRightIcon from "../../../public/angle-right.svg";

export default function HeroSection() {
  return (
    <>
      <div className="bg-gray-50 flex items-center justify-center py-14">
        <div className="flex flex-col gap-2.5 w-2/5">
          <h1 className={`${space_grotesk.className} text-5xl font-bold`}>
            Collaborate. Build. Deliver.
          </h1>
          <h3 className="text-[22px]">
            A workspace built for developers who ship fast.
          </h3>
          <h4>
            DevCollab helps developers manage projects, tasks, and collaborate
            to bring project to life which will solve problems and help the
            dynamic environment grow — all in one place.
          </h4>
          <div className="flex gap-8 items-center mt-5">
            <button
              type="button"
              className=" bg-blue-600 opacity-80 hover:opacity-100 text-white py-3 px-5"
            >
              Join Free
            </button>
            <button type="button" className="group flex items-center">
              Learn More
              <Image
                alt="Right Angle"
                src={AngleRightIcon}
                className="ml-2 transform transition-transform duration-500 group-hover:translate-x-2"
              />
            </button>
          </div>
          <Link
            href="https://i-dontknow.com"
            className="group text-blue-600 flex items-center gap-2.5 capitalize text-lg mt-2.5"
          >
            watch video{" "}
            <Image
              alt="video icon"
              src={PlayIcon}
              className="transform transition-transform duration-500 group-hover:translate-x-2"
            />
          </Link>
        </div>
        <div className="w-2/5">
          <Image src={HeroImage} alt="Hero Image" className="w-full" />
        </div>
      </div>
    </>
  );
}
