import * as STORAGE from "utils/storage";

const initState = {};

const UsersReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_USER":
      var data = JSON.parse(action.user);
      const user = data.user;
      const organizerInfo = data.organizerInfo;
      // STORAGE.setToken(token);
      STORAGE.setUser(user);
      return {
        ...organizerInfo,
      };
    case "CREATE_USER_ERROR":
      return {
        successMessage: false,
      };
    case "UPDATE_USER":
      return { ...action.user };
    default:
      return state;
  }
};
export default UsersReducer;
