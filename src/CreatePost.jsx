import { isError, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react"
import { createPost } from "./api/posts";
import Post from "./Post";

const CreatePost = ({ setCurrentPage }) => {
  const queryClient = useQueryClient();
  const titleRef = useRef();
  const bodyRef = useRef();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess:(data)=>{
      console.log("data", data);
      // queryClient.setQueriesData(["posts",data.id],data)
      // queryClient.invalidateQueries(["posts"],{exect:true})
      // setCurrentPage(<Post id={data.id}/>)
      setCurrentPage(<Post id={4} />)
    }
  })

  const handleSubmit =(e)=>{
    e.preventDefault();
    createPostMutation.mutate({
      title:titleRef.current.value,
      body: bodyRef.current.value
    })

  }
  return (

    <div >
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button type="submit" disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading ...":"Create"}
        </button>

      </form>
    </div>
  )
}
export default CreatePost