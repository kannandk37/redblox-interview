import { instance } from "../../core/axios/index.js";
import { storage } from "../../core/storage/index.js";
export async function fetchComments() {
  try {
    let response = await instance.get();
    storage.setItem("comments", JSON.stringify(response?.data));
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
