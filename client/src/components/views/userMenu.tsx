import React from "react";
import { Beverage } from "../../constants/beverageObjects";
import BeverageView from "./beverageView";
import { beverageTypes } from "../../constants/searchTypes";

const UserMenu = ({
  orderItems,
  beerMenu,
  cocktailMenu,
  addToOrder,
  removeFromOrder,
  placeUnFinishedOrder,
  isfavorite,
  addToFavorites,
  removeFromFavorites,
  totalInfo,
  loading,
  spinner,
}) => {
  return (
    <div className="beverage-list container--general">
      {loading ? (
        spinner
      ) : (
        <>
          <div className="title-neon--big">Menu</div>
          <div className="beverage-list__container">
            <div className="beverage-type"> Beers </div>
            {beerMenu &&
              beerMenu.map((item: Beverage, index: number) => {
                var orderCount: number = 0;
                const filteredOutItem = orderItems.filter(
                  (orderItem) => orderItem.name == item.name
                );
                if (filteredOutItem.length == 1) {
                  orderCount = filteredOutItem[0].count;
                }
                const favoriteBool: Boolean = isfavorite(item.name);
                return (
                  <BeverageView
                    item={item}
                    key={index}
                    index={index}
                    itemType={beverageTypes.BEER}
                    addToOrder={(name: string, price: string) =>
                      addToOrder(name, price)
                    }
                    removeFromOrder={(name: string, price: string) =>
                      removeFromOrder(name, price)
                    }
                    isfavorite={favoriteBool}
                    count={orderCount}
                    addFavorite={(name) =>
                      addToFavorites(name, beverageTypes.BEER)
                    }
                    removeFavorite={(name) => removeFromFavorites(name)}
                    menuDisplay={true}
                  />
                );
              })}

            <div className="beverage-type"> Cocktails </div>
            {cocktailMenu &&
              cocktailMenu.map((item: Beverage, index: number) => {
                var orderCount: number = 0;
                const filteredOutItem = orderItems.filter(
                  (orderItem) => orderItem.name == item.name
                );
                if (filteredOutItem.length == 1) {
                  orderCount = filteredOutItem[0].count;
                }
                const favoriteBool: Boolean = isfavorite(item.name);
                return (
                  <BeverageView
                    item={item}
                    key={index}
                    index={index}
                    itemType={beverageTypes.COCKTAIL}
                    addToOrder={(name: string, price: string) =>
                      addToOrder(name, price)
                    }
                    removeFromOrder={(name: string, price: string) =>
                      removeFromOrder(name, price)
                    }
                    count={orderCount}
                    addFavorite={(name) =>
                      addToFavorites(name, beverageTypes.COCKTAIL)
                    }
                    removeFavorite={(name) => removeFromFavorites(name)}
                    isfavorite={favoriteBool}
                    menuDisplay={true}
                  />
                );
              })}
          </div>
          {orderItems.length > 0 && (
            <button
              className="beverage-list__button"
              onClick={() => placeUnFinishedOrder()}
            >
              Place order <br />
              {totalInfo.totalCount}{" "}
              {totalInfo.totalCount == 1 ? "item" : "items"} á{" "}
              {totalInfo.totalCost} SEK
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default UserMenu;
