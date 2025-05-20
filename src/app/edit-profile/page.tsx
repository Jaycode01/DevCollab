export default function EditProfile() {
  return (
    <div className="flex flex-col   h-fit justify-center items-center mt-5 w-full md:w-1/2  px-4 md:px-0 mx-auto md:gap-10 gap-6">
      <div className="flex fex-row justify-between items-center w-full">
        <h2 className="md:text-[23px] text-[20px]">Edit Your Profile</h2>
        <button
          type="button"
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
            className="border  border-gray-900 px-4 py-2 text-sm outline-0 text-gray-900"
            placeholder="update your phone number"
          />
        </div>
        <div className="flex flex-col md:w-3/5 w-11/12 mx-auto">
          <label htmlFor="bio">Bio:</label>
          <textarea
            name="bio"
            id="bio"
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
            <div className="md:w-[65%] w-full mx-auto flex flex-col gap-1.5 px-2 md:px-0">
              <label htmlFor="">Old Password</label>
              <input
                type="password"
                className="border border-gray-900 outline-0 px-4 py-2 text-sm text-gray-900"
              />
            </div>
            <div className="md:w-[65%] w-full px-2 mx-auto flex flex-col gap-1.5">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                id=""
                className="border border-gray-900 outline-0 px-4 py-2 text-sm text-gray-900"
              />
            </div>
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
