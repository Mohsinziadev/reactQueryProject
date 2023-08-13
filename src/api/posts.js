import axios from "axios";

export async function getPosts() {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data;
}
export async function getSinglePost(id) {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return  res.data;
}

export async function getSingleUser(id) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return res.data;
}
