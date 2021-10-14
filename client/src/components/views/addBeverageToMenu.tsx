import React from "react";
import { beverageTypes } from "../../constants/searchTypes";
import { SearchNewBeveragePresenter } from "../presenters/searchNewBeveragePresenter";
import { SearchHistoryPresenter } from "../presenters/searchHistoryPresenter";
import { CreateBeverageForMenuModalPresenter } from "../presenters/createBeverageForMenuModalPresenter";

import { Beverage } from "../../constants/beverageObjects";
import { searchTypes } from "../../constants/searchTypes";

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
  console.log('currentSearchType', currentSearchType);

  // misstänker att man måste använda en useeffect? men inte 100 då man använder en usestate
  const shownSearchType = () => {
    switch (currentSearchType) {
      case searchTypes.API:
        return (
          <SearchNewBeveragePresenter
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
            showModal={showModal}
            setShowModal={setShowModal}
            menu={menu}
            addToMenu={(beverage: Beverage) => addToMenu(beverage)}
            customizedType={searchedBeverageType}
          />
        );
      default: return null // todo: add types so you can remove this
    }
  };
  return (
    <div>
      <button onClick={() => setCurrentSearchType(searchTypes.API)}> Search new </button>
      <button onClick={() => setCurrentSearchType(searchTypes.HISTORY)}> Find old </button>
      <button onClick={() => setCurrentSearchType(searchTypes.NEW)}> Create </button>
      {shownSearchType()}
    </div>
  );
};
