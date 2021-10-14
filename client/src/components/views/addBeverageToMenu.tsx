import React, { useState } from "react";
import { SearchNewBeveragePresenter } from "../presenters/searchNewBeveragePresenter";
import { SearchHistoryPresenter } from "../presenters/searchHistoryPresenter";
import { CreateBeverageForMenuModalPresenter } from "../presenters/createBeverageForMenuModalPresenter";

import { Beverage, Beer, Cocktail } from "../../constants/beverageObjects";
import { searchTypes, beverageTypes } from "../../constants/searchTypes";

// todo: lägga till en bättre loading
// todo: lägga till finns grej när searchResults är tom
// todo: fixa beer strängarna då man får konstiga tecknen tex: Abbaye D&#39;aulne Christmas Triple Ale
// todo: is if in menu grey button
export const AddBeverageToMenu = ({
  showModal,
  setShowModal,
  currentSearchType,
  setCurrentSearchType,
  searchedBeverageType,
  menu,
  addToMenu,
}) => {
  // This is the new beverage that is created
  const [newBeverage, setNewBeverage] = useState(
    currentSearchType === beverageTypes.BEER ? beer : cocktail
  );

  const shownSearchType = () => {
    switch (currentSearchType) {
      case searchTypes.API:
        return (
          <SearchNewBeveragePresenter
            newBeverage={newBeverage}
            setNewBeverage={setNewBeverage}
            showModal={showModal}
            setShowModal={setShowModal}
            menu={menu}
            addToMenu={(beverage: Beverage) => addToMenu(beverage)}
            searchType={searchedBeverageType}
          />
        );
      case searchTypes.HISTORY:
        return (
          <SearchHistoryPresenter
            showModal={showModal}
            setShowModal={setShowModal}
            menu={menu}
            addToMenu={(beverage: Beverage) => addToMenu(beverage)}
            searchType={searchedBeverageType}
          />
        );
      case searchTypes.NEW:
        return (
          <CreateBeverageForMenuModalPresenter
            newBeverage={newBeverage}
            setNewBeverage={setNewBeverage}
            showModal={showModal}
            setShowModal={setShowModal}
            menu={menu}
            addToMenu={(beverage: Beverage) => addToMenu(beverage)}
            customizedType={searchedBeverageType}
            setCurrentSearchType={setCurrentSearchType}
          />
        );
      default:
        return null; // todo: add types so you can remove this
    }
  };

  return (
    <div>
      <button onClick={() => setCurrentSearchType(searchTypes.API)}>
        Search new
      </button>
      <button onClick={() => setCurrentSearchType(searchTypes.HISTORY)}>
        Find old
      </button>
      <button onClick={() => setCurrentSearchType(searchTypes.NEW)}>
        Create
      </button>
      {shownSearchType()}
    </div>
  );
};

const beer: Beer = {
  name: "",
  price: 0,
  type: "",
  volume: 0,
  alcoholPercentage: 0,
};

const cocktail: Cocktail = {
  name: "",
  price: 0,
  ingredientList: [],
  ingredientMeasuresList: [],
};
