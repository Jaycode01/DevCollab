export interface tasks {
  id: string;
  name: string;
  assignee: string;
  date: string;
  tag: string;
  status: string;
}

export const taskCards: tasks[] = [
  {
    id: "1",
    name: "Project Title",
    assignee: "Zach",
    date: "01/06",
    tag: "design",
    status: "todo",
  },
  {
    id: "2",
    name: "Project Title",
    assignee: "Thomas",
    date: "01/06",
    tag: "frontend",
    status: "doing",
  },
  {
    id: "3",
    name: "Project Title",
    assignee: "Christina",
    date: "01/06",
    tag: "design",
    status: "completed",
  },
  {
    id: "4",
    name: "Project Title",
    assignee: "Tom",
    date: "01/06",
    tag: "backend",
    status: "completed",
  },
  {
    id: "5",
    name: "Project Title",
    assignee: "Quinn",
    date: "01/06",
    tag: "backend",
    status: "completed",
  },
  {
    id: "6",
    name: "Project Title",
    assignee: "Msw",
    date: "21/05",
    tag: "frontend",
    status: "todo",
  },
  {
    id: "7",
    name: "Project Title",
    assignee: "Cosmin",
    date: "17/07",
    tag: "backend",
    status: "doing",
  },
  {
    id: "8",
    name: "Project Title",
    assignee: "Mack",
    date: "30/06",
    tag: "frontend",
    status: "todo",
  },
  {
    id: "9",
    name: "Project Title",
    assignee: "Joseph",
    date: "20/05",
    tag: "frontend",
    status: "doing",
  },
];
