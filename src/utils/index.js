export const extractIds = (items) =>
  items.map((item) => item.split('/')[5]).join(',');
