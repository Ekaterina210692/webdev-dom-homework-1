export let comments = [];

export const updateComments = (newComments) => {
  comments = newComments;
};

export const sanitizeHtml = (value) => {
  if (typeof value !== 'string') return '';
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