import React, { useEffect, useState } from "react";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import { beverageTypes } from "../../constants/searchTypes";
import { Beverage } from "constants/beverageObjects";

export const AddBeverageToMenuPresenter = ({ menu, addToMenu }) => {

  const [searchedBeverageType, setSearchedBeverageType] = useState(beverageTypes.COCKTAIL); // default

  const toggleSearchedBeverageType = () => {
    switch (searchedBeverageType) {
      case beverageTypes.BEER:
        setSearchedBeverageType(beverageTypes.COCKTAIL);
        break;
      case beverageTypes.COCKTAIL:
        setSearchedBeverageType(beverageTypes.BEER);
        break;
    }
  };

  return (
    <div>
      <AddBeverageToMenu
        searchedBeverageType={searchedBeverageType}
        toggleSearchedBeverageType={() => toggleSearchedBeverageType()}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
      />
    </div>
  );
};
