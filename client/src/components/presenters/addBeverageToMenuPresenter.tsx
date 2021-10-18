import React, { useState } from "react";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import { Beverage } from "constants/beverageObjects";

export const AddBeverageToMenuPresenter = ({
  setModalBeverage,
  setShowModal,
  menu,
  addToMenu,
  customizedType,
  currentSearchType,
  setCurrentSearchType,
}) => {
  return (
    <div>
      <AddBeverageToMenu
        setModalBeverage={setModalBeverage}
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
