import React from "react";
import { AdminMenu } from "../views/adminMenu";

export const AdminMenuPresenter = ({
  setModalBeverage,
  setShowModal,
  menu,
  removeFromMenu,
}) => {
  // todo: bara skicka delen av menyn som är customized (beer or cocktail)
  return (
    <AdminMenu
      setModalBeverage={setModalBeverage}
      setShowModal={setShowModal}
      menu={menu}
      removeFromMenu={removeFromMenu}
    />
  );
};
