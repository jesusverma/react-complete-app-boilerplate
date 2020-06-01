var item = localStorage.getItem("login");

const initState = JSON.parse(item);

const UsersReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_LOGIN":
      return {
        isLoggedIn: true,
      };
    case "LOG_OUT":
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
export default UsersReducer;
