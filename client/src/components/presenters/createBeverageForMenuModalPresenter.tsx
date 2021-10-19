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
  setCurrentSearchType,
  modalBeverage,
  setModalBeverage,
}) => {
  const onAddToMenu = (beverage: Beverage) => {
    addToMenu(beverage);
    // todo if current search type is new then do this otherwise no
    setCurrentSearchType(searchTypes.API);
    setShowModal(false);
  };

  const onCancel = (beverage: Beverage) => {
    // todo if current search type is new then do this otherwise no
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
