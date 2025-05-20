"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  User,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { app, db } from "../auth/config";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [authUser, setAuthUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    bio: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    websiteUrl: "",
  });

  const [uid, setUid] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        setAuthUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData((prev) => ({
            ...prev,
            ...docSnap.data(),
          }));
        } else {
          await setDoc(docRef, {
            name: user.displayName ?? "",
            email: user.email ?? "",
            tel: "",
            bio: "",
            githubUrl: "",
            twitterUrl: "",
            websiteUrl: "",
          });
        }
      }
    });
    return () => unsub();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!uid) return;
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      name: formData.name,
      email: formData.email,
      tel: formData.tel,
      bio: formData.bio,
      githubUrl: formData.githubUrl,
      linkedinUrl: formData.linkedinUrl,
      twitterUrl: formData.twitterUrl,
      websiteUrl: formData.websiteUrl,
    });
    router.push("/profile");
  };

  const handlePasswordChange = async () => {
    if (!authUser || !oldPassword || !newPassword) return;

    try {
      const credential = EmailAuthProvider.credential(
        authUser.email!,
        oldPassword
      );
      await reauthenticateWithCredential(authUser, credential);
      await updatePassword(authUser, newPassword);

      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Password update failed:", error);
      alert("Old Password is incorrect or something went wrong");
    }
  };

  return (
    <div className="flex flex-col   h-fit justify-center items-center mt-5 w-full md:w-1/2  px-4 md:px-0 mx-auto md:gap-10 gap-6">
      <div className="flex fex-row justify-between items-center w-full">
        <h2 className="md:text-[23px] text-[20px]">Edit Your Profile</h2>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-sm text-sm md:text-[17px]"
        >
          Save Changes
        </button>
      </div>
      <form action="" className="mt-2.5 flex flex-col gap-7 w-full border py-4">
        <div className="flex flex-col gap-1.5 md:w-3/5 w-11/12  mx-auto">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-900 px-4 py-2 text-sm outline-0 text-gray-900"
            placeholder="update your name"
          />
        </div>
        <div className="flex flex-col gap-1.5 md:w-3/5 w-11/12 mx-auto">
          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            id="email"
            className="border border-gray-900 px-4 py-2 text-sm outline-0 text-gray-900"
            placeholder="update your email"
          />
        </div>
        <div className="flex  flex-col gap-1.5 md:w-3/5 w-11/12 mx-auto">
          <label htmlFor="tel">Phone Number:</label>
          <input
            type="tel"
            name="tel"
            id="tel"
            onChange={handleChange}
            value={formData.tel}
            className="border  border-gray-900 px-4 py-2 text-sm outline-0 text-gray-900"
            placeholder="update your phone number"
          />
        </div>
        <div className="flex  flex-col gap-1.5 md:w-3/5 w-11/12 mx-auto">
          <label htmlFor="tel">Github:</label>
          <input
            type="url"
            name="githubUrl"
            id="github-url"
            onChange={handleChange}
            value={formData.githubUrl}
            className="border  border-gray-900 px-4 py-2 text-sm outline-0 text-gray-900"
            placeholder="update your github url"
          />
        </div>
        <div className="flex  flex-col gap-1.5 md:w-3/5 w-11/12 mx-auto">
          <label htmlFor="tel">LinkedIn:</label>
          <input
            type="url"
            name="linkedinUrl"
            id="linkedin-url"
            onChange={handleChange}
            value={formData.linkedinUrl}
            className="border  border-gray-900 px-4 py-2 text-sm outline-0 text-gray-900"
            placeholder="update your linkedin url"
          />
        </div>
        <div className="flex  flex-col gap-1.5 md:w-3/5 w-11/12 mx-auto">
          <label htmlFor="tel">Twitter/X:</label>
          <input
            type="url"
            name="twitterUrl"
            id="twitter-url"
            onChange={handleChange}
            value={formData.twitterUrl}
            className="border  border-gray-900 px-4 py-2 text-sm outline-0 text-gray-900"
            placeholder="update your twitter url"
          />
        </div>
        <div className="flex  flex-col gap-1.5 md:w-3/5 w-11/12 mx-auto">
          <label htmlFor="tel">Website:</label>
          <input
            type="url"
            name="websiteUrl"
            id="website-url"
            onChange={handleChange}
            value={formData.websiteUrl}
            className="border  border-gray-900 px-4 py-2 text-sm outline-0 text-gray-900"
            placeholder="update your website url"
          />
        </div>
        <div className="flex flex-col md:w-3/5 w-11/12 mx-auto">
          <label htmlFor="bio">Bio:</label>
          <textarea
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border border-gray-900 px-4 py-2 outline-0 text-sm text-gray-900"
            placeholder="update your bio"
          ></textarea>
        </div>
      </form>
      <form action="" className="border w-full py-5">
        <div className="flex flex-col gap-5">
          <div className="border w-11/12 mx-auto py-3 rounded-md flex flex-col gap-3">
            <h3 className="text-xl text-gray-900 md:w-[65%] w-full px-2 mx-auto">
              Change Password
            </h3>
            <p className="text-[12px] text-gray-900 border bg-amber-200  border-amber-400 md:w-[65%] w-full px-3 py-2 mx-auto rounded">
              Note that the change password ony work for users who signup/login
              with email and password, users who login with gihub, and google
              provider {`can't`} change password.
            </p>
            <div className="md:w-[65%] w-full mx-auto flex flex-col gap-1.5 px-2 md:px-0">
              <label htmlFor="">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="border border-gray-900 outline-0 px-4 py-2 text-sm text-gray-900"
              />
            </div>
            <div className="md:w-[65%] w-full px-2 mx-auto flex flex-col gap-1.5">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id=""
                className="border border-gray-900 outline-0 px-4 py-2 text-sm text-gray-900"
              />
            </div>
            <button
              type="button"
              onClick={handlePasswordChange}
              className="bg-blue-600 text-sm py-2 px-4 w-fit mx-auto text-white"
            >
              update password
            </button>
          </div>
          <div className="bg-red-200 w-11/12 mx-auto p-4 border border-red-700 rounded-md shadow-md">
            <h3 className="text-gray-900 text-xl">Danger Zone</h3>
            <p className="mt-3 text-sm text-gray-900">
              Deleting your account is permanent and cannot be undone. All your
              data, settings, and activity will be permanently erased. You will
              lose access to all features and services linked to your account.
              This action is immediate and irreversible.
            </p>
            <button
              type="button"
              className="w-ful p-2 rounded-sm bg-red-600 hover:bg-red-500 text-white mt-3 text-sm float-right"
            >
              Delete Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
