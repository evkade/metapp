export const addToMenu = (beverage) => ({
  type: "ADD_TO_MENU",
  payload: beverage,
});

export const removeFromMenu = (beverage) => ({
  type: "REMOVE_FROM_MENU",
  payload: beverage,
});

export const editInMenu = (beverage) => ({
  type: "EDIT_IN_MENU",
  payload: beverage,
});

export const switchCurrentBar = () => ({
  type: "SWITCH_CURRENT_BAR",
});
