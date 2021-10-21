import React from "react";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import { Beverage } from "constants/beverageObjects";

export const AddBeverageToMenuPresenter = ({
  setModalBeverage,
  setShowModal,
  menu,
  history,
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
        history={history}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        currentSearchType={currentSearchType}
        setCurrentSearchType={setCurrentSearchType}
        searchedBeverageType={customizedType}
        setBeverageCardType={setBeverageCardType}
      />
    </div>
  );
};
