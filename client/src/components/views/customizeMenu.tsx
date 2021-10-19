import React from "react";
import { AddBeverageToMenuPresenter } from "../presenters/addBeverageToMenuPresenter";
import { AdminMenuPresenter } from "../presenters/adminMenuPresenter";
import { Beverage } from "../../constants/beverageObjects";

export const CustomizeMenu = ({
  showModal,
  setShowModal,
  menu,
  addToMenu,
  removeFromMenu,
  customizedType,
}) => {
  return (
    <div>
      <AdminMenuPresenter
        showModal={showModal}
        setShowModal={setShowModal}
        menu={menu}
        removeFromMenu={removeFromMenu}
        customizedType={customizedType}
      />
      <AddBeverageToMenuPresenter
        showModal={showModal}
        setShowModal={setShowModal}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
        customizedType={customizedType}
      />
    </div>
  );
};
