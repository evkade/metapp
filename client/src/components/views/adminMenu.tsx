import React from "react";
import "../components.scss";
import { Beverage } from "../../constants/beverageObjects";
import { BeverageCard } from "./beverageCard";
import { beverageCardTypes } from "../../constants/beverageCardType";

export const AdminMenu = ({
  setModalBeverage,
  setShowModal,
  menu,
  removeFromMenu,
}) => {
  const openModal = (beverage) => {
    setModalBeverage(beverage);
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
          />
        ))}
      </div>
    </div>
  );
};
