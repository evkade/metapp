import React from "react";
import { Beverage } from "../../constants/beverageObjects";
import BeverageCard from "./beverageCard";
import { beverageCardTypes } from "../../constants/beverageCardType";

const AdminMenu = ({ menu, removeFromMenu, editInMenu, openModal }) => {
  return (
    <div className="container--centered">
      <div className="drink-list__container--grey drink-list__container--grey-full">
        {menu.map((beverage: Beverage, index: number) => (
          <BeverageCard
            key={index}
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

export default AdminMenu;
