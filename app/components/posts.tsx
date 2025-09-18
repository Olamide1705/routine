"use client";

import { useQuery, useMutation } from "@tanstack/react-query";

type Post = {
  userId: number;
  id: number;
  title: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Error fetching data");
  return response.json();
};

export default function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error occured: {error.message}</p>;

  return (
    <div className="">
      {data?.map((post) => (
        <p className="text-center" key={post.id}>
          {" "}
          {post.title}
        </p>
      ))}
    </div>
  );
}
