import axios from "axios";
export const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/comments",
  timeout: 30000,
  headers: { "X-Custom-Header": "foobar" },
});
