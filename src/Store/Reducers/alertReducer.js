const initState = {
  isShow: false,
  msg: "You are doing good!!",
  alertType: "success",
};

const AlertReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      console.log("actionaction", action);
      return {
        isShow: true,
        msg: action.msg,
        alertType: action.alertType,
      };
    case "HIDE_ALERT":
      return {
        isShow: false,
        msg: "",
        alertType: "",
      };
    default:
      return state;
  }
};
export default AlertReducer;
