const baseUrl = "https://wedev-api.sky.pro/api/v2/ekaterinasin";
const authHost = "https://wedev-api.sky.pro/api/user";

let token = "";

export const setToken = (newToken) => {
 if (!newToken) {
    console.error('Попытка сохранить пустой токен!');
    return;
  }

  token = newToken;
  localStorage.setItem('token', newToken);
  console.log('Токен сохранен:', newToken);
};

export const getToken = () => {
  const savedToken = localStorage.getItem('token');
  if (!savedToken) {
    console.warn('Токен не найден в localStorage');
  }
  
  return savedToken || '';
};;

export const fetchComments = async () => {
  try {
    const response = await fetch(baseUrl + "/comments");

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
    const currentToken = getToken();
    console.log('Текущий токен:', currentToken);
    
    if (!currentToken) {
      throw new Error('Токен отсутствует');
    }
    
    if (typeof name !== 'string' || typeof text !== 'string' || !name.trim() || !text.trim()) {
      throw new Error("Некорректные данные комментария");
    }

    const response = await fetch(baseUrl + "/comments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentToken}`,
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
      throw new Error(`HTTP ошибка: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Ошибка при отправке комментария: ${error.message}`);
  }
}

export const loginUser = async (login, password) => {
  try {
    const response = await fetch(`${authHost}/login`, {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
      throw new Error("Неверные логин или пароль");
    }

    const data = await response.json();
    console.log('Полученные данные при авторизации:', data);

    if (!data.token) {
      throw new Error('Токен не получен');
    }
console.log('Полученный токен:', data.user.token);

setToken(data.user.token);
    return data.token;
  } catch (error) {
    throw new Error(`Ошибка авторизации: ${error.message}`);
  }
};

export const registerUser = async (name, login, password) => {
  try {
    const response = await fetch(`${authHost}`, {
      method: "POST",
      body: JSON.stringify({ name, login, password }),
    });

    if (!response.ok) {
       throw new Error('Ошибка регистрации');
    }

    const data = await response.json();
    console.log('Полученные данные при регистрации:', data);
    
    if (!data.token) {
      throw new Error('Токен не получен');
    }

    return data.token;
  } catch (error) {
    throw new Error(`Ошибка регистрации: ${error.message}`);
  }
}