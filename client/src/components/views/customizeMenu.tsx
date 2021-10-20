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
  editInMenu,
  customizedType,
  currentSearchType,
  setCurrentSearchType,
  beverageCardType,
  setBeverageCardType,
}) => {
  return (
    <div className="customizeMenu__Container">
      <div className="customizeMenu__Rectangle customizeMenu__Menu">
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
      <div className="customizeMenu__Rectangle customizeMenu__AddBeverageToMenu">
        <AddBeverageToMenuPresenter
          setShowModal={setShowModal}
          setModalBeverage={setModalBeverage}
          menu={menu}
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
