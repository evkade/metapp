import React, { useEffect, useState } from "react";

export const Menu = ({ menu, removeFromMenu }) => {
  console.log('Menu', menu);
  return (
    <div>
        <div>MENU : </div>
      {menu.map((beverage) => (
        <div onClick={() => console.log(beverage.name)}>
          <div> {hashListToDiv(beverage)} </div>
          <button type="submit" onClick={() => console.log("Edit")}>
            Edit
          </button>
          <button type="submit" onClick={() => removeFromMenu(beverage)}>
            Remove from menu
          </button>
          <br />
        </div>
      ))}
    </div>
  );
};

// temporary graphic solution for showing the beverages
const hashListToDiv = (hashList) => {
  var divList = [];
  for (var k in hashList) {
    const value = hashList[k];
    if (value === "ingredientList" || value === "ingredientMeasuresList") {
      // type of value is object
      divList = [...divList, <div>{hashListToDiv(value)}</div>];
    } else {
      divList = [...divList, <div>{k + ": " + value}</div>];
    }
  }
  return divList;
};
