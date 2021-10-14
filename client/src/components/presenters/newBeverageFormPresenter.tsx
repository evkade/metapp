import React from "react";
import { NewBeverageForm } from "../views/newBeverageForm";

export const NewBeverageFormPresenter = ({
  menu,
  addToMenu,
  customizedType,
  newBeverage,
  setNewBeverage
}) => {
  return (
    <NewBeverageForm
      menu={menu}
      addToMenu={addToMenu}
      customizedType={customizedType}
      newBeverage={newBeverage}
      setNewBeverage={setNewBeverage}
    />
  );
};
