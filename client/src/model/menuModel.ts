import { Beer, Cocktail } from "../constants/beverageObjects";
import {
  fetchRequest,
  setBeerHistory,
  setCocktailHistory,
} from "../redux/actions/menu";

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
        .catch((err) => window.alert(err.message));
    };
  }

  getCocktailHistory(currentBar) {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/cocktail?currentbar=" + currentBar, {
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("Could not get cocktails");
        })
        .then((data) => dispatch(setCocktailHistory(data)))
        .catch((err) => window.alert(err.message));
    };
  }

  async postBeerToDatabase(beer: Beer, currentBar, active: boolean) {
    const beerObjectForAPI = {
      name: beer.name,
      active: active,
      price: beer.price,
      percentage: beer.alcoholPercentage,
      beerType: beer.type,
      volume: beer.volume,
    };

    await fetch("http://localhost:5000/api/beer?currentbar=" + currentBar, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beerObjectForAPI),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Could not save beer");
      })
      .catch((err) => window.alert(err.message));
  }

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
      description: cocktail.description,
    };

    await fetch("http://localhost:5000/api/cocktail?currentbar=" + currentBar, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cocktailbjectForAPI),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Could not save cocktail");
      })
      .catch((err) => window.alert(err.message));
  }

  // call to external API
  getCocktailBasedOnName(name: string): Promise<any> {
    const cocktails = this.getFetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name
    )
      .then((data) => data)
      .catch((err) => window.alert(err.message));
    return cocktails;
  }

  // call to external API
  getBeerBasedOnName(name: string) {
    const beers = this.postFetch("http://localhost:5000/api/apibeers", {
      name: name,
    })
      .then((data) => data)
      .catch((err) => window.alert(err.message));
    return beers;
  }

  async getFetch(url: string) {
    return await fetch(url, {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (response.ok) return response.json();
      else throw new Error("Something went wrong.");
    });
  }

  async postFetch(url: string, data) {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((response) => {
      if (response.ok) return response.json();
      else throw new Error("Something went wrong");
    });
  }

  setAPIBeerToObject(apiBeer): Beer {
    const beer: Beer = {
      name: apiBeer.name.replace("&#39;", "'").replace("&amp;", "&"),
      type: apiBeer.type.replace("&#39;", "'").replace("&amp;", "&"),
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
      description: "",
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
