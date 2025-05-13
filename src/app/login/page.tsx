import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Login() {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center w-full">
        <form action="" className="flex flex-col gap-5 w-11/12 md:w-1/3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 border-gray-900 outline-none  py-5 px-3 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-gray-900 outline-none  py-5 px-3 text-sm"
            />
          </div>
          <div className="flex flex-row gap-2  items-center">
            <input type="checkbox" name="rememberMe" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white text-sm py-5 cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center gap-3 mt-10 mx-auto">
          <hr className="w-24  border-gray-900 border-1.5" />
          <p className="text-[13px]">or continue with</p>
          <hr className="w-24  border-gray-900 border-1.5" />
        </div>
        <div className="flex items-center  mt-5 gap-5">
          <FcGoogle size={32} className="cursor-pointer" />
          <FaGithub size={30} className="cursor-pointer" />
        </div>

        <p className="mt-5">
          New to DevCollab?{" "}
          <Link href="/getstarted" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
