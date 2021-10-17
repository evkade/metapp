const initialState = {
  username: null,
  isAdmin: false,
  loggedIn: false,
};

const userReducer = (state = initialState, action) => {
  if (action.type == "SIGN_IN")
    return {
      ...state,
      loggedIn: true,
      username: action.payload.username,
      isAdmin: action.payload.isAdmin,
    };
  if (action.type == "SIGN_OUT")
    return {
      ...state,
      loggedIn: false,
      username: null,
      isAdmin: false,
    };
  else return state;
};

export default userReducer;
