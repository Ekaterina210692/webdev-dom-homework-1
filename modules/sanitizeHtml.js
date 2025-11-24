import { comments } from "/modules/comments.js";
import { renderComments } from "/modules/render.js"

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


