import React from "react";
import { NewBeverageForm } from "../views/newBeverageForm";

const NewBeverageFormPresenter = ({
  customizedType,
  beverageCardType,
  newBeverage,
  setNewBeverage,
}) => {
  return (
    <NewBeverageForm
      customizedType={customizedType}
      beverageCardType={beverageCardType}
      newBeverage={newBeverage}
      setNewBeverage={setNewBeverage}
    />
  );
};

export default NewBeverageFormPresenter;
