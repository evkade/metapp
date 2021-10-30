import { getTypeOfBeverage } from "../../constants/searchTypes";
import { beverageTypes } from "../../constants/searchTypes";
import MenuModel from "../../model/drinkModel";

const initialState = {
  loading: false,
  currentBar: "",
  beerMenu: [],
  cocktailMenu: [],
  beerHistory: [],
  cocktailHistory: [],
};

const menuModel = new MenuModel();

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MENU_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SIGN_OUT":
      return {
        ...state,
        loading: false,
        beerMenu: [],
        cocktailMenu: [],
        beerHistory: [],
        cocktailHistory: [],
      };

    case "SET_BEER_HISTORY":
      const beerHistory = action.payload
        .map((databaseBeer) => ({
          name: databaseBeer.name,
          type: databaseBeer.beerType,
          volume: databaseBeer.volume,
          alcoholPercentage: databaseBeer.percentage,
          price: databaseBeer.price,
        }))
        .sort(menuModel.compare);
      const beerMenu = action.payload
        .filter((databaseBeer) => databaseBeer.active)
        .map((databaseBeer) => ({
          name: databaseBeer.name,
          type: databaseBeer.beerType,
          volume: databaseBeer.volume,
          alcoholPercentage: databaseBeer.percentage,
          price: databaseBeer.price,
        }))
        .sort(menuModel.compare);
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
          price: databaseCocktail.price,
          ingredients: databaseCocktail.ingredients,
        }))
        .sort(menuModel.compare);
      const cocktailMenu = action.payload
        .filter((databaseCocktail) => databaseCocktail.active)
        .map((databaseCocktail) => ({
          name: databaseCocktail.name,
          alcoholVolume: databaseCocktail.alcoholVolume,
          price: databaseCocktail.price,
          ingredients: databaseCocktail.ingredients,
        }))
        .sort(menuModel.compare);
      return {
        ...state,
        loading: false,
        cocktailHistory: cocktailHistory,
        cocktailMenu: cocktailMenu,
      };

    case "ADD_TO_MENU":
      // TODO Kanske flytta från reducer till menuModel eller något?
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        menuModel.postBeerToDatabase(action.payload, state.currentBar, true);
        return {
          ...state,
          beerMenu: [...state.beerMenu, action.payload].sort(menuModel.compare),
        };
      } else
        menuModel.postCocktailToDatabase(
          action.payload,
          state.currentBar,
          true
        );
      return {
        ...state,
        cocktailMenu: [...state.cocktailMenu, action.payload].sort(
          menuModel.compare
        ),
        loading: false,
      };

    case "REMOVE_FROM_MENU":
      // TODO Kanske flytta från reducer till menuModel eller något?
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        menuModel.postBeerToDatabase(action.payload, state.currentBar, false);
        return {
          ...state,
          beerMenu: state.beerMenu.filter(
            (beverage) => beverage.name !== action.payload.name
          ),
        };
      } else {
        menuModel.postCocktailToDatabase(
          action.payload,
          state.currentBar,
          false
        );
        return {
          ...state,
          cocktailMenu: state.cocktailMenu.filter(
            (beverage) => beverage.name !== action.payload.name
          ),
          loading: false,
        };
      }

    case "EDIT_IN_MENU":
      // TODO Kanske flytta från reducer till menuModel eller något?
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        menuModel.postBeerToDatabase(action.payload, state.currentBar, true);
        return {
          ...state,
          beerMenu: [
            ...state.beerMenu.filter(
              (beverage) => beverage.name !== action.payload.name
            ),
            action.payload,
          ].sort(menuModel.compare),
          loading: false,
        };
      } else {
        menuModel.postCocktailToDatabase(
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
          ].sort(menuModel.compare),
          loading: false,
        };
      }

    case "SWITCH_CURRENT_BAR":
      return {
        ...state,
        currentBar: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default menuReducer;
