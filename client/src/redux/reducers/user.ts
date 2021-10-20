const initialState = {
  username: null,
  isAdmin: false,
  loggedIn: false,
  favorites: [],
  userOrders: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
      };
    case "SIGN_OUT":
      return {
        ...state,
        loggedIn: false,
        username: null,
        isAdmin: false,
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FAVORITE":
      const newFilterArray = state.favorites.filter(
        (favorite) => favorite !== action.payload
      );
      return {
        ...state,
        favorites: newFilterArray,
      };
    case "ORDER_PLACED":
      const newOrder = {};
      newOrder["id"] = state.userOrders.length + 1; //todo: set id to next order
      newOrder["order"] = action.payload.beverage;
      const newOrderList = [...state.userOrders, newOrder];
      return {
        ...state,
        userOrders: newOrderList,
      };
    default:
      return state;
  }
};

export default userReducer;
