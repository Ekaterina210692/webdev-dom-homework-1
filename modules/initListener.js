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

      nameInput.value = "";
      textInput.value = "";
    } catch (error) {
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".add-form").style.display = "flex";

      if (error.massage === "failed to fetch") {
        alert(
          "нет интернета, попробуйте позже"
        );
      }

      if (error.massage === "ошибка сервера") {
        alert(
          "сервер сломался, попробуй позже"
        );
      }

      if (error.massage === "имя и комментарий обязательны") {
        alert(
          "имя пользователя и комментарий должны быть не короче 3х символов"
        );
      }
      nameInput.value = "";
      textInput.value = "";
    }
  });
};
