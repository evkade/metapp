import { Beverage } from "../../constants/beverageObjects";

export const getBeerHistory = () => ({
  type: "GET_BEER_HISTORY",
});

export const getCocktailHistory = () => ({
  type: "GET_COCKTAIL_HISTORY",
});

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
