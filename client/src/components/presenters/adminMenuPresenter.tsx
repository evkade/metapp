import React from "react";
import { AdminMenu } from "../views/adminMenu";
import { beverageTypes } from "../../constants/searchTypes";
import { Beverage } from "../../constants/beverageObjects";
import { beverageCardTypes } from "../../constants/beverageCardType";

export const AdminMenuPresenter = ({
  setModalBeverage,
  setShowModal,
  menu,
  removeFromMenu,
  editInMenu,
  customizedType,
  setBeverageCardType,
}) => {
  const openModal = (beverage: Beverage) => {
    setModalBeverage(beverage);
    // need this so that modal knows if it is editing or adding a beverage
    setBeverageCardType(beverageCardTypes.ADMIN_MENU);
    setShowModal(true);
  };

  return (
    <AdminMenu
      menu={customizedType === beverageTypes.BEER ? menu.beer : menu.cocktail}
      removeFromMenu={removeFromMenu}
      editInMenu={editInMenu}
      openModal={openModal}
    />
  );
};
