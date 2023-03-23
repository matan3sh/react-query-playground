import { useQuery } from "@tanstack/react-query";
import { getPosts, Post } from "./api/posts";

export default function PostsList2() {
  const postsQuery = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
    // refetchInterval: 1000
  });

  if (postsQuery.status === "loading") return <h1>Loading...</h1>;
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Posts List 2</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
