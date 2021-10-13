import React, { useEffect, useState } from "react";
import { SearchBeverage } from "../views/searchBeverage";
import usePromise from "../../hooks/usePromise";
import { beverageTypes } from "../../constants/searchTypes";
import DrinkModel from "../../model/drinkModel";

const drinkModel = new DrinkModel();

// OBS
// This component is not implemented yet as I need the history from database to do that
export const SearchHistoryPresenter = ({ menu, addToMenu, searchType }) => {

  const [beveragePromise, setBeveragePromise] = useState(undefined);
  const [beverageData, beverageError] = usePromise(beveragePromise);
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchBeverage = (query) => {
    setLoading(true);
    switch (searchType) {
      case beverageTypes.BEER:
        setBeveragePromise(drinkModel.getBeerBasedOnName(query));
        break;
      case beverageTypes.COCKTAIL:
        setBeveragePromise(drinkModel.getCocktailBasedOnName(query));
        break;
    }
  };

  useEffect(() => {
    if (beverageData) {
      switch (searchType) {
        case beverageTypes.BEER:
          setSearchResults(
            beverageData.items.map((beer) =>
              drinkModel.setAPIBeerToObject(beer)
            )
          );
          break;
        case beverageTypes.COCKTAIL:
          setSearchResults(
            beverageData.drinks.map((cocktail) =>
              drinkModel.setAPICocktailToObject(cocktail)
            )
          );
          break;
      }
      setBeveragePromise(null);
      setLoading(false);
    } else if (beverageError) {
      // todo: visa felmeddelanden
      setBeveragePromise(null);
      setLoading(false);
    }
  }, [beverageData, beverageError]);

  return (
    <SearchBeverage
      searchBeverage={searchBeverage}
      searchResult={searchResults}
      isLoading={isLoading}
      addToMenu={(beverage) => addToMenu(beverage)}
    />
  );
};
