import { handleAddComment } from "./handlers.js";

export const initAddCommentHandler = () => {
  document.getElementById("add").addEventListener("click", handleAddComment);
};