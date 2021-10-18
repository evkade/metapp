import React, { useEffect, useState } from "react";
import { SearchBeverage } from "../views/searchBeverage";
import usePromise from "../../hooks/usePromise";
import { beverageTypes } from "../../constants/searchTypes";
import DrinkModel from "../../model/drinkModel";
import { Beverage } from "../../constants/beverageObjects";

const drinkModel = new DrinkModel();

// todo: is if in menu you should not be able to add it
// todo: also special case if it is present in history

export const SearchNewBeveragePresenter = ({
  setNewBeverage,
  setShowModal,
  menu,
  addToMenu,
  customizedType,
  currentSearchType,
}) => {
  const [beveragePromise, setBeveragePromise] = useState(undefined);
  const [beverageData, beverageError] = usePromise(beveragePromise);
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchBeverage = (query) => {
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
    <div>
      <SearchBeverage
        setNewBeverage={setNewBeverage}
        setShowModal={setShowModal}
        searchBeverage={searchBeverage}
        searchResult={searchResults}
        isLoading={isLoading}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        currentSearchType={currentSearchType}
      />
    </div>
  );
};
