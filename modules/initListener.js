import { postComment } from "./api";
import { comments, updateComments } from "./comments";
import { renderComments } from "./render";
import { handleAddComment } from "/modules/sani.js";

export const initAddCommentHandler = () => {
  document.getElementById("add").addEventListener("click", handleAddComment);
};

export const ytytgth = () => {
  const text = document.getElementById("text-input");
  const commentsElements = document.querySelectorAll(".comment");

  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const currentComment = comments[commentElement.dataset.index];
      text.value = `${currentComment.name}: ${currentComment.text}`;
    });
  }
};

export const initAddCommentListener = (renderComments) => {
  const name = document.getElementById("name-input");
  const text = document.getElementById("text-input");
  const addButton = document.querySelector(".add-from-button");

  addButton.addEventListener("click", () => {
    if (!name.value || !text.value) {
      console.error("заполните форму");
      return;
    }

    postComment(sanitizeHtml(text.value), sanitizeHtml(name.value)).then((data) => {
      updateComments(date)
      renderComments()
      name.value = ""
      text.value = ""
    });
  });
};
