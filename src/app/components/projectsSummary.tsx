export default function ProjectsSummary() {
  const Projects = [
    {
      id: 1,
      name: "Moviemaniac",
      update: "12-05-2025",
      due: "19-05-2025",
      status: "Completed",
    },
    {
      id: 2,
      name: "WishCube",
      update: "14-05-2025",
      due: "19-05-2025",
      status: "In progress",
    },
    {
      id: 3,
      name: "MindScribe",
      update: "15-05-2025",
      due: "19-05-2025",
      status: "In progress",
    },
    {
      id: 4,
      name: "Clark",
      update: "16-05-2025",
      due: "19-05-2025",
      status: "Due",
    },
    {
      id: 5,
      name: "Todo",
      update: "10-05-2025",
      due: "19-05-2025",
      status: "Completed",
    },
    {
      id: 6,
      name: "Dashboard Analytics",
      update: "02-05-2025",
      due: "19-05-2025",
      status: "Completed",
    },
    {
      id: 7,
      name: "MegaPay",
      update: "12-03-2025",
      due: "12-05-2025",
      status: "Due",
    },
  ];

  return (
    <>
      <div className="max-w-full mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Projects Summary</h1>
        <table className="min-w-full bg-white  text-sm">
          <thead className="bg-grau-100 text-left">
            <tr>
              <th className="py-2 px-4 border-b">#Id</th>
              <th className="py-2 px-4 border-b">Project Name</th>
              <th className="py-2 px-4 border-b">Last Update</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {Projects.map((project) => (
              <tr
                className="hover:text-blue-600 text-gray-900 hover:border-b"
                key={project.id}
              >
                <td className="py-2 px-4 border-b">{project.id}</td>
                <td className="py-2 px-4 border-b">{project.name}</td>
                <td className="py-2 px-4 border-b">{project.update}</td>
                <td className="py-2 px-4 border-b">{project.due}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      project.status === "Completed"
                        ? "bg-green-400"
                        : project.status === "In progress"
                        ? "bg-orange-400"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  {project.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
