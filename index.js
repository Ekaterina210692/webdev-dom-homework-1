import { fetchComments } from "/modules/api.js";
import { updateComments } from "/modules/comments.js";
import { initAddCommentHandler } from "/modules/initListener.js";
import { renderComments } from "/modules/render.js";

fetchComments().then(() => {
    updateComments()
    renderComments()
})

initAddCommentHandler()
