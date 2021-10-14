import React, { useState } from "react";
import { CreateBeverageForMenuModal } from "../views/createBeverageForMenuModal";
import { beverageTypes, searchTypes } from "../../constants/searchTypes";
import { Beer, Cocktail, Beverage } from "../../constants/beverageObjects";

export const CreateBeverageForMenuModalPresenter = ({
  showModal,
  setShowModal,
  menu,
  addToMenu,
  customizedType,
  setCurrentSearchType,
  newBeverage,
  setNewBeverage
}) => {   // new beverage should be a prop as it should contain fields from the api / history

  const onAddToMenu = (beverage: Beverage) => {
    // beverage = {...newBeverage, 
    // setNewBeverage()
    // then 
    addToMenu(beverage);
    setCurrentSearchType(searchTypes.API);
    setShowModal(false);
  };

  const onCancel = (beverage: Beverage) => {
    // beverage = {...newBeverage, 
    // setNewBeverage()
    // then 
    setCurrentSearchType(searchTypes.API);
    setShowModal(false);
  };

  return (
    <CreateBeverageForMenuModal
      showModal={showModal}
      setShowModal={setShowModal}
      menu={menu}
      addToMenu={addToMenu}
      onAddToMenu={onAddToMenu}
      onCancel={onCancel}
      beverageType={customizedType}
      newBeverage={newBeverage}
      setNewBeverage={setNewBeverage}
    />
  );
};
