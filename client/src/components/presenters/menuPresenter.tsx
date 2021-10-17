import React from "react";
import { Menu } from "../views/menu";

export const MenuPresenter = ({
  showModal,
  setShowModal,
  menu,
  removeFromMenu,
  customizedType,
}) => {
  // todo: bara skicka delen av menyn som är customized type och ej skicka hela menyn + customizedtype
  return (
    <Menu
      showModal={showModal}
      setShowModal={setShowModal}
      menu={menu}
      removeFromMenu={removeFromMenu}
      customizedType={customizedType}
    />
  );
};
