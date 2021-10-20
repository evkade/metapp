import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer, RootState } from "./rootReducer";
import thunk from "redux-thunk";

//const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
