import { token } from "/modules/api.js";
import { renderApp, loadComments } from "/modules/render.js";
import { renderLogin, renderRegister } from "/modules/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  loadComments();

  document.addEventListener("click", (event) => {
    if (event.target.id === "login-button") {
      renderLogin();
    }
    if (event.target.id === "register-button") {
      renderRegister();
    }
  });
});