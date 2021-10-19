import React from "react";
import "../components.scss";
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
  customizedType, // maybe will be needed to only show beers / cocktails
  setBeverageCardType,
}) => {
  const openModal = (beverage: Beverage) => {
    setModalBeverage(beverage);
    // need this so that modal knows if it is editing or adding a beverage
    setBeverageCardType(beverageCardTypes.ADMIN_MENU);
    setShowModal(true);
  };

  return (
    <div>
      <div className="menuView__container">
        {menu.map((beverage: Beverage, index: number) => (
          <BeverageCard
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
