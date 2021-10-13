import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import usePromise from "../../hooks/usePromise";
import { searchTypes } from "../../constants/searchTypes";

export const AddBeverageToMenuPresenter = ({menu, addToMenu, drinkModel}) => {
  console.log(drinkModel);
  console.log(menu);

  const [beveragePromise, setBeveragePromise] = useState(undefined);
  const [beverageData, beverageError] = usePromise(beveragePromise);
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState(searchTypes.COCKTAIL); // default

  const searchBeverage = (query) => {
    setLoading(true);
    switch (searchType) {
      case searchTypes.BEER:
        setBeveragePromise(drinkModel.getBeerBasedOnName(query));
        break;
      case searchTypes.COCKTAIL:
        setBeveragePromise(drinkModel.getCocktailBasedOnName(query));
        break;
    }
  };

  const toggleSearchType = () => {
    switch (searchType) {
      case searchTypes.BEER:
        drinkModel.searchType = setSearchType(searchTypes.COCKTAIL);
        break;
      case searchTypes.COCKTAIL:
        setSearchType(searchTypes.BEER);
        break;
    }
  };

  useEffect(() => {
    if (beverageData) {
      switch (searchType) {
        case searchTypes.BEER:
          setSearchResults(
            beverageData.items.map((beer) =>
              drinkModel.setAPIBeerToObject(beer)
            )
          );
          break;
        case searchTypes.COCKTAIL:
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
    <AddBeverageToMenu
      searchType={searchType}
      searchBeverage={searchBeverage}
      searchResult={searchResults}
      setSearchResults={setSearchResults}
      toggleSearchType={() => toggleSearchType()}
      isLoading={isLoading}
      addToMenu={(beverage) => addToMenu(beverage)}
    />
  );
};
