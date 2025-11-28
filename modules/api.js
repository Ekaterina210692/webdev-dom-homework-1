const bazeUrl = "https://wedev-api.sky.pro/api/v1/ekaterinasin";

export const fetchComments = () => {
  return fetch(bazeUrl + "/comments")
    .then((response) => response.json())
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
 return {
        name: comment.author.name,
        text: comment.text,
        date: new Date(comment.date),
        isLiked: false,
        likesCount: comment.likes,
        }
      })
      return appComments
})
}

export const postComment = async (comment, name) => {
    try {
        const response = await fetch('https://wedev-api.sky.pro/api/v1/ekaterinasin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                comment: comment
            })
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};
