import React from "react";
import "../components.scss"; // behövs detta?
import { BeverageCard } from "./beverageCard";
import { beverageCardTypes } from "../../constants/beverageCardType";
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
    <div className="menuView">
      <div className="pageTitleNeon--big">Menu</div>
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
              key={index}
              index={index}
              addToOrder={(name: string, cost: string) =>
                addToOrder(name, cost)
              }
              removeFromOrder={(name: string) => removeFromOrder(name)}
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
          className="menuView__orderButton"
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
