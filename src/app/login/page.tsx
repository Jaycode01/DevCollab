"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FirebaseError } from "firebase/app";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/auth/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, , loading] =
    useSignInWithEmailAndPassword(auth);

  const handleAuthError = (code: string) => {
    switch (code) {
      case "auth/user-not-found":
        alert("No User Found with this email");
        break;
      case "auth/wrong-password":
        alert("Incorrect Password");
        break;
      case "auth/invalid-email":
        alert("Invalid Email Format");
        break;
      default:
        alert("Something went wrong, please try again");
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(email, password);

      if (!result || !result.user) {
        console.log("Login Failed, Please Try Again");
        return;
      }

      alert("Login Successful!");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        handleAuthError(err.code);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <div className="flex flex-col h-fit justify-center items-center w-full">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-5 w-11/12 md:w-1/3 md:mt-14 mt-7"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="border-2 border-gray-900 outline-none py-3 md:py-5 px-3 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 border-gray-900 outline-none py-3 md:py-5 px-3 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe" className="text-sm">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white text-sm py-4 md:py-5 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="flex items-center gap-3 mt-10 mx-auto">
        <hr className="w-24 border-gray-900 border-1.5" />
        <p className="text-[11px] md:text-[13px]">or continue with</p>
        <hr className="w-24 border-gray-900 border-1.5" />
      </div>

      <div className="flex items-center mt-5 gap-5">
        <FcGoogle size={32} className="cursor-pointer" />
        <FaGithub size={30} className="cursor-pointer" />
      </div>

      <p className="mt-5 text-sm md:text-[1rem]">
        New to DevCollab?{" "}
        <Link href="/getstarted" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
