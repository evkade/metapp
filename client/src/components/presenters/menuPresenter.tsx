import React, { useEffect, useState } from "react";
import { Menu } from "../views/menu";

export const MenuPresenter = ({menu, removeFromMenu}) => {
  return <Menu menu={menu} removeFromMenu={removeFromMenu}/>;
};
