export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  collaborators: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Project Alpha",
    description: "A project about alpha.",
    image: "/images/project1.png",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-02",
    url: "https://example.com/project-alpha",
    collaborators: ["Alice", "Bob"],
  },
  {
    id: "2",
    name: "Project Beta",
    description: "A project about beta.",
    image: "/images/project2.png",
    createdAt: "2023-02-01",
    updatedAt: "2023-02-02",
    url: "https://example.com/project-beta",
    collaborators: ["Charlie", "David"],
  },
  {
    id: "3",
    name: "Moviemaniac",
    description: "A movie database application.",
    image: "../../public/images/fakeUserPic.png",
    createdAt: "2023-03-01",
    updatedAt: "2023-03-02",
    url: "https://example.com/moviemaniac",
    collaborators: ["Eve", "Frank"],
  },
  {
    id: "4",
    name: "Weather Wizard",
    description: "A weather forecasting application.",
    image: "../../public/images/fakeUserPic.png",
    createdAt: "2023-04-01",
    updatedAt: "2023-04-02",
    url: "https://example.com/weather-wizard",
    collaborators: ["Grace", "Heidi"],
  },
  {
    id: "5",
    name: "Task Tracker",
    description: "A task management application.",
    image: "../../public/images/fakeUserPic.png",
    createdAt: "2023-05-01",
    updatedAt: "2023-05-02",
    url: "https://example.com/task-tracker",
    collaborators: ["Ivan", "Judy"],
  },
  {
    id: "6",
    name: "Chat App",
    description: "A rela-time chat application.",
    image: "../../public/images/fakeUserPic.png",
    createdAt: "2021-01-01",
    updatedAt: "2022-01-11",
    url: "https://example.com/chat-app",
    collaborators: ["Thomas", "Cosmin"],
  },
];
