const key = "https://wedev-api.sky.pro/api/v1/ekaterinasin";

export const fetchComments = () => {
  return fetch(key + "/comments")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          text: comment.text,
          date: new Date(comment.date),
          isLiked: false,
          likesCount: comment.likes,
        };
      });

      return appComments;
    });
};

export const postComment = (text, name) => {
  return fetch(key + "/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
      name,
    }),
  }).then(() => {
    return fetchComments();
  });
};
