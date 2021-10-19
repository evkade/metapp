import React, { useState } from "react";
import { SearchNewBeveragePresenter } from "../presenters/searchNewBeveragePresenter";
import { SearchHistoryPresenter } from "../presenters/searchHistoryPresenter";
import { Beverage } from "../../constants/beverageObjects";
import { searchTypes, beverageTypes } from "../../constants/searchTypes";

// todo: lägga till en bättre loading
// todo: lägga till finns grej när searchResults är tom
// todo: fixa beer strängarna då man får konstiga tecknen tex: Abbaye D&#39;aulne Christmas Triple Ale

export const AddBeverageToMenu = ({
  setModalBeverage,
  setShowModal,
  menu,
  addToMenu,
  currentSearchType,
  setCurrentSearchType,
  searchedBeverageType,
  setBeverageCardType,
}) => {
  const shownSearchType = () => {
    switch (currentSearchType) {
      case searchTypes.API:
        return (
          <SearchNewBeveragePresenter
            setNewBeverage={setModalBeverage}
            setShowModal={setShowModal}
            menu={menu}
            addToMenu={(beverage: Beverage) => addToMenu(beverage)}
            customizedType={searchedBeverageType}
            currentSearchType={currentSearchType}
            setBeverageCardType={setBeverageCardType}
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
            setBeverageCardType={setBeverageCardType}
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
        className="customizeMenu__Button"
        onClick={() => setCurrentSearchType(searchTypes.API)}
        disabled={currentSearchType === searchTypes.API}
      >
        Search new
      </button>
      <button
        className="customizeMenu__Button"
        onClick={() => setCurrentSearchType(searchTypes.HISTORY)}
        disabled={currentSearchType === searchTypes.HISTORY}
      >
        Find old
      </button>
      <button
        className="customizeMenu__Button"
        onClick={() => setCurrentSearchType(searchTypes.NEW)}
        disabled={currentSearchType === searchTypes.NEW}
      >
        Create
      </button>
      {shownSearchType()}
    </div>
  );
};
