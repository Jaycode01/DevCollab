import Search from "../../../public/search.svg";
import AddIcon from "../../../public/add.svg";
import ProjectTestImage from "../../../public/square-3-stack.svg";
import Link from "next/link";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="w-full">
      <div className="mt-5 flex md:flex-row flex-col justify-between items-center border-b-2 border-gray-900 py-3 w-full md:px-5 px-2 gap-3.5 md:gap-0">
        <div className="md:w-3/5 w-full flex flex-row md:gap-3 gap-2 items-center">
          <input
            type="search"
            className="border border-gray-900 p-4 w-full text-sm outline-none"
          />
          <button
            type="button"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-sm text-white py-3.5 px-7  flex-row gap-2 "
          >
            Search
            <Image src={Search} alt="search icon" />
          </button>
        </div>
        <div className="flex flex-row items-center gap-5 w-full md:w-auto">
          <select
            name=""
            className=" py-4 px-2 bg-gray-100 outline-none border border-gray-900 text-sm"
          >
            <option value="a-z">A - Z</option>
            <option value="date created">Date Created</option>
            <option value="last updated">Last Updated</option>
          </select>
          <button
            type="button"
            className="inline-flex bg-blue-600 py-3.5 px-5 items-center gap-2 text-sm text-white"
          >
            Add New <Image src={AddIcon} alt="add icon" />{" "}
          </button>
        </div>
      </div>
      <div className="">
        <div className="">
          <div className="">
            <Image src={ProjectTestImage} alt="project image" />
            <div className="">
              <p className="">Project Name</p>
              <Link href="google.com">https://google.com/</Link>
            </div>
          </div>
          <div className="">
            <Image />
          </div>
        </div>
      </div>
    </div>
  );
}
