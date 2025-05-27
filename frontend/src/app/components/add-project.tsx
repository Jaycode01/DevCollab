import AddIcon from "../../../public/add-black.svg";
import Image from "next/image";

export default function AddProject() {
  return (
    <div className="md:w-1/2 w-3/4 mx-auto bg-white p-5 absolute top-[25%] md:left-[25%] left-[12%] shadow-lg z-50 border border-gray-300">
      <h1 className="text-center text-[25px] mb-10">Add New Project</h1>
      <form action="">
        <div className="flex md:flex-row flex-col gap-5 items-center">
          <div className="">
            <input
              type="file"
              id="uploadProjectImage"
              src=""
              alt=""
              accept=".png, .jpg, .svg, .jpeg"
              className="hidden"
            />
            <label
              htmlFor="uploadProjectImage"
              className="md:p-7 p-4.5 border border-gray-900 rounded-sm cursor-pointer hover:bg-blue-600 hover:shadow-md transition-all duration-500 flex items-center justify-center"
            >
              <Image
                src={AddIcon}
                alt="Add Project Image"
                width={50}
                height={50}
              />
            </label>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <input
              type="text"
              name="projectName"
              id=""
              placeholder="project name"
              className="text-gray-900 text-sm border border-gray-900 py-1.5 px-2.5 outline-none"
            />
            <input
              type="url"
              name=""
              id=""
              placeholder="repository link"
              className="text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none"
            />
          </div>
        </div>
        <textarea
          name="projectDescription"
          id=""
          placeholder="Enter project description here..."
          className="w-full mt-5 text-sm text-gray-900 border border-gray-900 py-1.5 px-2.5 outline-none resize-none h-[150px]"
        ></textarea>
      </form>
    </div>
  );
}
