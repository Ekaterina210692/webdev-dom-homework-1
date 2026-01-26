const baseUrl = "https://wedev-api.sky.pro/api/v2/ekaterinasin";
const authHost = "https://wedev-api.sky.pro/api/user";

export let token = localStorage.getItem("token") || "";

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem("token", newToken);
};

export const fetchComments = async () => {
  try {
    if (!token) {
      throw new Error("Отсутствует токен авторизации");
    }

    const response = await fetch(baseUrl + "/comments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка загрузки");
    }

    const data = await response.json();

    if (!data.comments) {
      throw new Error("В ответе отсутствует поле comments");
    }

    return data.comments.map((comment) => ({
      name: comment.author.name,
      text: comment.text,
      date: new Date(comment.date),
      isLiked: false,
      likesCount: comment.likes,
    }));
  } catch (error) {
    throw new Error(`Ошибка при загрузке комментариев: ${error.message}`);
  }
};

export const postComment = async (name, text) => {
  try {
    if (!token) {
      throw new Error("Токен отсутствует. Выполните вход в систему.");
    }
    
    if (typeof name !== 'string' || typeof text !== 'string' || !name.trim() || !text.trim()) {
      throw new Error("Некорректные данные комментария");
    }

    const response = await fetch(baseUrl + "/comments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error("Ошибка авторизации. Токен недействителен.");
      }
      if (response.status === 400) {
        throw new Error("Имя и комментарий обязательны");
      }
      if (response.status === 500) {
        throw new Error("Сервер сломался, попробуй позже");
      }
      throw new Error(`Ошибка: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Ошибка при отправке комментария: ${error.message}`);
  }
}

export const loginUser = async (login, password) => {
  try {
    const response = await fetch(authHost + "/login", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Неверные логин или пароль");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    throw new Error(`Ошибка авторизации: ${error.message}`);
  }
};

export const registerUser = async (name, login, password) => {
  try {
    const response = await fetch(authHost, {
      method: "POST",
      body: JSON.stringify({ name, login, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 409) {
        throw new Error("Пользователь с таким логином уже существует");
      }
      if (response.status === 400) {
        throw new Error("Неверные данные");
      }
      throw new Error("Ошибка регистрации");
    }

    return response;
  } catch (error) {
    throw new Error(`Ошибка регистрации: ${error.message}`);
  }
};