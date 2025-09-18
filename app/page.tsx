"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RoutineForm from "./components/routineform";
import { FaPlusCircle } from "react-icons/fa";
import RoutineList from "./components/routinelist";

interface Routine {
  id?: number;
  title: string;
  description: string;
  tasks: string;
}

const fetchRoutines = async (): Promise<Routine[]> => {
  return [];
};

export default function Page() {
  const [showForm, setShowForm] = useState(false);

  const { data: routines = [], isLoading } = useQuery({
    queryKey: ["routines"],
    queryFn: fetchRoutines,
    initialData: [],
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Routines</h1>
      <RoutineList routines={routines} />

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-[rgb(255,208,102)] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:bg-yellow-500 hover:scale-110 transition-transform duration-200 z-50"
      >
        <FaPlusCircle size={36} />
      </button>
      {showForm && <RoutineForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
