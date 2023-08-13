import axios from "axios";

export async function getPosts() {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data;
}
export async function getPostsPaginate(page) {
  const res = await axios.get(`https://dummyjson.com/products?page=${page}&limit=10`);
  return res.data;
}

export async function getSinglePost(id) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return res.data;
}

export async function getSingleUser(id) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return res.data;
}

export async function createPost({ title, body }) {
  const res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
    title,
    body,
    userId: 1,
    id: Date.now(),
  });
  return res.data;
}
