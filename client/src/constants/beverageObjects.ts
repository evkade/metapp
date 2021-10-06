interface beverage {
    name: string, 
    price: number
}

interface beer extends beverage {
    type: string
}

interface coktail extends beverage {
    ingredientList: string[]
}