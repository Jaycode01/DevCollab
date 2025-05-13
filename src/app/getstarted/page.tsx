"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth, db } from "@/app/auth/config";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !username) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      const user = res.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        username,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setUsername("");

      alert("Signup successful!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="text-gray-900 flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
        <div className="flex gap-5 items-center w-11/12 mx-auto">
          <div className="flex flex-col gap-1.5 w-3/5">
            <label htmlFor="firstName" className="capitalize">
              first name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-2 border-gray-900 w-full py-5 px-3 text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-3/5">
            <label htmlFor="lastName" className="capitalize">
              last name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-gray-900 border-2 w-full py-5 px-3 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-900 py-5 px-3"
          />
        </div>

        <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-900 py-5 px-3"
          />
        </div>

        <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-900 py-5 px-3"
            placeholder="e.g W20='/2348sjdgy"
          />
        </div>

        <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-2 border-gray-900 py-5 px-3"
          />
        </div>

        <div className="flex flex-row-reverse items-center gap-2">
          <label className="w-11/12 text-[12px]">
            By clicking on this checkbox, you agree to our terms and conditions.
          </label>
          <input type="checkbox" required />
        </div>

        <button
          type="submit"
          className="bg-blue-600 py-5 w-11/12 mx-auto text-white text-sm cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      <div className="flex items-center gap-3 mt-10 mx-auto">
        <hr className="w-28 border-gray-900 border-1.5" />
        <p className="text-[13px]">or continue with</p>
        <hr className="w-28 border-gray-900 border-1.5" />
      </div>

      <div className="flex items-center mt-5 gap-5">
        <FcGoogle
          size={32}
          className="cursor-pointer"
          onClick={() => signInWithGoogle()}
        />
        <FaGithub
          size={30}
          className="cursor-pointer"
          onClick={() => signInWithGithub()}
        />
      </div>

      <p className="mt-5">
        Have an account already?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
