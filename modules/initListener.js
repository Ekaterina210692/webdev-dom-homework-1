import { postComment } from "/modules/api.js";
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
      const sanitizedComment = sanitizeHtml(comment);
      const sanitizedName = sanitizeHtml(name);

      const response = await postComment(sanitizedComment, sanitizedName);

      if (!response || !response.comments) {
        throw new Error("Неверный ответ от сервера");
      }

      updateComments(response.comments);
      renderComments();
      nameInput.value = "";
      textInput.value = "";
    } catch (error) {
      console.error("Произошла ошибка при отправке комментария:", error);
      alert("Не удалось отправить комментарий. Попробуйте позже.");
    } finally {
      nameInput.value = "";
      textInput.value = "";
    }
  });
};
