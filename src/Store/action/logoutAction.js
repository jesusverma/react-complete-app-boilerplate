import * as STORAGE from "utils/storage";

export const LogOut = (data) => {
  return (dispatch, getState) => {
    STORAGE.logOutFromStorage();
    // dispatch({
    //   type: "LOG_OUT",
    //   login: data,
    // });
    window.open("/", "_self");
    return Promise.resolve();
  };
};
