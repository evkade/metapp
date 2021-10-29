export const logIn = (user) => ({
  type: "LOG_IN",
  payload: user,
});

export const signUp = (user) => ({
  type: "SIGN_UP",
  payload: user,
});

export const signOut = () => ({
  type: "SIGN_OUT",
});

export const addFavorite = (favorite) => ({
  type: "ADD_FAVORITE",
  payload: favorite,
});

export const setFavorites = (favorites) => ({
  type: "SET_FAVORITES",
  payload: favorites,
});

export const removeFavorite = (favorite) => ({
  type: "REMOVE_FAVORITE",
  payload: favorite,
});

export const orderPlaced = () => ({
  type: "ORDER_PLACED",
});

export const unfinishedOrderPlaced = (orderBeverage) => ({
  type: "ORDER_QUEUED",
  payload: {
    beverage: orderBeverage,
  },
});

export const removedOrder = () => ({
  type: "ORDER_REMOVED",
});
