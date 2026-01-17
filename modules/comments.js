export let comments = [];

export const updateComments = (newComments) => {
  comments.length = 0;
  comments.push(...newComments);
};
// export const updateComments = (newComments) => {
//   comments = newComments;
// };

export const sanitizeHtml = (value) => {
  if (typeof value !== "string") return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;");
};
