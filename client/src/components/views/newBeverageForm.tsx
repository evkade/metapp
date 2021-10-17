import React, { useState } from "react";
import { beverageTypes } from "../../constants/searchTypes";

export const NewBeverageForm = ({
  menu,
  addToMenu,
  customizedType,
  newBeverage,
  setNewBeverage,
}) => {
  // todo: fix the ingredients situation 

  console.log('New Beverage', newBeverage);

  return (
    <form>
      <label>
        Name:
        <input type="text" name="name" value={newBeverage.name} onChange={e => setNewBeverage({...newBeverage, name: e.target.value})}/> 
      </label>
      <label>
        Price:
        <input type="text" name="price" value={newBeverage.price} onChange={e => setNewBeverage({...newBeverage, price: e.target.value})}/>
      </label>
      {customizedType === beverageTypes.BEER ? (
        <div>
          <label>
            Type:
            <input type="text" name="type" value={newBeverage.type} onChange={e => setNewBeverage({...newBeverage, type: e.target.value})}/>
          </label>
          <label>
            Volume:
            <input type="text" name="volume" value={newBeverage.volume} onChange={e => setNewBeverage({...newBeverage, volume: e.target.value})}/>
          </label>
          <label>
            Alcohol percentage:
            <input type="text" name="alcoholPercentage" value={newBeverage.alcoholPercentage} onChange={e => setNewBeverage({...newBeverage, alcoholPercentage: e.target.value})}/>
          </label>
        </div>
      ) : (
        <div>
          <label>
            Ingredients:
            <input type="text" name="ingredients" value={newBeverage.ingredientList} onChange={e => setNewBeverage({...newBeverage, ingredientList: e.target.value})}/>
          </label>
        </div>
      )}
    </form>
  );
};
