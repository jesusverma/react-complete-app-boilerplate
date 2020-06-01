import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import loginReducer from "./loginReducer";
import progressBarReducer from "./progressBarReducer";
import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  login: loginReducer,
  progressBar: progressBarReducer,
  alert: alertReducer,
});
export default rootReducer;
