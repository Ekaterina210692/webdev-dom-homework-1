import { loginUser, registerUser, setToken } from "/modules/api.js";
import { setUserName, renderApp } from "/modules/render.js";

const container = document.querySelector(".container");

export const renderLogin = () => {
  container.innerHTML = `
    <section class="add-form">
      <h1>Вход</h1>
      <form id="login-form">
      <input type="text" id="login" placeholder="Логин" required />
      <input type="password" id="password" placeholder="Пароль" required />
      <div class="form-loading" style="display: none;">Вход...</div>
      <fieldset class="add-form-registry">
        <button id="submit">Войти</button>
        <a href="#" id="back-to-main">Назад</a>
      </fieldset>
      </form>
    </section>
  `;

  document.getElementById("submit").addEventListener("submit", async () => {
    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!login || !password) {
      alert("Заполните все поля");
      return;
    }

    document.querySelector(".form-loading").style.display = "block";

    try {
      const token = await loginUser(login, password);
      setToken(token);
      setUserName(login);
      renderApp();
    } catch (error) {
      alert("Ошибка: " + error.message);
    } finally {
      document.querySelector(".form-loading").style.display = "none";
    }
  });

  document.getElementById("back-to-main").addEventListener("click", (e) => {
    e.preventDefault();
    renderApp();
  });
};

export const renderRegister = () => {
  container.innerHTML = `
    <section class="add-form">
      <h1>Регистрация</h1>
      < id="register-form">
      <input type="text" id="reg-name" placeholder="Имя" required  />
      <input type="text" id="reg-login" placeholder="Логин" required  />
      <input type="password" id="reg-password" placeholder="Пароль" required  />
      <div class="form-loading" style="display: none;">Регистрация...</div>
      <fieldset class="add-form-registry">
        <button id="submit">Зарегистрироваться</button>
        <a href="#" id="back-to-main">Назад</a>
      </fieldset>
      </form>
    </section>
  `;

  document.getElementById("subit").addEventListener("submit", async () => {

    const name = document.getElementById("reg-name").value.trim();
    const login = document.getElementById("reg-login").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!name || !login || !password) {
      alert("Заполните все поля");
      return;
    }

    document.querySelector(".form-loading").style.display = "block";

    try {
      await registerUser(name, login, password);
      alert("Регистрация успешна! Войдите в систему.");
      renderLogin();
    } catch (error) {
      alert("Ошибка: " + error.message);
    } finally {
      document.querySelector(".form-loading").style.display = "none";
    }
  });

  document.getElementById("back-to-main").addEventListener("click", () => {
    renderApp();
  });
};