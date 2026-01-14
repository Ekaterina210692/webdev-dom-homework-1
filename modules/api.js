const baseUrl = "https://wedev-api.sky.pro/api/v1/ekaterinasin";

export const fetchComments = () => {
  return fetch(baseUrl + "/comments")
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
  try {
const response = await fetch(baseUrl + "/comments", {
      method: "POST",
      body: JSON.stringify({ name, text }),
    });

    if (!response.ok) {
      switch (response.status) {
        case 500:
          throw new Error("сервер сломался, попробуй позже");
        case 400:
          throw new Error("имя и комментарии обязательны");
        default:
          throw new Error("Произошла ошибка при отправке");
      }
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
  }
