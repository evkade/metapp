import React from "react";
import { AdminMenu } from "../views/adminMenu";

export const AdminMenuPresenter = ({
  showModal,
  setShowModal,
  menu,
  removeFromMenu,
  customizedType,
}) => {
  // todo: bara skicka delen av menyn som är customized type och ej skicka hela menyn + customizedtype
  return (
    <AdminMenu
      showModal={showModal}
      setShowModal={setShowModal}
      menu={menu}
      removeFromMenu={removeFromMenu}
    />
  );
};
