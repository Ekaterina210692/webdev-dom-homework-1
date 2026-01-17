import { comments, sanitizeHtml } from "/modules/comments.js";
import { postComment, token } from "/modules/api.js";

let userName = "";

export const setUserName = (name) => {
  userName = sanitizeHtml(name);
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

  container.innerHTML = `
    <ul class="comments"></ul>
    <div class="add-form">
      <input type="text" class="add-form-name" id="name-input" value="${userName}" disabled />
      <textarea class="add-form-text" id="text-input" placeholder="Введите ваш комментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
    </div>
    <div class="comment-loading" style="display: none; margin-top: 10px;">Комментарий добавляется...</div>
  `;

  renderComments();
  initAddCommentHandler();
};

export const renderComments = () => {
  const html = comments.map((comment, index) => {
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
            <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
  }).join("");

  document.querySelector(".comments").innerHTML = html;
};

function formatDate(date) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear().toString().slice(-2)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function initAddCommentHandler() {
  const addButton = document.getElementById("add-button");
  const nameInput = document.getElementById("name-input");
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

  const index = Array.from(commentElement.parentNode.children).indexOf(commentElement);
  const comment = comments[index];
  if (!comment) return;

  textInput.value = `${comment.name}: ${comment.text}`;
});