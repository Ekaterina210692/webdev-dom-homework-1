import { getToken, setToken, getName } from "/modules/api.js";
import { renderApp, loadComments } from "/modules/render.js";
import { renderLogin, renderRegister } from "/modules/auth.js";
import { setUserName } from "./modules/render.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log('Инициализация приложения');
    const savName = getName()
     if (savName) {
      setUserName(savName);
    }
    const savedToken = getToken();
    console.log('Сохраненный токен:', savedToken);
    
    if (savedToken) {
      setToken(savedToken);
    }
    
    await loadComments();
    renderApp();
  } catch (error) {
    console.error("Ошибка при инициализации:", error);
    alert("Произошла ошибка при загрузке приложения");
  }
});
document.addEventListener("click", (event) => {
  if (event.target.id === "login-button") {
    renderLogin();
  }
  if (event.target.id === "register-button") {
    renderRegister();
  }
});
