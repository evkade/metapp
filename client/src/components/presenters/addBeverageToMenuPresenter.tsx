import React, { useState } from "react";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import { Beverage } from "constants/beverageObjects";
import { searchTypes } from "../../constants/searchTypes";

export const AddBeverageToMenuPresenter = ({
  showModal,
  setShowModal,
  menu,
  addToMenu,
  customizedType,
}) => {

  const [currentSearchType, setCurrentSearchType] = useState<string>(searchTypes.API)

  return (
    <div>
      <AddBeverageToMenu
        showModal={showModal}
        setShowModal={setShowModal}
        currentSearchType={currentSearchType}
        setCurrentSearchType={setCurrentSearchType}
        searchedBeverageType={customizedType}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
      />
    </div>
  );
};
