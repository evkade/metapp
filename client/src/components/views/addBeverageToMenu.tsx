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
  // case searchTypes.NEW:
  // setShowModal(true);

  return (
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
  );
};
