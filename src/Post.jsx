import { useQuery } from "@tanstack/react-query";
import { getSinglePost, getSingleUser } from "./api/posts";
import { useEffect } from "react";

function Post({ id }) {
  const postsQuery = useQuery({
    queryKey: ["applePosts", id],
    queryFn: () => getSinglePost(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postsQuery?.data?.id],
    enabled:
      postsQuery?.data?.id !== null && postsQuery?.data?.id !== undefined,
    queryFn: () => getSingleUser(postsQuery?.data?.id),
  });

  useEffect(() => {
    console.log("user query ", userQuery);
  }, [userQuery]);

  if (postsQuery.isLoading) return <h1>Loading Data </h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>

      <h2>user name :
      {userQuery.isLoading
        ? "User Loading ..."
        : userQuery.isError
        ? "Error in user ..."
        : userQuery.data.name} <br />
        <small>{userQuery?.data?.company?.name}</small>
      </h2>

    </div>
  );
}

export default Post;
