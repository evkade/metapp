import React, { useEffect, useState } from "react";
import { AddBeverageToMenuPresenter } from "../presenters/addBeverageToMenuPresenter";
import { MenuPresenter } from "../presenters/menuPresenter";
import { Beverage } from "constants/beverageObjects";

export const CustomizeMenu = ({
  menu,
  addToMenu,
  removeFromMenu,
  drinkModel,
}) => {
  return (
    <div>
      <MenuPresenter menu={menu} removeFromMenu={removeFromMenu}/>
      <AddBeverageToMenuPresenter
        drinkModel={drinkModel}
        menu={menu}
        addToMenu={(beverage: Beverage) => addToMenu(beverage)}
      />
    </div>
  );
};
