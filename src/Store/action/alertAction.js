export const ShowAlert = (data = {}) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SHOW_ALERT",
      ...data,
    });
    return Promise.resolve();
  };
};

export const HideAlert = (data = {}) => {
  return (dispatch, getState) => {
    dispatch({
      type: "HIDE_ALERT",
      ...data,
    });
    return Promise.resolve();
  };
};
