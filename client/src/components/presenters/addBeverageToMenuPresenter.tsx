import React, { useState } from "react";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import { Beverage } from "constants/beverageObjects";
import { searchTypes } from "../../constants/searchTypes";

export const AddBeverageToMenuPresenter = ({
  modalBeverage,
  setModalBeverage,
  showModal,
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
        modalBeverage={modalBeverage}
        setModalBeverage={setModalBeverage}
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
