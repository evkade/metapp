import React, { useState } from "react";
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

  console.log('New Beverage', newBeverage);

  return (
    <form>
      <label>
        Name:
        <input type="text" name="name" onChange={e => setNewBeverage({...newBeverage, name: e.target.value})}/> 
      </label>
      <label>
        Price:
        <input type="text" name="price" onChange={e => setNewBeverage({...newBeverage, price: e.target.value})}/>
      </label>
      {customizedType === beverageTypes.BEER ? (
        <div>
          <label>
            Type:
            <input type="text" name="type" onChange={e => setNewBeverage({...newBeverage, type: e.target.value})}/>
          </label>
          <label>
            Volume:
            <input type="text" name="volume" onChange={e => setNewBeverage({...newBeverage, volume: e.target.value})}/>
          </label>
          <label>
            Alcohol percentage:
            <input type="text" name="alcoholPercentage" onChange={e => setNewBeverage({...newBeverage, alcoholPercentage: e.target.value})}/>
          </label>
        </div>
      ) : (
        <div>
          <label>
            Ingredients:
            <input type="text" name="ingredients" onChange={e => setNewBeverage({...newBeverage, ingredientList: e.target.value})}/>
          </label>
        </div>
      )}
    </form>
  );
};
