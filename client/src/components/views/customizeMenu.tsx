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
  history,
  menu,
  addToMenu,
  removeFromMenu,
  editInMenu,
  customizedType,
  currentSearchType,
  setCurrentSearchType,
  beverageCardType,
  setBeverageCardType,
}) => {
  return (
    <div className="admin-menu-container__row">
      <div className="admin-menu-container__column admin-menu-container__column--flex">
        <AdminMenuPresenter
          setShowModal={setShowModal}
          setModalBeverage={setModalBeverage}
          menu={menu}
          removeFromMenu={removeFromMenu}
          editInMenu={editInMenu}
          customizedType={customizedType}
          setBeverageCardType={setBeverageCardType}
        />
      </div>
      <div className="admin-menu-container__column">
        <AddBeverageToMenuPresenter
          setShowModal={setShowModal}
          setModalBeverage={setModalBeverage}
          menu={menu}
          history={history}
          addToMenu={(beverage: Beverage) => addToMenu(beverage)}
          customizedType={customizedType}
          currentSearchType={currentSearchType}
          setCurrentSearchType={setCurrentSearchType}
          setBeverageCardType={setBeverageCardType}
        />
      </div>
      <CreateBeverageForMenuModalPresenter
        showModal={showModal}
        setShowModal={setShowModal}
        modalBeverage={modalBeverage}
        setModalBeverage={setModalBeverage}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        editInMenu={(beverage: Beverage) => editInMenu(beverage)}
        customizedType={customizedType}
        currentSearchType={currentSearchType}
        setCurrentSearchType={setCurrentSearchType}
        beverageCardType={beverageCardType}
      />
    </div>
  );
};
