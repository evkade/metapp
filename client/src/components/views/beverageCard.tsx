import React from "react";
import "../components.scss";
import { beverageCardTypes } from "../../constants/beverageCardType";

export const BeverageCard = ({
  beverageCardType,
  beverage,
  index,
  addToOrder,
  removeFromOrder,
  count,
  openModal,
  removeFromMenu,
}) => {
  const buttons = () => {
    switch (beverageCardType) {
      case beverageCardTypes.USER_MENU:
        return (
          <div>
            <button onClick={() => addToOrder(beverage.name)}>+</button>
            <span> {count} </span>
            <button onClick={() => removeFromOrder(beverage.name)}>-</button>
          </div>
        );
      case beverageCardTypes.ADMIN_MENU:
        return (
          <div>
            <button onClick={() => openModal(beverage)}> Edit </button>
            <button onClick={() => removeFromMenu(beverage)}> Delete </button>
          </div>
        );
      case beverageCardTypes.ADMIN_SEARCH_RESULTS:
        return (
          <div>
            <button onClick={() => openModal(beverage)}> Add to Menu </button>
          </div>
        );
      default:
        return null; // todo: remove when typing has been fixed
    }
  };

  return (
    <div key={index} className="menuView__drinkCard">
      <img src="" className="menuView__drinkCard__image" />
      <div className="menuView__drinkCard__name">{beverage.name}</div>
      <div className="menuView__drinkCard__pricealc">
        {beverage.price} SEK | {beverage.alcoholPercentage} %
      </div>
      <div className="menuView__drinkCard__addToCart">{buttons()}</div>
    </div>
  );
};
