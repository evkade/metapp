import { combineReducers } from "redux";
import menuReducer from "./reducers/menu";
import userReducer from "./reducers/user";
import orderReducer from "./reducers/orders";

export const rootReducer = combineReducers({
  menu: menuReducer,
  user: userReducer,
  orders: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
