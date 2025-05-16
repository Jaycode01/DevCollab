"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import type { FirebaseError } from "firebase/app";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth, db } from "@/app/auth/config";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { UserCredential } from "firebase/auth";

// Define the user profile data structure
interface UserProfile {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  username: string;
  photoURL?: string | null;
  provider: string;
  createdAt: string;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Firebase hooks with loading and error states
  const [signInWithEmailAndPassword, user, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);

  // Handle successful authentication
  useEffect(() => {
    const handleUser = async (
      userCredential: UserCredential | null | undefined,
      provider: string
    ) => {
      if (userCredential && userCredential.user) {
        try {
          const user = userCredential.user;
          console.log("Authentication successful, processing user data...");

          // Check if user exists in Firestore
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          let userData: UserProfile | null = null;

          // If user doesn't exist in Firestore (first social login), create profile
          if (
            !docSnap.exists() &&
            (provider === "google" || provider === "github")
          ) {
            console.log("Creating new user profile...");
            userData = {
              uid: user.uid,
              email: user.email,
              firstName: user.displayName?.split(" ")[0] || "",
              lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
              username: user.email?.split("@")[0] || "",
              photoURL: user.photoURL,
              provider: provider,
              createdAt: new Date().toISOString(),
            };

            await setDoc(userRef, userData);
            console.log("New user profile created in Firestore");
          } else if (docSnap.exists()) {
            // User exists, get their data
            console.log("Existing user found, retrieving profile...");
            userData = docSnap.data() as UserProfile;
          }

          // Store user data in localStorage for use across the app
          if (userData) {
            console.log("Saving user data to localStorage:", userData);
            localStorage.setItem("userData", JSON.stringify(userData));

            // Add a small delay to ensure localStorage is updated
            // before redirecting
            setTimeout(() => {
              console.log(
                "Checking if localStorage was updated:",
                localStorage.getItem("userData")
              );
              console.log("Redirecting to dashboard...");
              router.push("/dashboard");
            }, 300);
          } else {
            console.error("No user data available to save");
            router.push("/dashboard");
          }
        } catch (err) {
          console.error("Error handling user data:", err);
          setError(
            "Login successful but failed to process user data. Please try again."
          );
        }
      }
    };

    if (user) {
      handleUser(user, "email");
    } else if (googleUser) {
      handleUser(googleUser, "google");
    } else if (githubUser) {
      handleUser(githubUser, "github");
    }
  }, [user, googleUser, githubUser, router]);

  // Set error message from Firebase hooks
  useEffect(() => {
    if (emailError) {
      handleAuthError(emailError);
    } else if (googleError) {
      handleAuthError(googleError);
    } else if (githubError) {
      handleAuthError(githubError);
    }
  }, [emailError, googleError, githubError]);

  const handleAuthError = (error: FirebaseError) => {
    console.error("Auth error:", error);

    if (error.code === "auth/user-not-found") {
      setError("No user found with this email address.");
    } else if (error.code === "auth/wrong-password") {
      setError("Incorrect password. Please try again.");
    } else if (error.code === "auth/invalid-email") {
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

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithGoogle();
      // The useEffect hook will handle the rest
    } catch (err) {
      console.error("Google sign-in error:", err);
      if (err instanceof Error) {
        const firebaseError = err as FirebaseError;
        handleAuthError(firebaseError);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleGitHubLogin = async () => {
    setError("");
    try {
      await signInWithGithub();
      // The useEffect hook will handle the rest
    } catch (err) {
      console.error("GitHub sign-in error:", err);
      if (err instanceof Error) {
        const firebaseError = err as FirebaseError;
        handleAuthError(firebaseError);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(email, password);
      // The useEffect hook will handle the rest
    } catch (err) {
      console.error("Login error:", err);
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

  // Combined loading state
  const isLoading = loading || emailLoading || googleLoading || githubLoading;

  return (
    <div className="flex flex-col h-fit justify-center items-center w-full">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-11/12 md:w-1/3 mb-4">
          {error}
        </div>
      )}

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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <input type="checkbox" id="rememberMe" disabled={isLoading} />
            <label htmlFor="rememberMe" className="text-sm">
              Remember me
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-blue-600 text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-600 text-white text-sm py-4 md:py-5 cursor-pointer ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="flex items-center gap-3 mt-10 mx-auto">
        <hr className="w-24 border-gray-900 border-1.5" />
        <p className="text-[11px] md:text-[13px]">or continue with</p>
        <hr className="w-24 border-gray-900 border-1.5" />
      </div>

      <div className="flex items-center mt-5 gap-5">
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex items-center justify-center bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <FcGoogle size={32} className="cursor-pointer" />
        </button>
        <button
          onClick={handleGitHubLogin}
          disabled={isLoading}
          className="flex items-center justify-center bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <FaGithub size={30} className="cursor-pointer" />
        </button>
      </div>

      <p className="mt-5 text-sm md:text-[1rem]">
        New to DevCollab?{" "}
        <Link href="/sign-up" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
