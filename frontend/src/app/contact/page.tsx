import { Mail, User } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="flex flex-col h-[100vh] bg-white justify-center items-center">
      <form
        action=""
        className="w-[55%] border-gray-600 border p-7 rounded flex flex-col gap-5"
      >
        <div className="border border-gray-600 rounded p-3 flex items-center gap-1.5">
          <label htmlFor="name" className="border-r-[2px] border-gray-600 pr-2">
            <User />
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border-none outline-none w-full text-inherit px-2.5"
            placeholder="Nex0n"
          />
        </div>
        <div className="border border-gray-600 rounded p-3 flex items-center gap-1.5">
          <label
            htmlFor="email"
            className="border-r-[2px] border-gray-600 pr-2"
          >
            <Mail />
          </label>
          <input
            type="email"
            className="outline-none w-full text-inherit px-2.5"
            placeholder="nexon@dev.com"
          />
        </div>
        <textarea
          name=""
          id=""
          className="border border-gray-600 rounded h-[200px] p-3"
          placeholder="Hi Devcollab......"
        />
      </form>
    </div>
  );
}
