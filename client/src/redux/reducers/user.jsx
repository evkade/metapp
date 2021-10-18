const initialState = {
  username: null,
  isAdmin: false,
  loggedIn: false,
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
    default:
      return state;
  }
};

export default userReducer;
