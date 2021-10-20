import React, { useState } from "react";
import { SearchBeveragePresenter } from "../presenters/searchBeveragePresenter";
import { Beverage } from "../../constants/beverageObjects";
import { searchTypes } from "../../constants/searchTypes";

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
  return (
<<<<<<< HEAD
    <div>
      <button
        className="general-button--bw"
        onClick={() => setCurrentSearchType(searchTypes.API)}
        disabled={currentSearchType === searchTypes.API}
      >
        Search new
      </button>
      <button
        className="general-button--bw"
        onClick={() => setCurrentSearchType(searchTypes.HISTORY)}
        disabled={currentSearchType === searchTypes.HISTORY}
      >
        Find old
      </button>
      <button
        className="general-button--bw"
        onClick={() => setCurrentSearchType(searchTypes.NEW)}
        disabled={currentSearchType === searchTypes.NEW}
      >
        Create
      </button>
      {shownSearchType()}
    </div>
=======
    <SearchBeveragePresenter
      setNewBeverage={setModalBeverage}
      setShowModal={setShowModal}
      menu={menu}
      addToMenu={(beverage: Beverage) => addToMenu(beverage)}
      customizedType={searchedBeverageType}
      currentSearchType={currentSearchType}
      setCurrentSearchType={setCurrentSearchType}
      setBeverageCardType={setBeverageCardType}
    />
>>>>>>> 29b35c9902e7effadc3f317df60420a2d854a151
  );
};
