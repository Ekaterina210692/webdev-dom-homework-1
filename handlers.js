import { comments, sanitizeHtml } from "./comments.js";
import { renderComments } from "./render.js";

export const handleLikeClick = (event) => {
    event.stopPropagation();
  const likeButton = event.target.closest(".like-button");
  if (!likeButton) return;

  const commentIndex = likeButton.dataset.commentIndex;
  const comment = comments[commentIndex];

  comment.isLiked = !comment.isLiked;
  comment.likesCount += comment.isLiked ? 1 : -1;

  const likesCounter = likeButton.previousElementSibling;
  likesCounter.textContent = comment.likesCount;
  likeButton.classList.toggle("-active-like", comment.isLiked);
};

export const handleQuoteClick = (event) => {
  const commentElement = event.target.closest(".comment");
  if (!commentElement) return;

  const commentIndex = Array.from(commentElement.parentNode.children).indexOf(
    commentElement
  );
  const comment = comments[commentIndex];

  const textareaEl = document.getElementById("textarea");
  textareaEl.value = `${comment.name}: ${comment.comment}`;
};

export const handleAddComment = () => {
  const inputEl = document.getElementById("input");
  const textareaEl = document.getElementById("textarea");

  const name = inputEl.value.trim();
  const comment = textareaEl.value.trim();

  if (!name || !comment) {
    alert("Пожалуйста, укажите имя и текст комментария.");
    return;
  }

  const date = new Date();
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            comment: comment,
            date: formattedDate,
            isLiked: false,
            likesCount: 0
        })
    })
    .then(response => response.json())
    .then(() => {
        inputEl.value = '';
        textareaEl.value = '';
        renderComments();
    })
    .catch(error => 
      console.log('Ошибка отправки комментария:', error));
};
