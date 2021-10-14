import React, { useEffect, useState } from "react";
import { CreateBeverageForMenuModal } from "../views/createBeverageForMenuModal";

export const CreateBeverageForMenuModalPresenter = ({
  showModal,
  setShowModal,
  menu,
  addToMenu,
  customizedType,
}) => {
  return (
    <CreateBeverageForMenuModal
      showModal={showModal}
      setShowModal={setShowModal}
      menu={menu}
      addToMenu={addToMenu}
      beverageType={customizedType}
    />
  );
};
