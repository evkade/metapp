import React from "react";
import { AddBeverageToMenuPresenter } from "../presenters/addBeverageToMenuPresenter";
import { AdminMenuPresenter } from "../presenters/adminMenuPresenter";
import { CreateBeverageForMenuModalPresenter } from "../presenters/createBeverageForMenuModalPresenter";
import { Beverage } from "../../constants/beverageObjects";

export const CustomizeMenu = ({
  showModal,
  setShowModal,
  modalBeverage,
  setModalBeverage,
  menu,
  addToMenu,
  removeFromMenu,
  customizedType,
  currentSearchType,
  setCurrentSearchType,
}) => {
  return (
    <div>
      <AdminMenuPresenter
        setModalBeverage={setModalBeverage}
        setShowModal={setShowModal}
        menu={menu}
        removeFromMenu={removeFromMenu}
      />
      <AddBeverageToMenuPresenter
        setModalBeverage={setModalBeverage}
        setShowModal={setShowModal}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        customizedType={customizedType}
        currentSearchType={currentSearchType}
        setCurrentSearchType={setCurrentSearchType}
      />
      <CreateBeverageForMenuModalPresenter
        modalBeverage={modalBeverage}
        setModalBeverage={setModalBeverage}
        showModal={showModal}
        setShowModal={setShowModal}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        customizedType={customizedType}
        currentSearchType={currentSearchType}
        setCurrentSearchType={setCurrentSearchType}
      />
    </div>
  );
};
