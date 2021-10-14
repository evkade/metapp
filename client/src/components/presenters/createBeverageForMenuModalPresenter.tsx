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
  setCurrentSearchType
}) => {

  // basically: cancel : hide modal and if it was create new put to api
  const onAddToMenu = (beverage: Beverage) => {
    addToMenu(beverage);
    setCurrentSearchType(searchTypes.API);
    setShowModal(false);
  };

  // This is the new beverage that is created
  const [newBeverage, setNewBeverage] = useState(
    customizedType === beverageTypes.BEER ? beer : cocktail
  );

  return (
    <CreateBeverageForMenuModal
      showModal={showModal}
      setShowModal={setShowModal}
      menu={menu}
      addToMenu={addToMenu}
      onAddToMenu={onAddToMenu}
      beverageType={customizedType}
      newBeverage={newBeverage}
      setNewBeverage={setNewBeverage}
    />
  );
};

const beer: Beer = {
  name: "",
  price: 0,
  type: "",
  volume: 0,
  alcoholPercentage: 0,
};

const cocktail: Cocktail = {
  name: "",
  price: 0,
  ingredientList: [],
  ingredientMeasuresList: [],
};
