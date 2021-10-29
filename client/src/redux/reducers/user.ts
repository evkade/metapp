import FavoriteModel from "../../model/favoriteModel";

const initialState = {
  username: null,
  userId: null,
  isAdmin: false,
  loggedIn: false,
  favorites: [],
  userOrders: [],
  unfinishedOrder: {},
};

const favoriteModel = new FavoriteModel();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
        userId: action.payload._id,
      };
    case "SIGN_UP":
      return {
        ...state,
        loggedIn: false,
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
      };
    case "SIGN_OUT":
      return {
        ...state,
        loggedIn: false,
        username: null,
        isAdmin: false,
        favorites: [],
        userId: null,
      };
    case "ADD_FAVORITE":
      favoriteModel.postBeverageToDatabase(action.payload);
      return {
        ...state,
        favorites: state.favorites
      };
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    case "REMOVE_FAVORITE":
      favoriteModel.removeBeveragefromDatabase(action.payload);
      return {
        ...state,
        favorites: state.favorites
      };
    case "ORDER_PLACED":
      return {
        ...state,
        unfinishedOrder: {},
      };
    case "ORDER_QUEUED":
      const newUnFinishedOrder = {};
      newUnFinishedOrder["id"] = state.userOrders.length + 1; //todo: set id to next order
      newUnFinishedOrder["order"] = action.payload.beverage;
      return {
        ...state,
        unfinishedOrder: newUnFinishedOrder,
      };
    case "ORDER_REMOVED":
      return {
        ...state,
        unfinishedOrder: {},
      };
    default:
      return state;
  }
};

export default userReducer;
