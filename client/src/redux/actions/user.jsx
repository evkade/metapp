export const signIn = (user) => ({
  type: "SIGN_IN",
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

export const orderPlaced = (orderBeverage) => ({
  type: "ORDER_PLACED",
  payload: {
    beverage: orderBeverage,
  },
});
