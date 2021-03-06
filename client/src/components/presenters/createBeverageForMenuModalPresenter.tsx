import React from "react";
import CreateBeverageForMenuModal from "../views/createBeverageForMenuModal";
import { beverageTypes, searchTypes } from "../../constants/searchTypes";
import { Beverage } from "../../constants/beverageObjects";
import { beverageCardTypes } from "../../constants/beverageCardType";
import { baseBeer, baseCocktail } from "../../constants/beverageObjects";
// todo: all beverages should be added to history when being added to menu

const CreateBeverageForMenuModalPresenter = ({
  showModal,
  setShowModal,
  menu,
  addToMenu,
  editInMenu,
  customizedType,
  currentSearchType,
  setCurrentSearchType,
  modalBeverage,
  setModalBeverage,
  beverageCardType,
}) => {
  const onAddToMenu = (beverage: Beverage) => {
    addToMenu(beverage);
    if (currentSearchType === searchTypes.NEW)
      setCurrentSearchType(searchTypes.API);
    setModalBeverage(
      customizedType === beverageTypes.BEER ? baseBeer : baseCocktail
    );
    setShowModal(false);
  };

  const onEditInMenu = (beverage: Beverage) => {
    editInMenu(beverage);
    if (currentSearchType === searchTypes.NEW)
      setCurrentSearchType(searchTypes.API);
    setModalBeverage(
      customizedType === beverageTypes.BEER ? baseBeer : baseCocktail
    );
    setShowModal(false);
  };

  const onCancel = (beverage: Beverage) => {
    if (currentSearchType === searchTypes.NEW)
      setCurrentSearchType(searchTypes.API);
    setModalBeverage(
      customizedType === beverageTypes.BEER ? baseBeer : baseCocktail
    );
    setShowModal(false);
  };

  const modalTitle: string =
    beverageCardType === beverageCardTypes.ADMIN_MENU
      ? "Edit " + customizedType
      : "Add " + customizedType + " to menu";

  const modal = showModal ? (
    <CreateBeverageForMenuModal
      onAddToMenu={onAddToMenu}
      onEditInMenu={onEditInMenu}
      onCancel={onCancel}
      beverageType={customizedType}
      newBeverage={modalBeverage}
      setNewBeverage={setModalBeverage}
      beverageCardType={beverageCardType}
      modalTitle={modalTitle}
    />
  ) : null;

  return modal;
};

export default CreateBeverageForMenuModalPresenter;
