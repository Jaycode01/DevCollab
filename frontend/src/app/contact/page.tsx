import { Instagram, Linkedin, Mail, Send, User } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="flex flex-col h-[100vh-100px] bg-white justify-center items-center mt-2">
      <form
        action=""
        className="w-[85%] md:w-[55%] border-gray-600 border p-7 rounded flex flex-col gap-5 mt-[20%] md:mt-[10%]"
      >
        <h1 className="text-center font-semibold text-[25px] mb-5">
          Drop us a message today!
        </h1>
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
        <button
          type="submit"
          className="w-full flex flex-row items-center gap-1.5 bg-blue-600 text-center justify-center py-2.5 text-white hover:bg-blue-500"
        >
          Send <Send size={20} />
        </button>
      </form>
      <div className="flex flex-row gap-3 items-center text-blue-600 font-semibold mt-6 border border-gray-600 py-3 px-5 rounded">
        <button
          type="button"
          className="hover:pb-1.5 hover:border-b-2 border-blue-600 "
        >
          <Instagram />
        </button>
        <button
          type="button"
          className="hover:pb-1.5 hover:border-b-2 border-blue-600"
        >
          <Linkedin />
        </button>
        <button
          type="button"
          className="hover:pb-1.5 hover:border-b-2 border-blue-600"
        >
          <Mail />
        </button>
      </div>
    </div>
  );
}
