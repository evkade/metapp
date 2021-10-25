import React, { useState, useEffect } from "react";
import { searchTypes, beverageTypes } from "../../constants/searchTypes";
import { Beverage } from "../../constants/beverageObjects";
import { BeverageCard } from "./beverageCard";
import { beverageCardTypes } from "../../constants/beverageCardType";
import { baseBeer, baseCocktail } from "../../constants/beverageObjects";

// todo: lägga till en bättre loading
// todo: lägga till finns grej när searchResults är tom
// todo: fixa beer strängarna då man får konstiga tecknen tex: Abbaye D&#39;aulne Christmas Triple Ale

export const SearchBeverage = ({
  setNewBeverage,
  setShowModal,
  searchBeverage,
  searchResult,
  isLoading,
  menu,
  addToMenu,
  currentSearchType,
  setCurrentSearchType,
  setBeverageCardType,
  customizedType,
}) => {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setQuery("");
  }, [customizedType, currentSearchType]);

  // todo: I think this should go into the presenter
  const openModal = (beverage: Beverage) => {
    setNewBeverage(beverage);
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
      <input
        id="searchQuery"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <select
        name="searchType"
        id="searchType"
        onChange={(e) => setCurrentSearchType(e.target.value)}
      >
        <option
          value={searchTypes.API}
          onClick={() => setCurrentSearchType(searchTypes.API)}
        >
          Search new
        </option>
        <option
          value={searchTypes.HISTORY}
          onClick={() => setCurrentSearchType(searchTypes.HISTORY)}
        >
          Find in history
        </option>
      </select>
      <button
        type="submit"
        onClick={() => searchBeverage(query)}
        className="general-button--bw general-button--black"
      >
        Search
      </button>
      <button
        type="submit"
        onClick={() => openNewBeverageModal(query)}
        className="general-button--bw general-button--black"
      >
        Create
      </button>
      <div className="drink-list__container--grey">
        {!isLoading && searchResult ? (
          searchResult.map((beverage: Beverage, index: number) => (
            <BeverageCard
              beverageCardType={beverageCardTypes.ADMIN_SEARCH_RESULTS}
              beverage={beverage}
              index={index}
              addToOrder={null}
              removeFromOrder={null}
              count={null}
              openModal={() => openModal(beverage)}
              menu={menu}
              removeFromMenu={null}
              editInMenu={null}
            />
          ))
        ) : (
          <div> Loading </div>
        )}
      </div>
    </>
  );
};
