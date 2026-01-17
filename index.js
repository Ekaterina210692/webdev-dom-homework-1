import { token } from "/modules/api.js";
import { setUserName, renderApp } from "/modules/render.js";
import { renderLogin, renderRegister } from "/modules/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  if (!container) return;

  if (token) {
    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);
    renderApp();
  } else {
    renderApp();
  }

  document.addEventListener("click", (event) => {
    if (event.target.id === "login-button") {
      renderLogin();
    }
    if (event.target.id === "register-button") {
      renderRegister();
    }
  });
});