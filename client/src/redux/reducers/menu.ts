import { getTypeOfBeverage } from "../../constants/searchTypes";
import { beverageTypes } from "../../constants/searchTypes";
import DrinkModel from "../../model/drinkModel";

const initialState = {
  loading: false,
  currentBar: "dkm",
  beerMenu: [],
  cocktailMenu: [],
  beerHistory: [],
  cocktailHistory: [],
};

const drinkModel = new DrinkModel();

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "SET_BEER_HISTORY":
      const beerHistory = action.payload.map((databaseBeer) => ({
        name: databaseBeer.name,
        type: databaseBeer.description,
        volume: 0, // finns ej sparad i databasen
        alcoholPercentage: databaseBeer.percentage,
        price: databaseBeer.price,
      }));
      const beerMenu = action.payload
        .filter((databaseBeer) => databaseBeer.active === "true")
        .map((databaseBeer) => ({
          name: databaseBeer.name,
          type: databaseBeer.description,
          volume: 0, // finns ej sparad i databasen
          alcoholPercentage: databaseBeer.percentage,
          price: databaseBeer.price,
        }));
      return {
        ...state,
        loading: false,
        beerHistory: beerHistory,
        beerMenu: beerMenu,
      };

    case "SET_COCKTAIL_HISTORY":
      const cocktailHistory = action.payload
        .map((databaseCocktail) => ({
          name: databaseCocktail.name,
          alcoholVolume: databaseCocktail.alcoholVolume,
          // todo: ingredients, add description to beverageObject
          price: databaseCocktail.price,
          ingredientList: databaseCocktail.ingredients,
        }))
        .sort(drinkModel.compare);
      const cocktailMenu = action.payload
        // todo: active is a string in the database?
        .filter((databaseCocktail) => databaseCocktail.active === "true")
        .map((databaseCocktail) => ({
          name: databaseCocktail.name,
          alcoholVolume: databaseCocktail.alcoholVolume,
          price: databaseCocktail.price,
          ingredientList: databaseCocktail.ingredients,
        }))
        .sort(drinkModel.compare);
      return {
        ...state,
        loading: false,
        cocktailHistory: cocktailHistory,
        cocktailMenu: cocktailMenu,
      };

    case "ADD_TO_MENU":
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        drinkModel.postBeerToDatabase(action.payload, state.currentBar, true);
        return {
          ...state,
          beerMenu: [...state.beerMenu, action.payload].sort(
            drinkModel.compare
          ),
        };
      } else
        drinkModel.postCocktailToDatabase(
          action.payload,
          state.currentBar,
          true
        );
      return {
        ...state,
        beerMenu: [...state.cocktailMenu, action.payload].sort(
          drinkModel.compare
        ),
      };

    case "REMOVE_FROM_MENU":
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        drinkModel.postBeerToDatabase(action.payload, state.currentBar, false);
        return {
          ...state,
          beerMenu: state.beerMenu.filter(
            (beverage) => beverage.name !== action.payload.name
          ),
        };
      } else {
        drinkModel.postCocktailToDatabase(
          action.payload,
          state.currentBar,
          false
        );
        return {
          ...state,
          cocktailMenu: state.cocktailMenu.filter(
            (beverage) => beverage.name !== action.payload.name
          ),
        };
      }

    case "EDIT_IN_MENU":
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        drinkModel.postBeerToDatabase(action.payload, state.currentBar, true);
        return {
          ...state,
          beerMenu: [
            ...state.beerMenu.filter(
              (beverage) => beverage.name !== action.payload.name
            ),
            action.payload,
          ].sort(drinkModel.compare),
        };
      } else {
        drinkModel.postCocktailToDatabase(
          action.payload,
          state.currentBar,
          true
        );
        return {
          ...state,
          cocktailMenu: [
            ...state.cocktailMenu.filter(
              (beverage) => beverage.name !== action.payload.name
            ),
            action.payload,
          ].sort(drinkModel.compare),
        };
      }

    case "SWITCH_CURRENT_BAR":
      return {
        ...state,
        currentBar: state.currentBar === "dkm" ? "mkm" : "dkm",
      };

    default:
      return state;
  }
};

export default menuReducer;
