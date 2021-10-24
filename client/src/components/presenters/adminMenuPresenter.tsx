import React from "react";
import { AdminMenu } from "../views/adminMenu";

export const AdminMenuPresenter = ({
  setModalBeverage,
  setShowModal,
  menu,
  removeFromMenu,
  editInMenu,
  customizedType,
  setBeverageCardType,
}) => {
  return (
    <AdminMenu
      setShowModal={setShowModal}
      setModalBeverage={setModalBeverage}
      menu={menu}
      removeFromMenu={removeFromMenu}
      editInMenu={editInMenu}
      customizedType={customizedType}
      setBeverageCardType={setBeverageCardType}
    />
  );
};
