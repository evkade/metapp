import React from "react";
import { Beverage } from "../../constants/beverageObjects";
import Drink from "./drinkView";

export const UserMenu = ({
  orderItems,
  setOrderItems,
  menuItems,
  addToOrder,
  removeFromOrder,
  finalizeOrder,
  addToFavorites,
  removeFromFavorites,
  favoriteList,
}) => {
  return (
    <div className="menuView">
      <div className="pageTitleNeon">Menu</div>
      <div className="menuView__container">
        {menuItems.map((item: Beverage, index: number) => {
          var orderCount: number = 0;
          const filteredOutItem = orderItems.filter(
            (orderItem) => orderItem.name == item.name
          );
          if (filteredOutItem.length == 1) {
            orderCount = filteredOutItem[0].count;
          }
          return (
            <Drink
              item={item}
              index={index}
              addToOrder={(name: string) => addToOrder(name)}
              removeFromOrder={(name: string) => removeFromOrder(name)}
              count={orderCount}
              addFavorite={(name) => addToFavorites(name)}
              removeFavorite={(name) => removeFromFavorites(name)}
              favoriteList={favoriteList}
            />
          );
        })}
      </div>
      {orderItems.length > 0 && (
        <button
          className="menuView__orderButton"
          onClick={() => finalizeOrder()}
        >
          Place order
        </button>
      )}
    </div>
  );
};
