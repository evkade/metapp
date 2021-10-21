export const signIn = (user) => ({
  type: "SIGN_IN",
  payload: user,
});

export const signUp = (user) => ({
  type: "SIGN_UP",
  payload: user,
});

export const signOut = () => ({
  type: "SIGN_OUT",
});

export const addFavorite = (name) => ({
  type: "ADD_FAVORITE",
  payload: name,
});

export const removeFavorite = (name) => ({
  type: "REMOVE_FAVORITE",
  payload: name,
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

export const setUserOrders = (orders) => ({
  type: "SET_USER_ORDERS",
  payload: orders,
});
