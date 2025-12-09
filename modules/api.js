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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка: ${response.status} ${errorText}`);
  }

  return response.json();
};