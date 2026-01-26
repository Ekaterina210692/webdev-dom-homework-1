import { comments, sanitizeHtml, updateComments } from "/modules/comments.js";
import { postComment, token, fetchComments } from "/modules/api.js";

let userName = "";

export const setUserName = (name) => {
  userName = sanitizeHtml(name);
};

export const renderApp = () => {
  const container = document.querySelector(".container");
  if (!container) return;

  renderComments();
  renderAddForm();
};

export const renderComments = () => {
  if (!comments || comments.length === 0) {
    return;
  }

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

  const commentsList = document.querySelector(".comments");
  if (commentsList) {
    commentsList.innerHTML = html;
  }
};

export const renderAddForm = () => {
  const container = document.querySelector(".container");
  if (!container) return;

  let formContainer = container.querySelector(".add-form-container");
  if (!formContainer) {
    formContainer = document.createElement("div");
    formContainer.className = "add-form-container";
    container.appendChild(formContainer);
  }
  if (!token) {
    formContainer.innerHTML = `
      <p>Чтобы отправить комментарий, 
        <button id="login-button">Войти</button> 
        или 
        <button id="register-button">Зарегистрироваться</button>
      </p>
    `;
  } else {
    formContainer.innerHTML = `
      <div class="add-form">
        <input type="text" class="add-form-name" id="name-input" value="${userName}" disabled />
        <textarea class="add-form-text" id="text-input" placeholder="Введите ваш комментарий" rows="4"></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button">Написать</button>
        </div>
      </div>
      <div class="comment-loading" style="display: none; margin-top: 10px;">Комментарий добавляется...</div>
    `;
    initAddCommentHandler(formContainer);
  }

  container.appendChild(formContainer);
}

export const loadComments = async () => {
  const container = document.querySelector(".container");
  if (!container) return;

  try {
    const formContainer = document.querySelector(".add-form-container");
    if (formContainer) {
      formContainer.innerHTML = `<div class="app-loader">Загрузка комментариев...</div>`;
    }

    const loadedComments = await fetchComments();
    updateComments(loadedComments);
    renderComments();
    renderAddForm();
  } catch (error) {
    console.error("Ошибка загрузки:", error);

    const formContainer = document.querySelector(".add-form-container");
    if (formContainer) {
      formContainer.innerHTML = `<p>Ошибка загрузки комментариев. <button id="retry">Попробовать снова</button></p>`;
      document.getElementById("retry").addEventListener("click", loadComments);
    }
  }
}

function formatDate(date) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear().toString().slice(-2)} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function initAddCommentHandler(formContainer) {
  const addButton = document.getElementById("add-button");
  const textInput = document.getElementById("text-input");
  const loading = document.querySelector(".comment-loading");

  if (!addButton || !textInput || !loading) {
    console.error("Элементы формы не найдены");
    return;
  }

  addButton.addEventListener("click", async () => {
    const text = textInput.value.trim();
    
    if (text.length < 5) {
      alert("Комментарий должен содержать минимум 5 символов");
      return;
    }

    addButton.disabled = true;
    loading.style.display = "block";

    try {
      const newComment = await postComment(userName, text);
      await loadComments(); 
    } catch (error) {
      alert("Ошибка при отправке комментария: " + error.message);
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

  const textInput = document.getElementById("text-input");
  if (textInput) {
    textInput.value = `${comment.name}: ${comment.text}`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    setUserName(savedName);
  }
  renderApp(); 
});