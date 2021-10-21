import { getTypeOfBeverage } from "../../constants/searchTypes";
import { beverageTypes } from "../../constants/searchTypes";
import DrinkModel from "../../model/drinkModel";

const initialState = {
  menu: { beer: [], cocktail: [] },
  history: { beer: [], cocktail: [] },
  currentBar: "dkm",
};

const drinkModel = new DrinkModel();

// todo: the menu reducer and the history reducer should maybe be separated ? and also not sure that currentBar should be here

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BEER_HISTORY":
      const databaseBeerHistory = drinkModel.getBeerHistory(state.currentBar);
      console.log("databasebeerhistory", databaseBeerHistory);
      return {
        ...state,
        history: { ...history, beer: databaseBeerHistory },
      };

    case "GET_COCKTAIL_HISTORY":
      const databaseCocktailHistory = drinkModel.getCocktailHistory(
        state.currentBar
      );
      console.log("databasecockhistory", databaseCocktailHistory);
      return {
        ...state,
        history: { ...history, cocktail: databaseCocktailHistory },
      };

    case "ADD_TO_MENU":
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        drinkModel.addBeerInHistory(action.payload, state.currentBar);
        return {
          ...state,
          menu: { ...state.menu, beer: [...state.menu.beer, action.payload] },
        };
      } else drinkModel.addCocktailInHistory(action.payload, state.currentBar);
      return {
        ...state,
        menu: {
          ...state.menu,
          cocktail: [...state.menu.cocktail, action.payload],
        },
      };

    case "ADD_TO_HISTORY":
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        return {
          ...state,
          history: {
            ...state.history,
            beer: [...state.history.beer, action.payload],
          },
        };
      } else
        return {
          ...state,
          history: {
            ...state.history,
            cocktail: [...state.history.cocktail, action.payload],
          },
        };

    case "REMOVE_FROM_MENU":
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        return {
          ...state,
          menu: {
            ...state.menu,
            beer: state.menu.beer.filter(
              (beverage) => beverage.name !== action.payload.name
            ),
          },
        };
      } else
        return {
          ...state,
          menu: {
            ...state.menu,
            cocktail: state.menu.cocktail.filter(
              (beverage) => beverage.name !== action.payload.name
            ),
          },
        };

    case "EDIT_IN_MENU":
      if (getTypeOfBeverage(action.payload) === beverageTypes.BEER) {
        return {
          ...state,
          menu: {
            ...state.menu,
            beer: [
              ...state.menu.beer.filter(
                (beverage) => beverage.name !== action.payload.name
              ),
              action.payload,
            ],
          },
        };
      } else
        return {
          ...state,
          menu: {
            ...state.menu,
            cocktail: [
              ...state.menu.cocktail.filter(
                (beverage) => beverage.name !== action.payload.name
              ),
              action.payload,
            ],
          },
        };

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
