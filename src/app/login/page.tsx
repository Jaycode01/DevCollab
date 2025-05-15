"use client";

import { useState, useEffect } from "react";
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
import { UserCredential } from "firebase/auth";

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

  const [signInWithEmailAndPassword, user, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGitHub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);

  // Handle successful authentication - we go again....Nexon
  useEffect(() => {
    const handleUser = async (
      userCredential: UserCredential | null | undefined,
      provider: string
    ) => {
      if (userCredential && userCredential.user) {
        try {
          const user = userCredential.user;

          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (
            !docSnap.exists() &&
            (provider === "google" || provider === "github")
          ) {
            const userProfile: UserProfile = {
              uid: user.uid,
              email: user.email,
              firstName: user.displayName?.split(" ")[0] || "",
              lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
              username: user.email?.split(" ").slice(1).join(" ") || "",
              photoURL: user.photoURL,
              provider: provider,
              createdAt: new Date().toISOString(),
            };

            await setDoc(userRef, userProfile);
          }

          // Redirection to the dashboard
          router.push("/dashboard");
        } catch (err) {
          console.error("Error handling user data: ", err);
          setError(
            "Login successful but failed to process user data. Please try again"
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

  // Set error message from firebase hooks
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
    console.error("Auth error: ", error);

    if (error.code === "auth/user-not-found") {
      setError("No user found with this email address");
    } else if (error.code === "auth/wrong-password") {
      setError("Incorrect password. Please try again");
    } else if (error.code === "auth/invalid-email") {
      setError("Please enter a valid emai address");
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
    } catch (err) {
      console.error("Google Sign-in error: ", err);
      if (err instanceof Error) {
        const firebaseError = err as FirebaseError;
        handleAuthError(firebaseError);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleGitHibLogin = async () => {
    setError("");
    try {
      await signInWithGitHub();
    } catch (err) {
      console.error("Github Sign-in error: ", err);
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
    } catch (err) {
      console.error("Login error ", err);
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

  const isLoading = loading || emailLoading || googleLoading || githubLoading;

  return (
    <div className="flex flex-col h-fit justify-center items-center w-full">
      {error && (
        <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded w-11/12 md:w-1/3 md-4">
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
        <div className="flex flex-row gap-2 items-center">
          <input type="checkbox" id="rememberMe" disabled={isLoading} />
          <label htmlFor="rememberMe" className="text-sm">
            Remember me
          </label>
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
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex items-center justify-center bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <FcGoogle size={32} className="cursor-pointer" />
        </button>
        <button
          type="button"
          onClick={handleGitHibLogin}
          disabled={isLoading}
          className="flex items-center justify-center bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <FaGithub size={30} className="cursor-pointer" />
        </button>
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
