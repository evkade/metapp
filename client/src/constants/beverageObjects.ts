// todo ev lägga till searchTypes / beverageobjects här ?

export interface Beverage {
    name: string, 
    price: number
}

export interface Beer extends Beverage {
    type: string,
    volume: number,
    alcoholPercentage: number
}

export interface Cocktail extends Beverage {
    ingredientList: string[],
    ingredientMeasuresList: string[]
}

export interface Menu {
    menu: Beverage[]
}