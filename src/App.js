import { useState } from "react";
import "./App.css";
import PostList1 from "./PostList1";
import PostList2 from "./PostList2";
import Post from "./Post";
import CreatePost from "./CreatePost";
import AddPost from "./AddPost";
import PostListPagination from "./PostListPagination";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />);

  return (
    <div>
      <div style={{ display: "flex", gap: "40px", padding: "40px" }}>
        <div style={{ minWidth: "fit-content" }}>
          <div>
            <button onClick={() => setCurrentPage(<AddPost />)}>
              Add Post
            </button>
            <button onClick={() => setCurrentPage(<PostList1 />)}>
              Post List 1
            </button>
            <button onClick={() => setCurrentPage(<PostList2 />)}>
              Post List 2
            </button>
            <button onClick={() => setCurrentPage(<Post id={1} />)}>
              first post{" "}
            </button>
            <button
              onClick={() =>
                setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
              }
            >
              New Post
            </button>
            <button onClick={() => setCurrentPage(<PostListPagination />)}>
              Post List Pagination
            </button>
          </div>
          {currentPage}
        </div>
      </div>
    </div>
  );
}
export default App;
