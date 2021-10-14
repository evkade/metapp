import React, { useEffect, useState } from "react";
import { NewBeverageForm } from "../views/newBeverageForm";

export const NewBeverageFormPresenter = ({
  menu,
  addToMenu,
  customizedType,
}) => {
  return (
    <NewBeverageForm
      menu={menu}
      addToMenu={addToMenu}
      customizedType={customizedType}
    />
  );
};
