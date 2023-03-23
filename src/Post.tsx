import { useQuery } from "@tanstack/react-query";
import { getPost, Post as PostType } from "./api/posts";
import { getUser, User } from "./api/users";

interface PostProps {
  id: number;
}

export default function Post({ id }: PostProps) {
  const { data, status, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", data?.userId],
    queryFn: () => getUser(data?.userId),
  });

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <h1>
        {data.title} <br />
        <small>
          {data.userId}
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data.name}
        </small>
      </h1>
      <p>{data.body}</p>
    </>
  );
}
