import { fetchComments, postComment } from "/modules/api.js";
import { updateComments, sanitizeHtml } from "/modules/comments.js";

export const initAddCommentHandler = (renderComments) => {
  const nameInput = document.getElementById("input");
  const textInput = document.getElementById("textarea");
  const addButton = document.getElementById("add");

  addButton.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const comment = textInput.value.trim();

    if (!name || !comment) {
      alert("Заполните все поля!");
      return;
    }

    try {
      const sanitizedName = sanitizeHtml(name);
      const sanitizedComment = sanitizeHtml(comment);

      await postComment(sanitizedName, sanitizedComment);

      const updatedComments = await fetchComments();
      updateComments(updatedComments);
      renderComments();

      nameInput.value = "";
      textInput.value = "";
    } catch (error) {
      console.error("Ошибка:", error);
      alert("error.message");
    }
  });
};