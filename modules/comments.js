export let comments = [
  {
    name: "Глеб Фокин",
    comment: "Это будет первый комментарий на этой странице",
    date: "12.02.22 12:18",
    isLiked: false,
    likesCount: 3,
  },
  {
    name: "Варвара Н.",
    comment: "Мне нравится как оформлена эта страница! ❤",
    date: "13.02.22 19:22",
    isLiked: true,
    likesCount: 75,
  },
]

export const updateComments = (newComments) => {
  return newComments;
}; 

export const sanitizeHtml = (value) => {
    if (typeof value !== 'string') {
        return '';
    }
    
    return value
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#96;')
        .replace(/\//g, '&#47;')
        .replace(/\\/g, '&#92;')
        .replace(/&/g, '&amp;');
};