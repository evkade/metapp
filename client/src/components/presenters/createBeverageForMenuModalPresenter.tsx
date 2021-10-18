import React from "react";
import { CreateBeverageForMenuModal } from "../views/createBeverageForMenuModal";
import { searchTypes } from "../../constants/searchTypes";
import { Beverage } from "../../constants/beverageObjects";

// todo: all beverages should be added to history when being added to menu

export const CreateBeverageForMenuModalPresenter = ({
  showModal,
  setShowModal,
  menu,
  addToMenu,
  customizedType,
  currentSearchType,
  setCurrentSearchType,
  modalBeverage,
  setModalBeverage,
}) => {
  const onAddToMenu = (beverage: Beverage) => {
    addToMenu(beverage);
    if (currentSearchType === searchTypes.NEW)
      setCurrentSearchType(searchTypes.API);
    setShowModal(false);
  };

  const onCancel = (beverage: Beverage) => {
    if (currentSearchType === searchTypes.NEW)
      setCurrentSearchType(searchTypes.API);
    setShowModal(false);
  };

  const modal = showModal ? (
    <CreateBeverageForMenuModal
      menu={menu}
      addToMenu={addToMenu}
      onAddToMenu={onAddToMenu}
      onCancel={onCancel}
      beverageType={customizedType}
      newBeverage={modalBeverage}
      setNewBeverage={setModalBeverage}
    />
  ) : null;

  return modal;
};
