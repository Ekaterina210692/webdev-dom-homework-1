const baseUrl = "https://wedev-api.sky.pro/api/v2/ekaterinasin";
const authHost = "https://wedev-api.sky.pro/api/user";

export let token = localStorage.getItem("token") || "";

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem("token", newToken);
};

export const fetchComments = () => {
  return fetch(baseUrl + "/comments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка загрузки");
      return response.json();
    })
    .then((data) => {
      return data.comments.map((comment) => ({
        name: comment.author.name,
        text: comment.text,
        date: new Date(comment.date),
        isLiked: false,
        likesCount: comment.likes,
      }));
    });
};

export const postComment = async (name, text) => {
  const response = await fetch(baseUrl + "/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, text }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 400) throw new Error("Имя и комментарий обязательны");
    if (response.status === 500) throw new Error("Сервер сломался, попробуй позже");
    throw new Error(`Ошибка: ${response.status}`);
  }

  return response.json();
};

export const loginUser = async (login, password) => {
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
};

export const registerUser = async (name, login, password) => {
  const response = await fetch(authHost, {
    method: "POST",
    body: JSON.stringify({ name, login, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 409) throw new Error("Пользователь с таким логином уже существует");
    if (response.status === 400) throw new Error("Неверные данные");
    throw new Error("Ошибка регистрации");
  }

  return response;
};