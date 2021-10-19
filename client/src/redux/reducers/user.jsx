const initialState = {
  username: null,
  isAdmin: false,
  loggedIn: false,
  favorites: [],
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
    default:
      return state;
  }
};

export default userReducer;
