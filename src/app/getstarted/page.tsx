import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function signUp() {
  return (
    <>
      <div className="text-gray-900 flex flex-col items-center justify-center h-screen">
        <form action="" className="flex flex-col gap-5">
          <div className="flex gap-5 items-center w-11/12 mx-auto">
            <div className="flex flex-col gap-1.5 w-3/5">
              <label htmlFor="firstName" className="capitalize">
                first name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="border-2 border-gray-900 w-full py-5 px-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-3/5">
              <label htmlFor="lastName" className="capitalize">
                last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="border-gray-900 border-2 w-full py-5 px-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
            <label htmlFor="firstName">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 border-gray-900 py-5 px-3"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="border-2 border-gray-900 py-5 px-3"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-gray-900 py-5 px-3"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="border-2 border-gray-900 py-5 px-3"
            />
          </div>

          <div className="flex flex-row-reverse items-center gap-2">
            <label htmlFor="agreement" className="w-11/12 text-[12px]">
              By clicking on this checkbox, it means you have read throught our
              terms and condition.
            </label>
            <input type="checkbox" name="agreement" id="agreement" />
          </div>
          <button
            type="submit"
            className="bg-blue-600 py-5 w-11/12 mx-auto text-white text-sm cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center gap-3 mt-10 mx-auto">
          <hr className="w-28  border-gray-900 border-1.5" />
          <p className="text-[13px]">or continue with</p>
          <hr className="w-28  border-gray-900 border-1.5" />
        </div>
        <div className="flex items-center  mt-5 gap-5">
          <FcGoogle size={32} className="cursor-pointer" />
          <FaGithub size={30} className="cursor-pointer" />
        </div>

        <p className="mt-5">
          Have an account already?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
