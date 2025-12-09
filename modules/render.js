import { comments } from "/modules/comments.js";

export const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    return `
      <li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${formatDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCount}</span>
            <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-comment-index="${index}"></button>
          </div>
        </div>
      </li>`;
  }).join("");

  document.querySelector(".comments").innerHTML = commentsHtml;
};

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}