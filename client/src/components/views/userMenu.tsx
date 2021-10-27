import React from "react";
import { Beverage } from "../../constants/beverageObjects";
import Drink from "./drinkView";

export const UserMenu = ({
  orderItems,
  setOrderItems,
  menuItems,
  addToOrder,
  removeFromOrder,
  placeUnFinishedOrder,
  addToFavorites,
  removeFromFavorites,
  favoriteList,
  totalInfo,
}) => {
  return (
    <div className="drink-list container--general">
      <div className="title-neon--big">Menu</div>
      <div className="drink-list__container">
        {menuItems &&
          menuItems.map((item: Beverage, index: number) => {
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
                key={index}
                index={index}
                addToOrder={(name: string, price: string) =>
                  addToOrder(name, price)
                }
                removeFromOrder={(name: string, price: string) =>
                  removeFromOrder(name, price)
                }
                count={orderCount}
                addFavorite={(name) => addToFavorites(name)}
                removeFavorite={(name) => removeFromFavorites(name)}
                favoriteList={favoriteList}
                menuDisplay={true}
              />
            );
          })}
      </div>
      {orderItems.length > 0 && (
        <button
          className="drink-list__button"
          onClick={() => placeUnFinishedOrder()}
        >
          Place order <br />
          {totalInfo.totalCount} {totalInfo.totalCount == 1 ? "item" : "items"}{" "}
          á {totalInfo.totalCost} SEK
        </button>
      )}
    </div>
  );
};
