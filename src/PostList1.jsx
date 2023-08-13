import "./App.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

const POSTS = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
];

function PostList1() {

  const postsQuery = useQuery({
    queryKey: ["post"],
    queryFn: getPosts,

  });

  if (postsQuery.isLoading) return <h1>Loading Data </h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      <h1>Post list 1</h1>
      {postsQuery.data.map((post) => {
        return (
          <div key={post.id}>
            <h4>{post.title}</h4>
          </div>
        );
      })}

    </div>
  );
}

function wait(duriation) {
  return new Promise((resolve) => setTimeout(resolve, duriation));
}

export default PostList1;
