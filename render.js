import { comments } from './comments.js';
import { handleLikeClick } from './initListener.js';

export const renderComments = (commentsEl, textareaEl) => {
    commentsEl.innerHTML = '';

    comments.forEach((comment, index) => {
        const newComment = document.createElement('li');
        newComment.classList.add('comment');

        newComment.innerHTML = `
            <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${comment.comment}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likesCount}</span>
                    <button 
                        class="like-button ${comment.isLiked ? '-active-like' : ''}"
                        data-comment-index="${index}"
                    ></button>
                </div>
            </div>
        `;

        const likeButton = newComment.querySelector('.like-button');
        likeButton.addEventListener('click', handleLikeClick);

        newComment.addEventListener('click', (event) => {
            if (event.target.classList.contains('like-button')) {
                event.stopPropagation();
                return;
            }

            textareaEl.value = `${comment.name}: ${comment.comment}`;
        });

        commentsEl.appendChild(newComment);
    });
};

export const updateComment = (index) => {
    const comment = comments[index];
    const commentEl = document.querySelector(`.comment:nth-child(${index + 1})`);
    
    if (!commentEl) return;

    commentEl.querySelector('.comment-header div:first-child').textContent = comment.name;
    commentEl.querySelector('.comment-header div:last-child').textContent = comment.date;
    commentEl.querySelector('.comment-text').textContent = comment.comment;
    commentEl.querySelector('.likes-counter').textContent = comment.likesCount;
    
    const likeButton = commentEl.querySelector('.like-button');
    if (comment.isLiked) {
        likeButton.classList.add('-active-like');
    } else {
        likeButton.classList.remove('-active-like');
    }
};

export const clearComments = (commentsEl) => {
    commentsEl.innerHTML = '';
};