import { loginUser, registerUser, setToken } from "/modules/api.js";
import { setUserName, renderApp } from "/modules/render.js";

export const renderLogin = () => {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <section class="add-form">
      <h1>Вход</h1>
      <form id="login-form">
        <input type="text" id="login" placeholder="Логин" required />
        <input type="password" id="password" placeholder="Пароль" required />
        <div class="form-loading" style="display: none;">Вход...</div>
        <fieldset class="add-form-registry">
          <button type="submit">Войти</button>
          <a href="#" id="back-to-main">Назад</a>
        </fieldset>
      </form>
    </section>
  `;

  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const login = document.getElementById("login").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!login || !password) {
        alert("Заполните все поля");
        return;
      }

      const loading = document.querySelector(".form-loading");
      loading.style.display = "block";

      try {
        const newToken = await loginUser(login, password);
        setToken(newToken);
        setUserName(login);
        localStorage.setItem("userName", login);
        renderApp();
      } catch (error) {
        alert("Ошибка входа: " + error.message);
      } finally {
        loading.style.display = "none";
      }
    });

  document.getElementById("back-to-main").addEventListener("click", (e) => {
    e.preventDefault();
    renderApp();
  });
};

export const renderRegister = () => {
  const container = document.querySelector(".container");
  if (!container) return;

  container.innerHTML = `
    <section class="add-form">
      <h1>Регистрация</h1>
      <form id="register-form">
        <input type="text" id="reg-name" placeholder="Имя" required />
        <input type="text" id="reg-login" placeholder="Логин" required />
        <input type="password" id="reg-password" placeholder="Пароль" required />
        <div class="form-loading" style="display: none;">Регистрация...</div>
        <fieldset class="add-form-registry">
          <button type="submit">Зарегистрироваться</button>
          <a href="#" id="back-to-main">Назад</a>
        </fieldset>
      </form>
    </section>
  `;

  const form = document.getElementById("register-form");
  if (!form) {
    console.error("Форма не найдена после рендера");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("reg-name").value.trim();
    const login = document.getElementById("reg-login").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!name || !login || !password) {
      alert("Заполните все поля");
      return;
    }

    const loading = document.querySelector(".form-loading");
    loading.style.display = "block";

    try {
      await registerUser(name, login, password);
      alert("Регистрация успешна! Войдите в систему.");
      renderLogin();
    } catch (error) {
      alert("Ошибка: " + error.message);
    } finally {
      loading.style.display = "none";
    }
  });

  document.getElementById("back-to-main").addEventListener("click", (e) => {
    e.preventDefault();
    renderApp();
  });
};