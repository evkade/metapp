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
        modalBeverage={modalBeverage}
        setModalBeverage={setModalBeverage}
        showModal={showModal}
        setShowModal={setShowModal}
        menu={menu}
        removeFromMenu={removeFromMenu}
        customizedType={customizedType}
      />
      <AddBeverageToMenuPresenter
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
      <CreateBeverageForMenuModalPresenter
        modalBeverage={modalBeverage}
        setModalBeverage={setModalBeverage}
        showModal={showModal}
        setShowModal={setShowModal}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        customizedType={customizedType}
        setCurrentSearchType={setCurrentSearchType}
      />
    </div>
  );
};
