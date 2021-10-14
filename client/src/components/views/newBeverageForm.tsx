import React from "react";
import { beverageTypes } from "../../constants/searchTypes";

export const NewBeverageForm = ({
  menu,
  addToMenu,
  customizedType,
  newBeverage,
  setNewBeverage,
}) => {
    // todo: pre-fill fields with beverage information 
    // todo: build a new beverage
  return (
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Price:
        <input type="text" name="name" />
      </label>
      {customizedType === beverageTypes.BEER ? (
        <div>
          <label>
            Type:
            <input type="text" name="name" />
          </label>
          <label>
            Volume:
            <input type="text" name="name" />
          </label>
          <label>
            Alcohol percentage:
            <input type="text" name="name" />
          </label>
        </div>
      ) : (
        <div>
          <label>
            Ingredients:
            <input type="text" name="name" />
          </label>
        </div>
      )}
    </form>
  );
};
