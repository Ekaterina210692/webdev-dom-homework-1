import { loginUser, registerUser, setToken } from "/modules/api.js";
import { setUserName, renderApp } from "/modules/render.js";

export const renderLogin = () => {
  const container = document.querySelector(".container");
  if (!container) return;

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

  const form = container.querySelector("#login-form");
  const loading = container.querySelector(".form-loading");
  
  if (!form || !loading) {
    console.error("Элементы формы не найдены");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const login = form.querySelector("#login").value.trim();
    const password = form.querySelector("#password").value.trim();

      if (!login || !password) {
        alert("Заполните все поля");
        return;
      }

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

  container.querySelector("#back-to-main").addEventListener("click", (e) => {
    e.preventDefault();
    renderApp();
  });
};
const validateForm = (name, login, password) => {
  if (!name || !login || !password) {
    return "Заполните все поля";
  }
  if (password.length < 6) {
    return "Пароль должен быть не менее 6 символов";
  }
  return null;
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

const form = container.querySelector("#register-form");
  const loading = container.querySelector(".form-loading");
  
  if (!form || !loading) {
    console.error("Элементы формы не найдены");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("#reg-name").value.trim();
    const login = form.querySelector("#reg-login").value.trim();
    const password = form.querySelector("#reg-password").value.trim();

    const error = validateForm(name, login, password);
    if (error) {
      alert(error);
      return;
    }

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

  container.querySelector("#back-to-main").addEventListener("click", (e) => {
    e.preventDefault();
    renderApp();
  });
};