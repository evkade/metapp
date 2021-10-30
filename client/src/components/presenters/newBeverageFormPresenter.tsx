import React from "react";
import { NewBeverageForm } from "../views/newBeverageForm";

const NewBeverageFormPresenter = ({
  customizedType,
  newBeverage,
  setNewBeverage,
}) => {
  return (
    <NewBeverageForm
      customizedType={customizedType}
      newBeverage={newBeverage}
      setNewBeverage={setNewBeverage}
    />
  );
};

export default NewBeverageFormPresenter;
