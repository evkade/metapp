import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer, RootState } from "./rootReducer";
import thunk from "redux-thunk";

// const store = createStore(reducer, applyMiddleware(thunk));
const store = createStore(rootReducer, composeWithDevTools());

export default store;
