export const getAuth = () => {
  const auth = localStorage.getItem("authenticated");
  return auth === "true";
};

export const setAuth = (value) => {
  localStorage.setItem("authenticated", value);
};
