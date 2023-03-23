export const generateId = () => {
  return Date.now() + '_' + Math.round(Math.random() * 1e12);
};
