import React from "react";
import "../components.scss";
import Drink from "./DrinkView";

const MenuView = ({
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
        {menuItems.map((item, index) => {
          var orderCount: number = 0;
          const filteredOutItem = orderItems.filter(
            (orderItem) => orderItem.name == item.name
          );
          if (filteredOutItem.length == 1) {
            orderCount = filteredOutItem[0].count;
          }
          return (
            <Drink
              key={index}
              item={item}
              index={index}
              addToOrder={(name) => addToOrder(name)}
              removeFromOrder={(name) => removeFromOrder(name)}
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

export default MenuView;