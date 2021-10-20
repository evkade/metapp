// todo ev lägga till searchTypes / beverageobjects här ?

export interface Beverage {
  name: string;
  price: number;
}

export interface Beer extends Beverage {
  type: string;
  volume: number;
  alcoholPercentage: number;
}

export interface Cocktail extends Beverage {
  ingredientList: string[];
  ingredientMeasuresList: string[];
  alcoholVolume: number;
}

export interface Menu {
  menu: Beverage[];
}

export const baseBeer: Beer = {
  name: "",
  price: 0,
  type: "",
  volume: 0,
  alcoholPercentage: 0,
};

export const baseCocktail: Cocktail = {
  name: "",
  price: 0,
  alcoholVolume: 0,
  ingredientList: [],
  ingredientMeasuresList: [],
};
