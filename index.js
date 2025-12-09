import { fetchComments } from "/modules/api.js";
import { comments, updateComments } from "/modules/comments.js";
import { renderComments } from "/modules/render.js";
import { initAddCommentHandler } from "/modules/initListener.js";

fetchComments()
  .then((loadedComments) => {
    updateComments(loadedComments);
    renderComments();
  })
  .catch((error) => {
    console.error("Не удалось загрузить комментарии:", error);
    alert("Ошибка загрузки данных");
  });

initAddCommentHandler(renderComments);

document.addEventListener("click", (event) => {
  const button = event.target.closest(".like-button");
  if (!button) return;

  const index = button.dataset.commentIndex;
  if (index === undefined || index === null) return;
  
  const comment = comments[index];
  if (!comment) return;

  comment.isLiked = !comment.isLiked;
  comment.likesCount += comment.isLiked ? 1 : -1;

  button.previousElementSibling.textContent = comment.likesCount;
  button.classList.toggle("-active-like", comment.isLiked);
});

const handleQuoteClick = (event) => {
  const commentElement = event.target.closest(".comment");
  if (!commentElement) return;

  const commentIndex = Array.from(commentElement.parentNode.children).indexOf(commentElement);
  const comment = comments[commentIndex];

  if (!comment) return;

  const textareaEl = document.getElementById("textarea");
  textareaEl.value = `${comment.name}: ${comment.text}`;
};

document.addEventListener("click", handleQuoteClick);

