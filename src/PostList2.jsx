
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
import { useEffect } from "react";

function PostList2() {

  const postsQuery = useQuery({
    queryKey: ["applePost"],
    queryFn: getPosts,

  });

  if (postsQuery.isLoading) return <h1>Loading Data </h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  if (!Array.isArray(postsQuery.data.products)) {
    return <h1>No data available</h1>;
  }

  return (
    <div>
      <h1>Post list 2</h1>
      {postsQuery?.data?.products?.map((post) => {
        return (
          <div key={post.id}>
            <h4>{post.title}</h4>
          </div>
        );
      })}

    </div>
  );
}

export default PostList2;
