import React, { useEffect, useState } from "react";
import { beverageTypes } from "../../constants/searchTypes";

export const NewBeverageForm = ({ menu, addToMenu, customizedType }) => {
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
      <input type="submit" value="Submit" />
    </form>
  );
};
