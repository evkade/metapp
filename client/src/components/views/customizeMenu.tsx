import React, { useEffect, useState } from "react";
import { AddBeverageToMenuPresenter } from "../presenters/addBeverageToMenuPresenter";
import { MenuPresenter } from "../presenters/menuPresenter";
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
      <MenuPresenter
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
