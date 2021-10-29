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
  ingredients: string[];
  alcoholVolume: number;
}

export interface Menu {
  menu: Beverage[];
}

interface OrderDetail {
  beverage: String;
  quantity: Number;
}

export interface Order {
  id: String;
  user: String;
  order: Array<OrderDetail>;
  made?: boolean;
  paid?: boolean;
  timeMade?: String;
  timePaid?: String;
  date: String;
  cancelled?: Boolean;
}

export interface OrderState {
  loading: boolean;
  orders: Order[];
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
  ingredients: [],
};
