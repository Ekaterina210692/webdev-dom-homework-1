import { comments, sanitizeHtml } from './comments.js';
import { renderComments } from './render.js';

export const initEventHandlers = (buttonEl, inputEl, textareaEl, commentsEl) => {
  buttonEl.addEventListener('click', () => {
    const name = inputEl.value;
    const comment = textareaEl.value;

    const sanitizedName = sanitizeHtml(name);
    const sanitizedComment = sanitizeHtml(comment);

    if (!sanitizedName || !sanitizedComment) {
      alert('Пожалуйста, укажите имя и текст комментария.');
      return;
    }

    const date = new Date();
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    const newComment = {
      name: sanitizedName,
      comment: sanitizedComment,
      date: formattedDate,
      isLiked: false,
      likesCount: 0,
    };

    comments.push(newComment);
    renderComments(commentsEl, textareaEl);

    inputEl.value = '';
    textareaEl.value = '';
  });

  commentsEl.addEventListener('click', handleLikeClick);
};

export const handleLikeClick = (event) => {
  const likeButton = event.target;
  if (!likeButton.classList.contains('like-button')) return;

  const commentIndex = likeButton.dataset.commentIndex;
  const comment = comments[commentIndex];

  comment.isLiked = !comment.isLiked;
  comment.likesCount = comment.isLiked
    ? comment.likesCount + 1
    : comment.likesCount - 1;

  if (comment.isLiked) {
    likeButton.classList.add('-active-like');
  } else {
    likeButton.classList.remove('-active-like');
  }

  renderComments();
};