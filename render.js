import { comments } from "./comments.js";
import { handleLikeClick, handleQuoteClick } from "./handlers.js";

export const renderComments = () => {
  const personalKey = 'ekaterina-vasileva'; 
  
  fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const commentsEl = document.querySelector('.comments');
      commentsEl.innerHTML = '';

      data.comments.forEach((comment, index) => {
        const commentElement = document.createElement('li');
        commentElement.className = 'comment';

        commentElement.innerHTML = `
            <div class="comment-header">
                <div>${comment.author.name}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${comment.text}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''}" 
                            data-comment-index="${index}"></button>
                </div>
            </div>
        `;

        commentElement
          .querySelector('.like-button')
          .addEventListener('click', handleLikeClick);
        commentElement.addEventListener('click', handleQuoteClick);
        commentsEl.appendChild(commentElement);
      });
    })
    .catch(() => {
      alert('Произошла ошибка');
    });
};
