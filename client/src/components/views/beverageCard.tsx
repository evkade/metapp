import React from "react";
import { beverageCardTypes } from "../../constants/beverageCardType";
import { beverageTypes, getTypeOfBeverage } from "../../constants/searchTypes";
import { Beverage } from "../../constants/beverageObjects";

const BeverageCard = ({
  beverageCardType,
  beverage,
  index,
  addToOrder,
  removeFromOrder,
  count,
  openModal,
  removeFromMenu,
  editInMenu,
  menu,
}) => {
  const buttons = () => {
    switch (beverageCardType) {
      case beverageCardTypes.USER_MENU:
        return (
          <div>
            <button
              className="general-button--bw general-button--black"
              onClick={() => addToOrder(beverage.name)}
            >
              +
            </button>
            <span> {count} </span>
            <button
              className="general-button--bw general-button--black"
              onClick={() => removeFromOrder(beverage.name)}
            >
              -
            </button>
          </div>
        );
      case beverageCardTypes.ADMIN_MENU:
        return (
          <div>
            <button
              className="general-button--bw general-button--black"
              onClick={() => openModal(beverage)}
            >
              {" "}
              Edit{" "}
            </button>
            <button
              className="general-button--bw general-button--black"
              onClick={() => removeFromMenu(beverage)}
            >
              {" "}
              Delete{" "}
            </button>
          </div>
        );
      case beverageCardTypes.ADMIN_SEARCH_RESULTS:
        return (
          <div>
            <button
              className="general-button--bw general-button--black"
              onClick={() => openModal(beverage)}
              disabled={
                menu.beer.some(
                  (menuItem: Beverage) => menuItem.name === beverage.name
                ) ||
                menu.cocktail.some(
                  (menuItem: Beverage) => menuItem.name === beverage.name
                )
              }
            >
              {" "}
              {menu.beer.some(
                (menuItem: Beverage) => menuItem.name === beverage.name
              ) ||
              menu.cocktail.some(
                (menuItem: Beverage) => menuItem.name === beverage.name
              )
                ? "Already in Menu"
                : "Add to Menu"}{" "}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const information = () => {
    const beverageType = getTypeOfBeverage(beverage);

    switch (beverageCardType) {
      case beverageCardTypes.USER_MENU:
        return beverage.price + " SEK | " + beverageType === beverageTypes.BEER
          ? beverage.alcoholPercentage + "%"
          : beverage.alcoholVolume + " cl";

      case beverageCardTypes.ADMIN_MENU:
        return (
          beverage.price +
          " SEK " +
          (beverageType === beverageTypes.BEER
            ? beverage.alcoholPercentage + "%"
            : beverage.alcoholVolume + " cl")
        );

      case beverageCardTypes.ADMIN_SEARCH_RESULTS:
        return beverageType === beverageTypes.BEER
          ? beverage.price + " SEK | " + beverage.alcoholPercentage + "%"
          : null;
      default:
        return null;
    }
  };

  return (
    <div key={index} className="beverage-list__row">
      <div className="beverage-list__column beverage-list__column--black">
        {beverage.name}
      </div>
      <div className="beverage-list__column beverage-list__column--black beverage-list__column--flexed">
        {information()}
      </div>
      <div className="beverage-list__column beverage-list__column--black beverage-list__column--flexed">
        {buttons()}
      </div>
    </div>
  );
};

export default BeverageCard;
