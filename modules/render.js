import { comments, sanitizeHtml, updateComments } from "/modules/comments.js";
import { postComment, token, fetchComments } from "/modules/api.js";

let userName = "";

export const setUserName = (name) => {
  userName = sanitizeHtml(name);
};

export const loadComments = async () => {
  const container = document.querySelector(".container");

  try {
    container.innerHTML = `
      <ul class="comments"></ul>
      <div class="app-loader">Загрузка комментариев...</div>
    `;

    const loadedComments = await fetchComments();
    updateComments(loadedComments);
    renderComments();
  } catch (error) {
    alert("Ошибка загрузки комментариев: " + error.message);
    renderApp(); 
  }
};

export const renderApp = () => {
  const container = document.querySelector(".container");

  if (!token) {
    container.innerHTML = `
      <ul class="comments"></ul>
      <p>Чтобы отправить комментарий, <button id="login-button">Войти</button> или <button id="register-button">Зарегистрироваться</button></p>
    `;
    return;
  }

  loadComments();
};

export const renderComments = () => {
  const html = comments
    .map((comment, index) => {
      return `
      <li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${formatDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCount}</span>
            <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
    })
    .join("");

  document.querySelector(".comments").innerHTML = html;
};

function formatDate(date) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear().toString().slice(-2)} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function initAddCommentHandler() {
  const addButton = document.getElementById("add-button");
  const textInput = document.getElementById("text-input");
  const loading = document.querySelector(".comment-loading");

  addButton.addEventListener("click", async () => {
    const text = textInput.value.trim();
    if (!text) {
      alert("Введите комментарий");
      return;
    }

    addButton.disabled = true;
    loading.style.display = "block";

    try {
      await postComment(userName, sanitizeHtml(text));
      await loadComments();
    } catch (error) {
      alert(error.message);
    } finally {
      addButton.disabled = false;
      loading.style.display = "none";
      textInput.value = "";
    }
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".like-button");
  if (!button) return;

  const index = button.dataset.index;
  const comment = comments[index];
  if (!comment) return;

  comment.isLiked = !comment.isLiked;
  comment.likesCount += comment.isLiked ? 1 : -1;

  button.previousElementSibling.textContent = comment.likesCount;
  button.classList.toggle("-active-like", comment.isLiked);
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".like-button")) return;

  const commentElement = event.target.closest(".comment");
  if (!commentElement) return;

  const index = Array.from(commentElement.parentNode.children).indexOf(
    commentElement,
  );
  const comment = comments[index];
  if (!comment) return;

  const textInput = document.getElementById("text-input");
  textInput.value = `${comment.name}: ${comment.text}`;
});

document.addEventListener("DOMContentLoaded", () => {
  if (token) {
    loadComments();
  }
});
