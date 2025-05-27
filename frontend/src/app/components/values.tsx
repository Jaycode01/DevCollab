"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeveLopers from "../../../public/developer.svg";
import ProjectManagers from "../../../public/project-manager.svg";
import TeamLeads from "../../../public/tean-leads.svg";
import RemoteTeams from "../../../public/remote-team.svg";
import StartupTeams from "../../../public/startup-teams.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Values() {
  useEffect(() => {
    gsap.from(".values-heading", {
      scrollTrigger: {
        trigger: ".values-heading",
        start: "top 85%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    const sections = gsap.utils.toArray(".value-section");

    sections.forEach((section, index) => {
      gsap.from(section as HTMLElement, {
        scrollTrigger: {
          trigger: section as HTMLElement,
          start: "top 85%",
          toggleActions: "play none none reverse",
          markers: false,
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.1,
      });
    }, []);
  });

  const valuesData = [
    {
      src: DeveLopers,
      alt: "Developers Image",
      title: "Developers",
      text: `Focus on writing clean code, not managing chaos. DevCollab helps developers stay on track with simple task management, real-time updates, and clean dashboards that don’t get in the way of your workflow.`,
      reverse: false,
    },
    {
      src: ProjectManagers,
      alt: "Project Managers Image",
      title: "Project Managers",
      text: `Organize, assign, and deliver on time. Plan sprints, manage priorities, and keep the team focused. DevCollab gives you the control and structure you need, without the overhead of complicated tools.`,
      reverse: true,
    },
    {
      src: TeamLeads,
      alt: "Team Leads Image",
      title: "Team Leads",
      text: `Stay aligned and lead with clarity. Whether you’re overseeing two people or ten, DevCollab gives you visibility into progress, blockers, and deadlines — so your team keeps shipping without bottlenecks.`,
      reverse: false,
    },
    {
      src: RemoteTeams,
      alt: "Remote Teams Image",
      title: "Remote Teams",
      text: `Work as one, from anywhere. With real-time updates, async-friendly workflows, and collaborative tools, DevCollab makes it easy to stay connected and productive across time zones.`,
      reverse: true,
    },
    {
      src: StartupTeams,
      alt: "Startup Teams Image",
      title: "Startup Founders",
      text: `Move fast with focus. Manage multiple projects, assign tasks, and track your team's output — all in one place. Whether you're building your MVP or managing a small dev squad, DevCollab keeps everything moving.`,
      reverse: false,
    },
  ];
  return (
    <>
      <div className="bg-white mt-20 md:w-11/12 w-full mx-auto">
        <h2 className="values-heading md:text-2xl text-xl mb-10 pl-4">
          Collaborate Better, Faster, and Smarter
        </h2>
        <div className="flex flex-col gap-14">
          {valuesData.map(({ src, alt, title, text, reverse }, i) => (
            <div
              key={i}
              className={`value-section flex w-11/12 justify-center mx-auto gap-5 ${
                reverse
                  ? "md:flex-row-reverse flex-col-reverse"
                  : "md:flex-row flex-col-reverse"
              }`}
            >
              {/* Image container */}
              <div className="md:w-1/2 w-full border-2 border-blue-600 rounded-lg py-3">
                <Image
                  src={src}
                  alt={alt}
                  className="md:h-[500px] h-[200px]"
                  priority={i === 0}
                />
              </div>

              {/* Text container */}
              <div className="md:w-1/2 w-full flex flex-col gap-4">
                <h3 className="md:text-[30px] text-[22px] font-semibold">
                  <span className="border-b-3 border-blue-600">
                    {title.split(" ")[0]}
                  </span>
                  {title.slice(
                    title.indexOf(" ") >= 0 ? title.indexOf(" ") : title.length
                  )}
                </h3>
                <p className="text-[12px] md:text-[1rem]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
