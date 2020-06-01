const initState = {
  loader: {
    isShow: false,
  },
};

const ProgressBarReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_LOADER":
      console.log("SHOW_LOADER ccll", action);
      return {
        loader: {
          isShow: action.isShow,
        },
      };
    case "HIDE_LOADER":
      return {
        loader: {
          isShow: action.isShow,
        },
      };
    default:
      return state;
  }
};
export default ProgressBarReducer;
