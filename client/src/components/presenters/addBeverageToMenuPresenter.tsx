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
  setBeverageCardType,
}) => {
  return (
    <div>
      <AddBeverageToMenu
        setModalBeverage={setModalBeverage}
        setShowModal={setShowModal}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        currentSearchType={currentSearchType}
        setCurrentSearchType={setCurrentSearchType}
        searchedBeverageType={customizedType}
        setBeverageCardType={setBeverageCardType}
      />
    </div>
  );
};
