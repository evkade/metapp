import { Beverage, Beer, Cocktail } from "../constants/beverageObjects";
import {
  fetchRequest,
  setBeerHistory,
  setCocktailHistory,
} from "../redux/actions/menu";

// todo maybe change name of this
export default class MenuModel {
  getBeerHistory(currentBar) {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/beer?currentbar=" + currentBar, {
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("Could not get beers");
        })
        .then((data) => dispatch(setBeerHistory(data)))
        // TODO show to user, not in console
        .catch((err) => console.log(err));
    };
  }

  getCocktailHistory(currentBar) {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/cocktail?currentbar=" + currentBar)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("Could not get cocktails");
        })
        .then((data) => dispatch(setCocktailHistory(data)))
        // TODO show to user, not in console
        .catch((err) => console.log(err));
    };
  }

  async postBeerToDatabase(beer: Beer, currentBar, active: boolean) {
    const beerObjectForAPI = {
      name: beer.name,
      active: active,
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
    // TODO what should be done here? Anything?
    response.json().then((data) => {
      console.log(data);
    });
  }

  // todo: harmonisera beverage objects med databasen
  async postCocktailToDatabase(
    cocktail: Cocktail,
    currentBar,
    active: boolean
  ) {
    const cocktailbjectForAPI = {
      name: cocktail.name,
      active: active,
      price: cocktail.price,
      ingredients: cocktail.ingredients,
      alcoholVolume: cocktail.alcoholVolume,
      description: "", // todo: finns ej i cocktail object
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
    // TODO what should be done here? Anything?
    response.json().then((data) => {
      console.log(data);
    });
  }

  // call to external API
  getCocktailBasedOnName(name: string): Promise<any> {
    const cocktails = this.getFetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name
    )
      .then((data) => data)
      // TODO show to user, not in console
      .catch((err) => console.log(err));
    return cocktails;
  }

  // call to external API
  getBeerBasedOnName(name: string) {
    const beers = this.postFetch("http://localhost:5000/api/apibeers", {
      name: name,
    })
      .then((data) => data)
      // TODO show to user, not in console
      .catch((err) => console.log(err));
    return beers;
  }

  async getFetch(url: string) {
    return await fetch(url, {
      method: "GET",
    }).then((response) => {
      if (response.ok) return response.json();
      else throw new Error("Could not GET");
    });
  }

  async postFetch(url: string, data) {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) return response.json();
      else throw new Error("Could not POST");
    });
  }

  setAPIBeerToObject(apiBeer): Beer {
    const beer: Beer = {
      name: apiBeer.name,
      type: apiBeer.type,
      volume: apiBeer.volume_ml,
      alcoholPercentage: apiBeer.alcohol_vol,
      price: Math.round(+apiBeer.price_sek * 1.25),
    };
    return beer;
  }

  setAPICocktailToObject(apiCocktail): Cocktail {
    var hashNumber: number = 1;
    var ingredientHash: string = "strIngredient" + hashNumber.toString();
    var measureHash: string = "strMeasure" + hashNumber.toString();
    var ingredientList: string[] = [];

    while (
      apiCocktail[ingredientHash] !== null &&
      apiCocktail[measureHash] !== null
    ) {
      ingredientList = [
        ...ingredientList,
        apiCocktail[ingredientHash] + " " + apiCocktail[measureHash],
      ];
      hashNumber++;
      var ingredientHash: string = "strIngredient" + hashNumber.toString();
      var measureHash: string = "strMeasure" + hashNumber.toString();
    }

    const cocktail: Cocktail = {
      name: apiCocktail.strDrink,
      price: 0,
      alcoholVolume: 0,
      ingredients: ingredientList,
    };

    return cocktail;
  }

  compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
}
