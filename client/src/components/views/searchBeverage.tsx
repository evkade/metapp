import React, { useState } from "react";
import { searchTypes } from "../../constants/searchTypes";
import { Beverage } from "../../constants/beverageObjects";
import { BeverageCard } from "./beverageCard";
import { beverageCardTypes } from "../../constants/beverageCardType";

// todo: lägga till en bättre loading
// todo: lägga till finns grej när searchResults är tom
// todo: fixa beer strängarna då man får konstiga tecknen tex: Abbaye D&#39;aulne Christmas Triple Ale
// todo: check that no two beers of same name are in menu - basically their name is their index

export const SearchBeverage = ({
  setNewBeverage,
  setShowModal,
  searchBeverage,
  searchResult,
  isLoading,
  menu,
  addToMenu,
  currentSearchType,
  setBeverageCardType,
  customizedType,
}) => {
  const [query, setQuery] = useState<string>("");

  const openModal = (beverage: Beverage) => {
    setNewBeverage(beverage);
    setBeverageCardType(beverageCardTypes.ADMIN_SEARCH_RESULTS);
    setShowModal(true);
  };

  return (
    <div>
      <input
        id="searchQuery"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <button
        type="submit"
        onClick={() => searchBeverage(query)}
        className="general-button--bw"
      >
        Search
      </button>
      <div className="drink-list__container">
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
          // todo fixa snygg loading + att den kommer upp på rätt tillfällen
          <div> Loading </div>
        )}
      </div>
    </div>
  );
};

// temporary graphic solution for showing the beverages
const hashListToDiv = (hashList) => {
  var divList = [];
  for (var k in hashList) {
    const value = hashList[k];
    if (value === "ingredientList" || value === "ingredientMeasuresList") {
      // type of value is object
      divList = [...divList, <div>{hashListToDiv(value)}</div>];
    } else {
      divList = [...divList, <div>{k + ": " + value}</div>];
    }
  }
  return divList;
};
