import AddIcon from "../../../public/add.svg";
import Image from "next/image";

export default function AddProject() {
  return (
    <div className="w-1/2 mx-auto bg-white p-5 absolute top-[25%] left-[25%] shadow-lg z-50 border border-gray-300">
      <h1 className="text-center text-[25px] mb-10">Add New Project</h1>
      <form action="">
        <div className="flex ">
          <div className="">
            <input
              type="file"
              id="uploadProjectImage"
              src=""
              alt=""
              accept=".png, .jpg, .svg, .jpeg"
              className="hidden"
            />
            <label htmlFor="uploadProjectImage">
              <Image src={AddIcon} alt="Add Project Image" />
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
      </form>
    </div>
  );
}
