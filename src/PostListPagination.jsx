import { useQuery } from "@tanstack/react-query";
import {  getPostsPaginate } from "./api/posts";
import { useState } from "react";

function PostListPagination() {
  const [page, setpage] = useState(1);

  const {  error, data, isPreviousData, isLoading, isError } = useQuery({
    queryKey: ["applePost", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginate(page),
  });

  if (isLoading) return <h1>Loading Data </h1>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;
  if (!Array.isArray(data.products)) {
    return <h1>No data available</h1>;
  }
  return (
    <div>
      <h1>Post list Pagination </h1>
      {isPreviousData && "previous data"}
      {data?.products?.map((post) => {
        return (
          <div key={post.id}>
            <h4>{post.title}</h4>
          </div>
        );
      })}

      <button onClick={() => setpage(page - 1)}>Previous</button>

      <button onClick={() => setpage(page + 1)}>Next</button>
    </div>
  );
}

export default PostListPagination;
