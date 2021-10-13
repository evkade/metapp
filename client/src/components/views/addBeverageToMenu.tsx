import React from "react";
import { beverageTypes } from "../../constants/searchTypes";
import { SearchNewBeveragePresenter } from "../presenters/searchNewBeveragePresenter";
import { SearchHistoryPresenter } from "../presenters/searchHistoryPresenter";
import { Beverage } from "../../constants/beverageObjects";

// todo: lägga till en bättre loading
// todo: lägga till finns grej när searchResults är tom
// todo: fixa beer strängarna då man får konstiga tecknen tex: Abbaye D&#39;aulne Christmas Triple Ale
// todo: is if in menu grey button 
// todo: 
export const AddBeverageToMenu = ({
  searchedBeverageType,
  toggleSearchedBeverageType,
  menu,
  addToMenu,
}) => {
  const toggleSearchTypeButtonClick = () => {
    toggleSearchedBeverageType();
    // setQuery("");
    // setSearchResults("");
  };

  const toggleSearchTypeButtonLabel: string =
    "Add " +
    (searchedBeverageType === beverageTypes.BEER
      ? beverageTypes.COCKTAIL
      : beverageTypes.BEER) +
    " to menu";

  return (
    <div>
      <button type="submit" onClick={() => toggleSearchTypeButtonClick()}>
        {toggleSearchTypeButtonLabel}
      </button>
      <SearchNewBeveragePresenter
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        searchType={searchedBeverageType}
      />
      <SearchHistoryPresenter
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        searchType={searchedBeverageType}
      />
    </div>
  );
};
