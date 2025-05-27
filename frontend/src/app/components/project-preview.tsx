"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";
import PreviewImage from "../../../public/images/fake-decollab-preview.png";

gsap.registerPlugin(ScrollTrigger);

export default function Preview() {
  const previewScaling = useRef(null);

  useEffect(() => {
    if (!previewScaling.current) return;

    gsap.fromTo(
      previewScaling.current,
      { scale: 0.5, opacity: 0 },
      {
        scrollTrigger: {
          trigger: previewScaling.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="">
      <div
        className="mt-14 bg-gray-50 w-11/12 mx-auto rounded-md"
        ref={previewScaling}
      >
        <Image
          alt="Preview Image"
          src={PreviewImage}
          className="w-4/5 h-auto mx-auto"
        />
      </div>
    </div>
  );
}
