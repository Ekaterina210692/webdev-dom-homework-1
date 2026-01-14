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

    document.querySelector(".form-loading").style.display = "block";
    document.querySelector(".add-form").style.display = "none";

    try {
      const sanitizedName = sanitizeHtml(name);
      const sanitizedComment = sanitizeHtml(comment);

      await postComment(sanitizedName, sanitizedComment);

      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";

      const updatedComments = await fetchComments();
      updateComments(updatedComments);
      renderComments();

      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";

      nameInput.value = "";
      textInput.value = "";
    } catch (error) {
      if (error.message.includes("failed to fetch")) {
        alert("нет интернета, попробуйте позже");
      } else if (error.message.includes("сервер сломался")) {
        alert("сервер сломался, попробуй позже");
      } else if (error.message.includes("имя и комментарии обязательны")) {
        alert(
          "имя пользователя и комментарий должны быть не короче 3х символов"
        );
      } else {
        alert("Произошла ошибка: " + error.message);
      }
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";
      nameInput.value = "";
      textInput.value = "";
    }
  });
};
