import React, { useEffect, useState } from "react";
import { SearchBeverage } from "../views/searchBeverage";
import usePromise from "../../hooks/usePromise";
import { beverageTypes, searchTypes } from "../../constants/searchTypes";
import DrinkModel from "../../model/drinkModel";
import { Beverage, Beer, Cocktail } from "../../constants/beverageObjects";

const drinkModel = new DrinkModel();

// todo: rn, admin cannot 'ADD' beverage from API when it is in menu
// however, if it is in database, user can ADD it, which will overwrite the database bev
export const SearchBeveragePresenter = ({
  setModalBeverage,
  setShowModal,
  menu,
  history,
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
    if (currentSearchType === searchTypes.API) {
      setLoading(true);
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
      switch (customizedType) {
        case beverageTypes.BEER:
          setSearchResults(
            history.beer.filter((beer) =>
              beer.name.toLowerCase().includes(query.toLowerCase())
            )
          );
          break;
        case beverageTypes.COCKTAIL:
          setSearchResults(
            history.cocktail.filter((cocktail) =>
              cocktail.name.toLowerCase().includes(query.toLowerCase())
            )
          );
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
    }
  }, [beverageData, beverageError]);

  useEffect(() => {
    console.log("[HERE]");
    if (currentSearchType === searchTypes.HISTORY) {
      switch (customizedType) {
        case beverageTypes.BEER:
          setSearchResults(history.beer);
          break;
        case beverageTypes.COCKTAIL:
          setSearchResults(history.cocktail);
          break;
      }
    } else setSearchResults([]);
  }, [customizedType, currentSearchType]);

  return (
    <>
      <SearchBeverage
        customizedType={customizedType}
        setNewBeverage={setModalBeverage}
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
    </>
  );
};
