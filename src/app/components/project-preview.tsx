import Image from "next/image";
import PreviewImage from "../../../public/images/fake-decollab-preview.png";

export default function Preview() {
  return (
    <div className="">
      <div className="mt-14 bg-gray-50 w-11/12 mx-auto rounded-md">
        <Image
          alt="Preview Image"
          src={PreviewImage}
          className="w-4/5 h-auto mx-auto"
        />
      </div>
    </div>
  );
}
