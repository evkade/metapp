import { Beer, Cocktail } from "../constants/beverageObjects";
import { searchTypes } from "../constants/searchTypes";

// todo maybe change name of this
// basically it is the class controlling the add to menu function
export default class DrinkModel {

  constructor(searchType = searchTypes.COCKTAIL) { // default searchType
  }

  searchType; // litterally wtf men behövde lägga till detta så att klassen har det som property

  setAPIBeerToObject(apiBeer): Beer {
    const beer: Beer = {
      name: apiBeer.name,
      type: apiBeer.type,
      volume: apiBeer.volume_ml,
      alcoholPercentage: apiBeer.alcohol_vol,
      price: +apiBeer.price_sek * 1.25,
    };
    return beer;
  }

  setAPICocktailToObject(apiCocktail): Cocktail {
    var hashNumber: number = 1;
    var ingredientHash: string = "strIngredient" + hashNumber.toString();
    var measureHash: string = "strMeasure" + hashNumber.toString();
    var ingredientList: string[] = [];
    var ingredientMeasuresList: string[] = [];

    while (
      apiCocktail[ingredientHash] !== null &&
      apiCocktail[measureHash] !== null
    ) {
      ingredientList = [...ingredientList, apiCocktail[ingredientHash]];
      ingredientMeasuresList = [...ingredientList, apiCocktail[measureHash]];
      hashNumber++;
      var ingredientHash: string = "strIngredient" + hashNumber.toString();
      var measureHash: string = "strMeasure" + hashNumber.toString();
    }

    const cocktail: Cocktail = {
      name: apiCocktail.strDrink,
      price: 0, // default
      ingredientList: ingredientList,
      ingredientMeasuresList: ingredientMeasuresList,
    };

    return cocktail;
  }

  getCocktailBasedOnName(name: string): Promise<any> {
    const cocktails = this.getFetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name
    ).then((data) => data);
    return cocktails;
  }

  async getFetch(url: string) {
    return await fetch(url, {
      method: "GET",
    }).then((response) => response.json());
  }

  getBeerBasedOnName(name: string) {
    const beers = this.postFetch("http://localhost:5000/api/beers", {
      name: name,
    }).then((data) => data);
    return beers;
  }

  async postFetch(url: string, data) {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
}
