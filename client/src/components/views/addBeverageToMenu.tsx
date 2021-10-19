import React, { useState } from "react";
import { SearchNewBeveragePresenter } from "../presenters/searchNewBeveragePresenter";
import { SearchHistoryPresenter } from "../presenters/searchHistoryPresenter";

import { Beverage, Beer, Cocktail } from "../../constants/beverageObjects";
import { searchTypes, beverageTypes } from "../../constants/searchTypes";

// todo: lägga till en bättre loading
// todo: lägga till finns grej när searchResults är tom
// todo: fixa beer strängarna då man får konstiga tecknen tex: Abbaye D&#39;aulne Christmas Triple Ale

export const AddBeverageToMenu = ({
  modalBeverage,
  setModalBeverage,
  showModal,
  setShowModal,
  currentSearchType,
  setCurrentSearchType,
  searchedBeverageType,
  menu,
  addToMenu,
}) => {
  const shownSearchType = () => {
    switch (currentSearchType) {
      case searchTypes.API:
        return (
          <SearchNewBeveragePresenter
            newBeverage={modalBeverage}
            setNewBeverage={setModalBeverage}
            showModal={showModal}
            setShowModal={setShowModal}
            menu={menu}
            addToMenu={(beverage: Beverage) => addToMenu(beverage)}
            customizedType={searchedBeverageType}
            currentSearchType={currentSearchType}
            setCurrentSearchType={setCurrentSearchType}
          />
        );
      case searchTypes.HISTORY:
        return (
          <SearchHistoryPresenter
            setNewBeverage={setModalBeverage}
            setShowModal={setShowModal}
            menu={menu}
            addToMenu={(beverage: Beverage) => addToMenu(beverage)}
            currentSearchType={currentSearchType}
            customizedType={searchedBeverageType}
          />
        );
      case searchTypes.NEW:
        setShowModal(true);
      default:
        return null; // todo: add types then you can remove this
    }
  };

  return (
    <div>
      <button
        onClick={() => setCurrentSearchType(searchTypes.API)}
        disabled={currentSearchType === searchTypes.API}
      >
        Search new
      </button>
      <button
        onClick={() => setCurrentSearchType(searchTypes.HISTORY)}
        disabled={currentSearchType === searchTypes.HISTORY}
      >
        Find old
      </button>
      <button
        onClick={() => setCurrentSearchType(searchTypes.NEW)}
        disabled={currentSearchType === searchTypes.NEW}
      >
        Create
      </button>
      {shownSearchType()}
    </div>
  );
};
