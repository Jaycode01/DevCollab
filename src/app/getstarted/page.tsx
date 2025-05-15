"use client";
import type React from "react";
import { FirebaseError } from "firebase/app";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth, db } from "@/app/auth/config";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile, User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthUser {
  user: User | null;
}

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const [createUserWithEmailAndPassword, user, , createError] =
    useCreateUserWithEmailAndPassword(auth);

  // HAndle Succeccful authentication
  useEffect(() => {
    const handleUser = async (
      user: AuthUser | null | undefined,
      firstName?: string,
      lastName?: string,
      username?: string
    ) => {
      if (user) {
        try {
          if (!firstName && !lastName && !username && user.user) {
            const displayName = user.user.displayName || "";
            const nameParts = displayName.split(" ");
            firstName = nameParts[0] || "";
            lastName = nameParts.slice(1).join(" ") || "";
          }

          if (firstName && lastName && user.user) {
            await updateProfile(user.user, {
              displayName: `${firstName} ${lastName}`,
            });
          }

          if (user.user) {
            await setDoc(doc(db, "users", user.user.uid), {
              uid: user.user.uid,
              firstName: firstName || "",
              lastName: lastName || "",
              username: username || user.user.email?.split("@")[0] || "",
              email: user.user.email,
              createdAt: new Date().toISOString(),
              provider: user.user.providerData[0]?.providerId || "password",
            });
          }

          // Redirecting to dashboard
          router.push("../dashboard");
        } catch (err) {
          console.error("Error saving user data: ", err);
          setError(
            "Account created but failed to save profile data, please try again."
          );
        }
      }
    };

    if (user) {
      handleUser(user, firstName, lastName, username);
    } else if (googleUser) {
      handleUser(googleUser);
    } else if (githubUser) {
      handleUser(githubUser);
    }
  }, [user, googleUser, githubUser, firstName, lastName, username, router]);

  // Set error message from firebase hooks - Nexon can do it...let's gooooooo
  useEffect(() => {
    if (createError) {
      handleAuthError(createError);
    } else if (googleError) {
      handleAuthError(googleError);
    } else if (githubError) {
      handleAuthError(githubError);
    }
  }, [createError, googleError, githubError]);

  const handleAuthError = (error: FirebaseError) => {
    console.error("Auth error:", error);

    if (error.code === "auth/email-already-in-use") {
      setError("This email is already in use.");
    } else if (error.code == "auth/weak-password") {
      setError("Please enter a valid email address.");
    } else if (error.code === "auth/popup-closed-by-user") {
      setError("Sign-in popup was closed. Please try again.");
    } else if (error.code === "auth/account-exists-with-different-credential") {
      setError(
        "An account already exists with the same email address but different sign-in credentials."
      );
    } else {
      setError(`Authentication failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  const handleGithubSignIn = async () => {
    setError("");
    try {
      await signInWithGithub();
    } catch (err) {
      console.error("GitHub sign-in error: ", err);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !firstName || !lastName || !username) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(email, password);
      // The useEffect hook will handle the rest
    } catch (err) {
      console.error("Sigup error:", err);
      if (err instanceof Error) {
        const firebaseError = err as FirebaseError;
        handleAuthError(firebaseError);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-900 flex flex-col items-center justify-center h-fit md:mt-0 mt-5">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-11/12 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
        <div className="flex gap-3 md:gap-5 items-center w-11/12 mx-auto">
          <div className="flex flex-col gap-1.5 w-3/5">
            <label
              htmlFor="firstName"
              className="capitalize text-sm md:text-[1rem]"
            >
              first name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-2 border-gray-900 w-full py-3 md:py-5 px-3 text-sm outline-none text-[0.7rem] md:text-sm"
              disabled={loading || googleLoading || githubLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5 w-3/5">
            <label htmlFor="lastName" className="capitalize md:text-md text-sm">
              last name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-gray-900 border-2 w-full py-3 md:py-5 px-3 text-sm outline-none text-[0.7rem] md:text-sm"
              disabled={loading || googleLoading || githubLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
          <label className="text-sm md:text-[1rem]">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-900 py-3 md:py-5 px-3 text-[0.7rem] md:text-sm"
            disabled={loading || googleLoading || githubLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
          <label className="text-sm md:text-[1rem]">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-900 py-3 md:py-5 px-3 text-[0.7rem] md:text-sm"
            disabled={loading || googleLoading || githubLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
          <label className="text-sm md:text-[1rem]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-900 py-3 md:py-5 px-3 text-[0.7rem] md:text-sm"
            disabled={loading || googleLoading || githubLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5 w-11/12 mx-auto">
          <label className="text-sm">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading || googleLoading || githubLoading}
            className="border-2 border-gray-900 py-3 md:py-5 px-3 text-[0.7rem] md:text-sm"
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
          className={`bg-blue-600 py-4 md:py-5 w-11/12 mx-auto text-white text-sm cursor-pointer ${
            loading || googleLoading || githubLoading
              ? "opacity-70 cursor-not-allowed"
              : ""
          }`}
          disabled={loading || googleLoading || githubLoading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <div className="flex items-center gap-3 mt-10 mx-auto">
        <hr className="w-20 md:w-28 border-gray-900 border-1.5" />
        <p className="text-[11px] md:text-[13px]">or continue with</p>
        <hr className="w-20 md:w-28 border-gray-900 border-1.5" />
      </div>

      <div className="flex items-center mt-5 gap-5">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading || githubLoading}
          className="flex items-center justify-center bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <FcGoogle size={32} className="cursor-pointer" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
          onClick={handleGithubSignIn}
          disabled={loading || googleLoading || githubLoading}
        >
          <FaGithub size={30} className="cursor-pointer" />
        </button>
      </div>

      <p className="mt-5 text-sm md:text-[1rem]">
        Have an account already?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
