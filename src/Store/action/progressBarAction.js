export const ShowLoader = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SHOW_LOADER",
      isShow: true,
    });
    return Promise.resolve();
  };
};

export const HideLoader = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "HIDE_LOADER",
      isShow: false,
    });
    return Promise.resolve();
  };
};
