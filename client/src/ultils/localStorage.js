export const tokenFieldName = 'jwtToken';
export const getLocalToken = () => localStorage.getItem(tokenFieldName);
export const saveLocalToken = (token) => {
  localStorage.setItem(tokenFieldName, token);
};
export const clearLocalToken = () => {
  localStorage.removeItem(tokenFieldName);
};
export const isTokenExist = () => {
  const token = getLocalToken();
  if (token && token !== '' && token.length > 0) return true;
  return false;
};
