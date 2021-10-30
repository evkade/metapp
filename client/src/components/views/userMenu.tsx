import React from 'react';
import { Beverage } from '../../constants/beverageObjects';
import Drink from './drinkView';
import { beverageTypes } from '../../constants/searchTypes';

export const UserMenu = ({
  orderItems,
  setOrderItems,
  beerMenu,
  cocktailMenu,
  addToOrder,
  removeFromOrder,
  placeUnFinishedOrder,
  isfavorite,
  addToFavorites,
  removeFromFavorites,
  favoriteList,
  totalInfo,
  loading,
  spinner,
}) => {
  return (
    <div className='drink-list container--general'>
      {loading ? (
        spinner
      ) : (
        <>
          <div className='title-neon--big'>Menu</div>
          <div className='drink-list__container'>
            <div className='beverage-type'> Beers </div>
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
                  <Drink
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

            <div className='beverage-type'> Cocktails </div>
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
                  <Drink
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
              className='drink-list__button'
              onClick={() => placeUnFinishedOrder()}
            >
              Place order <br />
              {totalInfo.totalCount}{' '}
              {totalInfo.totalCount == 1 ? 'item' : 'items'} á{' '}
              {totalInfo.totalCost} SEK
            </button>
          )}
        </>
      )}
    </div>
  );
};
