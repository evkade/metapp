import { beverageCardTypes } from "constants/beverageCardType";
import FavoriteModel from "../../model/favoriteModel";

const initialState = {
  username: null,
  userId: null,
  isAdmin: false,
  loggedIn: false,
  favorites: [],
  userOrders: [],
  unfinishedOrder: {},
  loading: false,
};

const favoriteModel = new FavoriteModel();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LOG_IN":
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
        userId: action.payload._id,
        loading: false,
      };
    case "SIGN_OUT":
      return {
        ...state,
        loggedIn: false,
        username: null,
        isAdmin: false,
        favorites: [],
        userId: null,
        loading: false,
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
        loading: false,
      };
    case "REMOVE_FAVORITE":
      favoriteModel.removeBeveragefromDatabase(action.payload);
      return {
        ...state,
        favorites: state.favorites.filter(elem => elem.beverage._id !== action.payload.beverage_id),
        loading: false,
      };
    case "ORDER_PLACED":
      return {
        ...state,
        unfinishedOrder: {},
        loading: false,
      };
    case "ORDER_QUEUED":
      const newUnFinishedOrder = {};
      newUnFinishedOrder["id"] = state.userOrders.length + 1; //todo: set id to next order
      newUnFinishedOrder["order"] = action.payload.beverage;
      return {
        ...state,
        unfinishedOrder: newUnFinishedOrder,
        loading: false,
      };
    case "ORDER_REMOVED":
      return {
        ...state,
        unfinishedOrder: {},
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
