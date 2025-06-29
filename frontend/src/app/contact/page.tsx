export default function ContactUs() {
  return (
    <div>
      <div className="flex flex-col justify-center h-[100vh] pl-[20%]">
        <div className="bg-blue-200 w-fit p-3">
          <p className="text-left">
            Note: Your Infos will be sent with the message for good user(your)
            experience
          </p>
        </div>
        <form action="" className="w-[70%]">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Message:</label>
            <textarea className="border border-gray-900 px-4 py-2 h-[200px] outline-none text-sm" />
          </div>
          <button
            type="submit"
            className="w-full text-center text-white bg-blue-600 py-2 mt-5 hover:bg-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
