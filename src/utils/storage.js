export const setToken = (token) => window.localStorage.setItem("token", token);
export const getToken = () => window.localStorage.getItem("token");

export const setUser = (data) =>
  window.localStorage.setItem("user", JSON.stringify(data));
export const getUser = () => JSON.parse(window.localStorage.getItem("user"));

export const logOutFromStorage = () => {
  console.log("Good Bye User");
  window.localStorage.clear();
};

export const isLoggedIn = () =>
  window.localStorage.getItem("token") ? true : false;
