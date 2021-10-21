import { Beverage, Beer, Cocktail } from "../constants/beverageObjects";
import { getBeerHistory } from "../redux/actions/menu";

// todo maybe change name of this
export default class DrinkModel {
  // getCocktailsMenu(currentBar) {
  //   const beers = fetch(
  //     `http://localhost:5000/api/activecocktails?currentbar=${currentBar}`,
  //     {
  //       credentials: "include",
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => data)
  //     .catch((err) => console.log(err));
  //   return beers;
  // }

  // getBeersMenu(currentBar) {
  //   const beers = fetch(
  //     `http://localhost:5000/api/activebeers?currentbar=${currentBar}`,
  //     {
  //       credentials: "include",
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => data)
  //     .catch((err) => console.log(err));
  //   return beers;
  // }

  getBeerHistory(currentBar) {
    return (dispatch) =>
      fetch("http://localhost:5000/api/beer?currentbar=" + currentBar)
        .then((response) => response.json())
        .then((data) =>
          dispatch(
            getBeerHistory(
              data.map((databaseBeer) => ({
                name: databaseBeer.name,
                type: databaseBeer.description,
                volume: 0, // finns ej sparad i databasen
                alcoholPercentage: databaseBeer.percentage,
                price: databaseBeer.price,
              }))
            )
          )
        )
        .catch((err) => console.log(err));
  }

  async getCocktailHistory(currentBar) {
    const beers = await fetch(
      "http://localhost:5000/api/cocktail?currentbar=" + currentBar
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    return beers;
  }

  addDatabaseBeerToHistory(apiBeer): Beer {
    const beer: Beer = {
      name: apiBeer.name,
      type: apiBeer.type,
      volume: apiBeer.volume_ml,
      alcoholPercentage: apiBeer.alcohol_vol,
      price: +apiBeer.price_sek * 1.25,
    };
    return beer;
  }

  addDatabaseCocktailToHistory(apiCocktail): Cocktail {
    console.log(apiCocktail);
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
      price: 0,
      alcoholVolume: 0,
      ingredientList: ingredientList,
      ingredientMeasuresList: ingredientMeasuresList,
    };

    return cocktail;
  }

  // todo harmonisera beverage objects med databasen
  async addBeerInHistory(beer: Beer, currentBar) {
    // note: beer is automatizally added in menu then as it is marked as active
    const beerObjectForAPI = {
      name: beer.name,
      active: true,
      price: beer.price,
      percentage: beer.alcoholPercentage,
      description: beer.type,
    };

    const response = await fetch(
      "http://localhost:5000/api/beer?currentbar=" + currentBar,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(beerObjectForAPI),
        credentials: "include",
      }
    );
    response.json().then((data) => {
      console.log(data);
    });
  }

  // todo harmonisera beverage objects med databasen
  async addCocktailInHistory(cocktail: Cocktail, currentBar) {
    const cocktailbjectForAPI = {
      name: cocktail.name,
      active: true,
      price: cocktail.price,
      ingredients: cocktail.ingredientList.map(
        (ingredient, index) =>
          ingredient + " " + cocktail.ingredientMeasuresList[index]
      ),
      alcoholVolume: cocktail.alcoholVolume,
      description: "", // finns ej i cocktail object
    };

    const response = await fetch(
      "http://localhost:5000/api/cocktail?currentbar=" + currentBar,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cocktailbjectForAPI),
        credentials: "include",
      }
    );
    response.json().then((data) => {
      console.log(data);
    });
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
    const beers = this.postFetch("http://localhost:5000/api/apibeers", {
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
    console.log(apiCocktail);
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
      price: 0,
      alcoholVolume: 0,
      ingredientList: ingredientList,
      ingredientMeasuresList: ingredientMeasuresList,
    };

    return cocktail;
  }
}
