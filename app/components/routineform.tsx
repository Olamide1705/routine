"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RoutineFormProps = {
  onClose: () => void;
};

interface Routine {
  title: string;
  description: string;
  tasks: string;
}

const createRoutine = async (newRoutine: Routine) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRoutine),
  });

  return response.json();
};

export default function RoutineForm({ onClose }: RoutineFormProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Routine>({
    title: "",
    description: "",
    tasks: "",
  });

  const { mutate } = useMutation({
    mutationFn: createRoutine,

    onMutate: async (newRoutine) => {
      await queryClient.cancelQueries({ queryKey: ["routines"] });
      const previousRoutines = queryClient.getQueryData<Routine[]>([
        "routines",
      ]);
      queryClient.setQueryData<Routine[]>(["routines"], (old = []) => [
        ...old,
        { id: Date.now(), ...newRoutine },
      ]);

      return { previousRoutines };
    },
    onError: (_err, _newRoutine, context) => {
      queryClient.setQueryData(["routines"], context?.previousRoutines);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h1 className="font-bold text-base md:text-xl mb-5">Add Routine</h1>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-xl hover:bg-yellow-500 hover:scale-110 transition-transform duration-200 z-50"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label htmlFor="id"></label>
          Title
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            className="border p-2 rounded-md w-full mt-2"
            onChange={handleChange}
          />
          {/* Description */}
          <label htmlFor="description"></label>
          Description
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            className="border p-2 rounded-md w-full mt-2"
            onChange={handleChange}
          />
          {/* Tasks */}
          <label htmlFor="tasks"></label>
          Tasks
          <input
            id="tasks"
            name="tasks"
            type="text"
            value={formData.tasks}
            className="border p-2 rounded-md w-full mt-2"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Routine
          </button>
        </form>
      </div>
    </div>
  );
}
