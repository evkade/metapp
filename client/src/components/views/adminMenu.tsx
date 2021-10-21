import React from "react";
import { Beverage } from "../../constants/beverageObjects";
import { BeverageCard } from "./beverageCard";
import { beverageCardTypes } from "../../constants/beverageCardType";
import { beverageTypes } from "../../constants/searchTypes";

export const AdminMenu = ({
  setModalBeverage,
  setShowModal,
  menu,
  removeFromMenu,
  editInMenu,
  customizedType, // will be needed to only show beers / cocktails
  setBeverageCardType,
}) => {
  const openModal = (beverage: Beverage) => {
    setModalBeverage(beverage);
    // need this so that modal knows if it is editing or adding a beverage
    setBeverageCardType(beverageCardTypes.ADMIN_MENU);
    setShowModal(true);
  };

  return (
    <div className="container--centered">
      <div className="drink-list__container">
        {customizedType === beverageTypes.BEER
          ? menu.beer.map((beverage: Beverage, index: number) => (
              <BeverageCard
                menu={menu}
                beverageCardType={beverageCardTypes.ADMIN_MENU}
                beverage={beverage}
                index={index}
                addToOrder={null}
                removeFromOrder={null}
                count={null}
                openModal={() => openModal(beverage)}
                removeFromMenu={removeFromMenu}
                editInMenu={editInMenu}
              />
            ))
          : menu.beer.map((beverage: Beverage, index: number) => (
              <BeverageCard
                menu={menu}
                beverageCardType={beverageCardTypes.ADMIN_MENU}
                beverage={beverage}
                index={index}
                addToOrder={null}
                removeFromOrder={null}
                count={null}
                openModal={() => openModal(beverage)}
                removeFromMenu={removeFromMenu}
                editInMenu={editInMenu}
              />
            ))}
      </div>
    </div>
  );
};
