import React from "react";
import { searchTypes } from "../../constants/searchTypes";
import { SearchNewBeveragePresenter } from "../presenters/searchNewBeveragePresenter";
import { Beverage } from "../../constants/beverageObjects";

// todo: lägga till en bättre loading
// todo: lägga till finns grej när searchResults är tom
// todo: fixa beer strängarna då man får konstiga tecknen tex: Abbaye D&#39;aulne Christmas Triple Ale

export const AddBeverageToMenu = ({
  searchType,
  toggleSearchType,
  menu,
  addToMenu,
}) => {
  const toggleSearchTypeButtonClick = () => {
    toggleSearchType();
    // setQuery("");
    //setSearchResults("");
  };

  const toggleSearchTypeButtonLabel: string =
    "Add " +
    (searchType === searchTypes.BEER
      ? searchTypes.COCKTAIL
      : searchTypes.BEER) +
    " to menu";

  return (
    <div>
      <button type="submit" onClick={() => toggleSearchTypeButtonClick()}>
        {toggleSearchTypeButtonLabel}
      </button>
      <SearchNewBeveragePresenter
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        searchType={searchType}
      />
    </div>
  );
};
