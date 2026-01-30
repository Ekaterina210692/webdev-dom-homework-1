import { getToken, setToken } from "/modules/api.js";
import { renderApp, loadComments } from "/modules/render.js";
import { renderLogin, renderRegister } from "/modules/auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const savedToken = getToken();

    if (savedToken) {
      setToken(savedToken);
    }

    await loadComments();
    renderApp();
  } catch (error) {
    console.error("Ошибка при инициализации:", error);
    alert("Произошла ошибка при загрузке приложения");
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
