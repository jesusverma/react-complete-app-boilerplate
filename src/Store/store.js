import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "Store/Reducers/rootReducer";

const store = createStore(rootReducers, compose(applyMiddleware(thunk)));

// Exports
export { store };
