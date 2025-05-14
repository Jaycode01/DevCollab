import { space_grotesk } from "../layout";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "../../../public/hero-image.svg";
import PlayIcon from "../../../public/play.svg";
import AngleRightIcon from "../../../public/angle-right.svg";

export default function HeroSection() {
  return (
    <>
      <div className="bg-gray-50 flex flex-col md:flex-row items-center justify-center py-4 md:py-14 gap-7 md:gap-0 px-3">
        <div className="flex flex-col gap-2.5 md:w-2/5 w-full">
          <h1
            className={`${space_grotesk.className} text-4xl md:text-5xl font-bold`}
          >
            Collaborate. Build. Deliver.
          </h1>
          <h3 className="text-[16px] md:text-[22px]">
            A workspace built for developers who ship fast.
          </h3>
          <h4 className="text-[13px] md:text-[1rem]">
            DevCollab helps developers manage projects, tasks, and collaborate
            to bring project to life which will solve problems and help the
            dynamic environment grow — all in one place.
          </h4>
          <div className="flex gap-5  md:gap-8 items-center mt-5">
            <button
              type="button"
              className=" bg-blue-600 opacity-80 hover:opacity-100 text-white py-3 px-5 text-sm md:text-[1rem]"
            >
              Join Free
            </button>
            <button
              type="button"
              className="group flex items-center text-sm md:text-[1rem]"
            >
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
            className="group text-blue-600 flex items-center gap-2.5 capitalize md:text-lg mt-2.5 text-sm"
          >
            watch video{" "}
            <Image
              alt="video icon"
              src={PlayIcon}
              className="transform transition-transform duration-500 group-hover:translate-x-2"
            />
          </Link>
        </div>
        <div className="md:w-2/5 w-full">
          <Image src={HeroImage} alt="Hero Image" className="w-full" />
        </div>
      </div>
    </>
  );
}
