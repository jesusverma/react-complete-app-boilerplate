export const LogInAc = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: "CREATE_LOGIN",
      login: true,
    });
    return Promise.resolve();
  };
};
