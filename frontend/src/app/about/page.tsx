import {
  Bell,
  Brain,
  ChartNoAxesCombined,
  Check,
  Code,
  Eye,
  Lock,
  NotepadText,
  Pin,
  Rocket,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-white flex mt-2 flex-col h-fit justify-center items-center">
      <div className="border rounded-lg p-7 w-[90%] md:w-[70%] mt-[5%]">
        <h1 className="pb-2 border-b-2 w-fit border-gray-900 font-bold text-[30px] flex items-center gap-1.5">
          <Brain size={30} />
          About DevCollab
        </h1>
        <p className="mt-3">
          <span>DevCollab</span> is a powerful web-based platform designed to
          revolutionize how developers and teams collaborate on software
          projects. Built with a deep understandingof real-world dev team
          workflows. DevCollab merges project management, team collaboration,
          and task tracking into a single, intituitive tool.
        </p>
        <p>
          In {`today's`} fast-paced development environment, managing code is
          just part of the battle - coordinating tasks, staying aligned with
          your team, and maintaining visibility into progress is critical.
          DevCollab was built to bridge that gap, offering a seamless experience
          for both solo developers and team-based workflows.
        </p>

        <div className="">
          <h2 className="text-[25px] font-semibold flex flex-row gap-1.5 items-center mt-10">
            <Rocket size={25} /> Why DevCollab ?
          </h2>
          <p className="">
            Modern developers juggle between multiple tools - task boards,
            chats, documents, and dashboard - which can be overwhelming.{" "}
            <b>DevCollab simplifies this chaos</b> by providing:
          </p>
          <ul className="list-disc mt-3 flex flex-col gap-5">
            <li className="inline-flex gap-1">
              <Pin />
              <p>
                <b>Centralized project Management:</b> Create, edit, and
                organize your projects with detailed description and URLs.
              </p>
            </li>
            <li className="inline-flex gap-1">
              <Check />
              <p>
                <b>Intelligent Task tracking:</b> Track personal and team-based
                tasks, with statuses like{" "}
                {`"In Progress", "Completed",and "Due".`}
              </p>
            </li>
            <li className="inline-flex gap-1">
              <Users />
              <p>
                <b>Collaborative Teams:</b> Create teams, invite members, and
                assign responsibilities.
              </p>
            </li>
            <li className="inline-flex gap-1">
              <Bell />
              <p>
                <b>Real-Time Notifications:</b> Stay updated on project changes
                and team activities using <em>Socket.IO-powered</em> real-time
                alerts.
              </p>
            </li>
            <li className="inline-flex gap-1">
              <ChartNoAxesCombined />
              <p>
                <b>Dashboard Overview:</b> Visual inisght into progress, task
                statuses, and team activity at a glance.
              </p>
            </li>
            <li className="inline-flex gap-1">
              <Lock />
              <p>
                <b>Secure Authentication:</b> Login and user access managed
                securely using <em>Firebase Authentication</em>.
              </p>
            </li>
            <li className="inline-flex gap-1">
              <NotepadText />
              <p>
                <b>Activity Feed:</b> Automatic real-time updates on {`what's`}{" "}
                happening across your workspace - tasks, team, projects, and
                more.
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <h2 className="flex items-center text-[25px] font-semibold gap-1.5">
            <Eye />
            Vision
          </h2>
          <p>
            <b>DevCollab</b> is not just a task manager - {`it's`} a
            developer-first <b>productivity engine</b>. {`It's`} built to
            support <b>the way developers actually work</b>, reducing
            tool-switching and bringing everything you need into one focused
            dashboard.
          </p>
        </div>

        {/* Developer - Me */}
        <div className="mt-12">
          <h3 className="flex items-center text-[20px] gap-2">
            <Code /> Developed By
          </h3>
          <p className="mt-2">
            A 17-years-old developer passionate about building solutions for
            developers by developers. DevCollab was born out of the need to
            improve how young builders, hackathon teams, and remote devs
            collaborate without friction.
          </p>
          <Link
            href="https://github.com/Jaycode01"
            className="text-blue-600 font-semibold"
          >{`Dev Profile`}</Link>
        </div>
      </div>

      <p className="py-5">
        Made with ❤ by{" "}
        <Link
          href="mailto:josephlamidijoslam@gmail.com"
          className="text-blue-600"
        >
          Nexon
        </Link>
      </p>
    </div>
  );
}
