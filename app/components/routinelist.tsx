"use client";

interface Routine {
  id?: number;
  title: string;
  description: string;
  tasks: string;
}

export default function RoutineList({ routines }: { routines: Routine[] }) {
  return (
    <div className="place-content-center mt-5 p-2">
      <table className="table-auto border-collapse border border-gray-300 max-w-3xl w-full mx-auto">
        <thead>
          <tr className="bg-gray-200 text-sm md:text-base">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th>Description</th>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routines.map((item, index) => (
            <tr key={index} className="text-center text-[9px] md:text-base">
              <td className="border border-gray-300 px-4 py-2">{item.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.tasks}</td>

              <td className="space-x-2 md:space-x-3">
                <button className="px-3 md:px-4 py-1 bg-blue-600 text-white text-[9px] md:text-sm rounded">
                  Edit
                </button>
                <button className="px-1 md:px-4 py-1 bg-red-600 text-white text-[9px] md:text-sm rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
