import React from "react";

export const Menu = ({ showModal, setShowModal, menu, removeFromMenu, customizedType }) => {
  console.log('Menu', menu);
  // todo: när edit så show modal med info från den här relevanta drinken
  return (
    <div>
        <div>MENU : </div>
      {menu.map((beverage) => (
        <div onClick={() => console.log(beverage.name)}>
          <div> {hashListToDiv(beverage)} </div>
          <button type="submit" onClick={() => setShowModal(true)}>
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
