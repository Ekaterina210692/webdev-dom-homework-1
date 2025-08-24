import { comments } from "./comments.js";
import { initEventHandlers } from "./initListener.js";
import { renderComments } from "./render.js";

const buttonEl = document.getElementById("add");
const inputEl = document.getElementById("input");
const textareaEl = document.getElementById("textarea");
const commentsEl = document.querySelector(".comments");

initEventHandlers(buttonEl, inputEl, textareaEl, commentsEl);

renderComments(commentsEl);

console.log("It works!");
