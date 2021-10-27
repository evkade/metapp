import { Beverage } from "../../constants/beverageObjects";

export const fetchRequest = () => ({
  type: "FETCH_MENU_REQUEST",
});

export const setBeerHistory = (data) => ({
  type: "SET_BEER_HISTORY",
  payload: data,
});

export const setCocktailHistory = (data) => ({
  type: "SET_COCKTAIL_HISTORY",
  payload: data,
});

// should also add to history directly?
export const addToMenu = (beverage: Beverage) => ({
  type: "ADD_TO_MENU",
  payload: beverage,
});

export const addToHistory = (beverage: Beverage) => ({
  type: "ADD_TO_HISTORY",
  payload: beverage,
});

export const removeFromMenu = (beverage: Beverage) => ({
  type: "REMOVE_FROM_MENU",
  payload: beverage,
});

export const editInMenu = (beverage: Beverage) => ({
  type: "EDIT_IN_MENU",
  payload: beverage,
});

export const switchCurrentBar = () => ({
  type: "SWITCH_CURRENT_BAR",
});

export const signOut = () => ({
  type: "SIGN_OUT",
});
