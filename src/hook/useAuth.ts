export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("authToken");
  return token !== null && token.length > 0;
};
