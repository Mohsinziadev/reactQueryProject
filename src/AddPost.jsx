import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
];
const AddPost = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() => {
        POSTS.push({ id: crypto.randomUUID(), title });
      });
    },
    onSuccess: () => {
      console.log("sucess ");
      queryClient.invalidateQueries(["post"]);
    },
  });

  if (postsQuery.isLoading) return <h1>Loading Data </h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  return (
    <div>
      {postsQuery?.data?.map((post) => {
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
        Add Post
      </button>
      <br />
    </div>
  )
}
function wait(duriation) {
  return new Promise((resolve) => setTimeout(resolve, duriation));
}
export default AddPost