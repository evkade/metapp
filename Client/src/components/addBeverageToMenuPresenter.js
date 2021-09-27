import React from "react";
import { getCocktailBasedOnName } from "../data/fetchData.ts";
import { AddBeverageToMenu } from "./addBeverageToMenu.js"; // ehm kanske borde passa detta ist för importera ? oklart
import usePromise from '../utils/usePromise.js';

export const AddBeverageToMenuPresenter = () => {
  const [cocktailPromise, setCocktailPromise] = React.useState(undefined);
  const [data, error] = usePromise(cocktailPromise);

  const searchBeverage = (query) => {
    setCocktailPromise(getCocktailBasedOnName(query)); 
  }

  return (
    <AddBeverageToMenu
      searchBeverage={searchBeverage}
      searchResult={data}
    />
  );
};