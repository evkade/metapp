import React, { useEffect, useState } from "react";
import { SearchBeverage } from "../views/searchBeverage";
import usePromise from "../../hooks/usePromise";
import { beverageTypes, searchTypes } from "../../constants/searchTypes";
import DrinkModel from "../../model/drinkModel";
import { Beverage, Beer, Cocktail } from "../../constants/beverageObjects";

const drinkModel = new DrinkModel();

// todo: is if in menu you should not be able to add it
// todo: also special case if it is present in history

export const SearchBeveragePresenter = ({
  setNewBeverage,
  setShowModal,
  menu,
  addToMenu,
  customizedType,
  currentSearchType,
  setCurrentSearchType,
  setBeverageCardType,
}) => {
  const [beveragePromise, setBeveragePromise] = useState(undefined);
  const [beverageData, beverageError] = usePromise(beveragePromise);
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchBeverage = (query: string) => {
    setLoading(true);
    if (currentSearchType === searchTypes.API) {
      switch (customizedType) {
        case beverageTypes.BEER:
          setBeveragePromise(drinkModel.getBeerBasedOnName(query));
          break;
        case beverageTypes.COCKTAIL:
          setBeveragePromise(drinkModel.getCocktailBasedOnName(query));
          break;
      }
    } else {
      // history
      switch (
        customizedType // todo: get current bar from somewhere idk where
      ) {
        case beverageTypes.BEER:
          setBeveragePromise(drinkModel.getBeersHistory("dkm"));
          break;
        case beverageTypes.COCKTAIL:
          setBeveragePromise(drinkModel.getCocktailsHistory("dkm"));
          break;
      }
    }
  };

  useEffect(() => {
    if (currentSearchType === searchTypes.API) {
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
    } else {
      // todo: history - vet ej om detta funkar HAHA då inget finns i history?
      if (beverageData) {
        console.log(beverageData);
        switch (customizedType) {
          case beverageTypes.BEER:
            setSearchResults(beverageData);
            break;
          case beverageTypes.COCKTAIL:
            setSearchResults(beverageData);
            break;
        }
        setBeveragePromise(null);
        setLoading(false);
      } else if (beverageError) {
        // todo: visa felmeddelanden
        setBeveragePromise(null);
        setLoading(false);
      }
    }
  }, [beverageData, beverageError]);

  return (
    <div>
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
        setCurrentSearchType={setCurrentSearchType}
        setBeverageCardType={setBeverageCardType}
      />
    </div>
  );
};
