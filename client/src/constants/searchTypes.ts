export const beverageTypes = {
  BEER: "beer",
  COCKTAIL: "cocktail",
};

export const getTypeOfBeverage = (beverage) => {
  if ("alcoholPercentage" in beverage) return beverageTypes.BEER;
  else return beverageTypes.COCKTAIL;
};

export const searchTypes = {
  API: "api",
  HISTORY: "history",
  NEW: "new",
};
