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
  const response = await fetch(baseUrl + "/comments", {
    method: "POST",
    body: JSON.stringify({ name, text }),
  });

  then((response) => {
    if (response.status === 500) {
      throw new Error("сервер сломался, попробуй позже");
    }
    if (response.status === 400) {
      throw new Error("имя и комментарии обязательны");
    }
    if (response.status === 201) {
      return response.json();
    }
  });

  then(() => {
    return fetchComments();
  });
};
