import React, { useEffect, useState } from "react";
import { SearchBeverage } from "../views/searchBeverage";
import usePromise from "../../hooks/usePromise";
import { beverageTypes } from "../../constants/searchTypes";
import DrinkModel from "../../model/drinkModel";
import { Beverage } from "../../constants/beverageObjects";

const drinkModel = new DrinkModel();

// OBS
// This component is not implemented yet as I need the history from database to do that
// so basically it just shows the results from API rn instead of from history
// however the adding of beverage etc works as it should

export const SearchHistoryPresenter = ({
  setNewBeverage,
  setShowModal,
  menu,
  addToMenu,
  customizedType,
  currentSearchType,
  setBeverageCardType,
}) => {
  const [beveragePromise, setBeveragePromise] = useState(undefined);
  const [beverageData, beverageError] = usePromise(beveragePromise);
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchBeverage = (query: string) => {
    setLoading(true);
    switch (customizedType) {
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
      switch (customizedType) {
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
      customizedType={customizedType}
      setNewBeverage={setNewBeverage}
      setShowModal={setShowModal}
      searchBeverage={searchBeverage}
      searchResult={searchResults}
      isLoading={isLoading}
      menu={menu}
      addToMenu={(beverage: Beverage) => addToMenu(beverage)}
      currentSearchType={currentSearchType}
      setBeverageCardType={setBeverageCardType}
    />
  );
};
