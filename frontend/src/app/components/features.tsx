"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Image from "next/image";
import { didact_gothic, montserrat } from "./fonts";
import TeamCollabortion from "../../../public/team-collaboration.svg";
import SmartDashboard from "../../../public/smart-dashboard.svg";
import ProjectsOrganization from "../../../public/projects-organization.svg";
import TaskManagement from "../../../public/task-management.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  useEffect(() => {
    const boxes = gsap.utils.toArray(".feature-box");

    boxes.forEach((box, index) => {
      gsap.from(box as HTMLElement, {
        scrollTrigger: {
          trigger: box as HTMLElement,
          start: "top 85%",
          toggleActions: "play none none reverse",
          markers: false,
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.2,
      });
    });
  }, []);

  useEffect(() => {
    gsap.from(".feature-slide-in", {
      scrollTrigger: {
        trigger: ".feature-slide-in",
        start: "top 85%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  const features = [
    {
      src: TeamCollabortion,
      title: "Team Collaboration",
      text: `Work better together, wherever you are. Collaborate in real-time
        with task-based commenting, user mentions, and shared project
        spaces. Empower your team to stay aligned, provide updates, and
        contribute ideas — all within DevCollab.`,
    },
    {
      src: SmartDashboard,
      title: "Smart Dashboard",
      text: `Make smarter decisions with real-time overviews. Your personalized
        dashboard gives you instant visibility into your team workload,
        upcoming deadlines, task status, and overall project health.`,
    },
    {
      src: ProjectsOrganization,
      title: "Projects Organization",
      text: `Structure your work with clarity. Group related tasks under
        dedicated projects, set key milestones, and break down large goals
        into manageable steps.`,
    },
    {
      src: TaskManagement,
      title: "Tasks Management",
      text: `Keep your team organized and accountable with DevCollab’s
        intuitive task manager. Create tasks, assign teammates, set
        deadlines, and track progress from start to finish.`,
    },
  ];

  return (
    <div className="mx-auto w-11/12 mt-20">
      <div className="flex flex-col gap-2.5 w-full md:w-1/3 feature-slide-in">
        <h1
          className={`${montserrat.className} font-bold md:text-3xl text-2xl`}
        >
          Collaborate and Build with DevCollab
        </h1>
        <p
          className={`${didact_gothic.className} font-bold md:text-lg text-[15px]`}
        >
          Make your projects more organized and track progress on all your
          projects with your team.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 md:w-11/12 w-full mx-auto mt-9">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-box h-fit md:py-4 py-2 flex-1 aspect-square md:px-5 px-3 bg-gray-50 flex flex-col md:gap-7 gap-3"
          >
            <Image
              src={feature.src}
              alt={feature.title}
              width={150}
              height={150}
            />
            <h2 className="text-lg">{feature.title}</h2>
            <p className="text-[12px] md:text-sm">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
