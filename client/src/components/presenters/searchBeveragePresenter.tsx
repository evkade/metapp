import React, { useEffect, useState } from "react";
import { SearchBeverage } from "../views/searchBeverage";
import { InformationPopUp } from "../views/informationPopUp";
import usePromise from "../../hooks/usePromise";
import { beverageTypes, searchTypes } from "../../constants/searchTypes";
import MenuModel from "../../model/drinkModel";
import { Beverage, Beer, Cocktail } from "../../constants/beverageObjects";
import { baseBeer, baseCocktail } from "../../constants/beverageObjects";
import { beverageCardTypes } from "../../constants/beverageCardType";

const menuModel = new MenuModel();

const SearchBeveragePresenter = ({
  setModalBeverage,
  setShowModal,
  menu,
  history,
  customizedType,
  currentSearchType,
  setCurrentSearchType,
  setBeverageCardType,
  spinner,
}) => {
  const [beveragePromise, setBeveragePromise] = useState(undefined);
  const [beverageData, beverageError] = usePromise(beveragePromise);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState<string>("");
  const [showInfoPopup, setShowInfoPopup] = useState<boolean>(false);
  const [messageEmptyResults, setMessageEmptyResults] = useState<string>(
    "Search for a beverage to add to your menu!"
  );

  const searchBeverage = (query: string) => {
    setMessageEmptyResults("No results");
    if (currentSearchType === searchTypes.API) {
      setLoading(true);
      switch (customizedType) {
        case beverageTypes.BEER:
          setBeveragePromise(menuModel.getBeerBasedOnName(query));
          break;
        case beverageTypes.COCKTAIL:
          setBeveragePromise(menuModel.getCocktailBasedOnName(query));
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
                menuModel.setAPIBeerToObject(beer)
              )
            );
            break;
          case beverageTypes.COCKTAIL:
            setSearchResults(
              beverageData.drinks.map((cocktail) =>
                menuModel.setAPICocktailToObject(cocktail)
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

  useEffect(() => {
    setQuery("");
  }, [customizedType, currentSearchType]);

  const openModal = (beverage: Beverage) => {
    setModalBeverage(beverage);
    setBeverageCardType(beverageCardTypes.ADMIN_SEARCH_RESULTS);
    setShowModal(true);
  };

  const openNewBeverageModal = (name: string) => {
    customizedType === beverageTypes.BEER
      ? openModal({ ...baseBeer, name: name })
      : openModal({ ...baseCocktail, name: name });
  };

  return (
    <>
      <SearchBeverage
        searchBeverage={searchBeverage}
        searchResult={searchResults}
        isLoading={isLoading}
        menu={menu}
        setCurrentSearchType={setCurrentSearchType}
        spinner={spinner}
        query={query}
        setQuery={setQuery}
        openModal={openModal}
        openNewBeverageModal={openNewBeverageModal}
        setShowInfoPopup={setShowInfoPopup}
        messageEmptyResults={messageEmptyResults}
      />
      {showInfoPopup && <InformationPopUp />}
    </>
  );
};

export default SearchBeveragePresenter;
