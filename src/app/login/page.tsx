"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FirebaseError } from "firebase/app";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth, db } from "@/app/auth/config";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, , loading] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGitHub] = useSignInWithGithub(auth);

  const router = useRouter();

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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (!result || !result.user) {
        console.log("Google Login Failed");
        return;
      }

      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: "google",
          createdAt: new Date().toISOString(),
        });
      }

      alert("Google Login Successful");
      console.log("Redirecting to dashboard");
      setTimeout(() => {
        router.push("../dashboard");
      }, 100);
    } catch (err: unknown) {
      const error = err as { message: string };
      alert("Google Login Failed: " + error.message);
    }
  };

  //Handle GItHub Login
  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithGitHub();
      if (!result || !result.user) {
        console.log("GitHub Login failed");
        return;
      }

      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: "github",
          createdAt: new Date().toISOString(),
        });
      }

      alert("GitHub Login Successful");
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { message: string };
      alert("GitHub Login Failed: " + error.message);
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
        <FcGoogle
          size={32}
          className="cursor-pointer"
          onClick={handleGoogleLogin}
        />
        <FaGithub
          size={30}
          className="cursor-pointer"
          onClick={handleGitHubLogin}
        />
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
