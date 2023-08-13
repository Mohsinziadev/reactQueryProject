import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PostList1 from "./PostList1";
import PostList2 from "./PostList2";

const POSTS = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
];

function App() {

  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject("error here in api call"),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() => {
        POSTS.push({ id: crypto.randomUUID(), title });
      });
    },
    onSuccess:()=>{
      console.log("sucess ");
       queryClient.invalidateQueries(["post"]);
    }
  });

  if (postsQuery.isLoading) return <h1>Loading Data </h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

// another example
const [currentPage ,setCurrentPage] = useState(<PostList1 />)
  return (
    <div>
      {postsQuery.data.map((post) => {
        return (
          <div key={post.id}>
            <h4>{post.title}</h4>
          </div>
        );
      })}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("New post ")}
      >
        Add Post{" "}
      </button>
      <br />
      <div>
        <div>
          <button onClick={() => setCurrentPage(<PostList1 />)}>
            Post List 1
          </button>
          <button onClick={() => setCurrentPage(<PostList2 />)}>
            Post List 1
          </button>
        </div>
        {currentPage}
      </div>
    </div>
  );
}

function wait(duriation) {
  return new Promise((resolve) => setTimeout(resolve, duriation));
}

export default App;
