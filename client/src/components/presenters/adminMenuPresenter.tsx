import React from "react";
import { AdminMenu } from "../views/adminMenu";

export const AdminMenuPresenter = ({
  modalBeverage,
  setModalBeverage,
  showModal,
  setShowModal,
  menu,
  removeFromMenu,
  customizedType,
}) => {
  // todo: bara skicka delen av menyn som är customized (beer or cocktail)
  return (
    <AdminMenu
      setModalBeverage={setModalBeverage}
      showModal={showModal}
      setShowModal={setShowModal}
      menu={menu}
      removeFromMenu={removeFromMenu}
    />
  );
};
