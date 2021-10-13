import React, { useEffect, useState } from "react";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import { searchTypes } from "../../constants/searchTypes";
import { Beverage } from "constants/beverageObjects";

export const AddBeverageToMenuPresenter = ({ menu, addToMenu }) => {

  const [searchType, setSearchType] = useState(searchTypes.COCKTAIL); // default

  const toggleSearchType = () => {
    switch (searchType) {
      case searchTypes.BEER:
        setSearchType(searchTypes.COCKTAIL);
        break;
      case searchTypes.COCKTAIL:
        setSearchType(searchTypes.BEER);
        break;
    }
  };

  return (
    <div>
      <AddBeverageToMenu
        searchType={searchType}
        toggleSearchType={() => toggleSearchType()}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
      />
    </div>
  );
};
