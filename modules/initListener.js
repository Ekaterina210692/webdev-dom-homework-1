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
      document.querySelector(".form-loading").style.display = "block";
      document.querySelector(".add-form").style.display = "none";

      const sanitizedName = sanitizeHtml(name);
      const sanitizedComment = sanitizeHtml(comment);

      await postComment(sanitizedName, sanitizedComment);

      const updatedComments = await fetchComments();
      updateComments(updatedComments);
      renderComments();
    } catch (error) {
      let message;

      if (error.message.includes("failed to fetch")) {
        message = "нет интернета, попробуйте позже";
      } else if (error.message.includes("сервер сломался")) {
        message = "сервер сломался, попробуй позже";
      } else if (error.message.includes("имя и комментарии обязательны")) {
        message =
          "имя пользователя и комментарий должны быть не короче 3х символов";
      } else {
        message = "Произошла ошибка: " + error.message;
      }

      alert(message);
    } finally {
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";

      nameInput.value = "";
      textInput.value = "";
    }
  });
};
