import Image from "next/image";
import DeveLopers from "../../../public/developer.svg";
import ProjectManagers from "../../../public/project-manager.svg";
import TeamLeads from "../../../public/tean-leads.svg";
import RemoteTeams from "../../../public/remote-team.svg";
import StartupTeams from "../../../public/startup-teams.svg";

export default function Values() {
  return (
    <>
      <div className="bg-white mt-20 md:w-11/12 w-full mx-auto">
        <h2 className="md:text-2xl text-xl mb-10 pl-4">
          Collaborate Better, Faster, and Smarter
        </h2>
        <div className="flex flex-col gap-14">
          {/* First Value Section */}
          <div className="flex md:flex-row flex-col-reverse w-11/12 justify-center mx-auto gap-5">
            <div className="md:w-1/2 w-full border-2 border-blue-600 rounded-lg py-3">
              <Image
                src={DeveLopers}
                alt="First value Image"
                className="md:h-[500px] h-[200px]"
              />
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-4">
              <h3 className="md:text-[30px] text-[22px]">
                <span className="border-b-3 border-blue-600">Dev</span>elopers
              </h3>
              <p className="text-[12px] md:text-[1rem]">
                Focus on writing clean code, not managing chaos. DevCollab helps
                developers stay on track with simple task management, real-time
                updates, and clean dashboards that {`don’t`} get in the way of
                your workflow.
              </p>
            </div>
          </div>
          {/* End of First Value Section */}
          {/* Beginning of the second Value section */}
          <div className="flex md:flex-row-reverse flex-col-reverse w-11/12 justify-center mx-auto gap-5">
            <div className="md:w-1/2 w-full border-2 border-blue-600 rounded-lg py-3">
              <Image
                src={ProjectManagers}
                alt="Second value Image"
                className="md:h-[500px] h-[200px]"
              />
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-4">
              <h3 className="md:text-[30px] text-[22px]">
                <span className="border-b-3 border-blue-600">
                  Projectect Ma
                </span>
                nagers
              </h3>
              <p className="text-[12px] md:text-[1rem]">
                Organize, assign, and deliver on time. Plan sprints, manage
                priorities, and keep the team focused. DevCollab gives you the
                control and structure you need, without the overhead of
                complicated tools.
              </p>
            </div>
          </div>
          {/* Ending of the second value section */}
          {/* Beginning of the third value section */}
          <div className="flex md:flex-row flex-col-reverse w-11/12 justify-center mx-auto gap-5">
            <div className="md:w-1/2 w-full border-2 border-blue-600 rounded-lg py-3">
              <Image
                src={TeamLeads}
                alt="Third value Image"
                className="md:h-[500px] h-[200px]"
              />
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-4">
              <h3 className="md:text-[30px] text-[22px]">
                <span className="border-b-3 border-blue-600">Team L</span>
                eads
              </h3>
              <p className="text-[12px] md:text-[1rem]">
                Stay aligned and lead with clarity. Whether you’re overseeing
                two people or ten, DevCollab gives you visibility into progress,
                blockers, and deadlines — so your team keeps shipping without
                bottlenecks.
              </p>
            </div>
          </div>
          {/* End of the third value section */}
          {/* Start of the fourth value section */}
          <div className="flex md:flex-row-reverse flex-col-reverse w-11/12 justify-center mx-auto gap-5">
            <div className="md:w-1/2 w-full border-2 border-blue-600 rounded-lg py-3">
              <Image
                src={RemoteTeams}
                alt="Fourth value Image"
                className="md:h-[500px] h-[200px]"
              />
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-4">
              <h3 className="md:text-[30px] text-[22px]">
                <span className="border-b-3 border-blue-600">Remo</span>
                te Teams
              </h3>
              <p className="text-[12px] md:text-[1rem]">
                Work as one, from anywhere. With real-time updates,
                async-friendly workflows, and collaborative tools, DevCollab
                makes it easy to stay connected and productive across time
                zones.
              </p>
            </div>
          </div>
          {/* End of the fourth value section */}
          {/* Start of the fifth value section */}
          <div className="flex md:flex-row flex-col-reverse w-11/12 justify-center mx-auto gap-5">
            <div className="md:w-1/2 w-full border-2 border-blue-600 rounded-lg py-3">
              <Image
                src={StartupTeams}
                alt="Fifth value Image"
                className="md:h-[500px] h-[200px]"
              />
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-4">
              <h3 className="md:text-[30px] text-[22px]">
                <span className="border-b-3 border-blue-600">Startup </span>
                Founders
              </h3>
              <p className="text-[12px] md:text-[1rem]">
                Move fast with focus. Manage multiple projects, assign tasks,
                and track your {`team's`} output — all in one place. Whether{" "}
                {`you're`} building your MVP or managing a small dev squad,
                DevCollab keeps everything moving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
