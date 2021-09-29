import React, { useEffect,  useState} from "react";
import { drinkModel } from "../../model/drinkModel.ts";
import { AddBeverageToMenu } from "../views/addBeverageToMenu.js"; // ehm kanske borde passa detta ist för importera ? oklart
import usePromise from '../../hooks/usePromise.js';

export const AddBeverageToMenuPresenter = () => {

  const [cocktailPromise, setCocktailPromise] = useState(undefined);
  const [data, error] = usePromise(cocktailPromise);
 
  const searchBeverage = (query) => {
    setCocktailPromise(drinkModel.getCocktailBasedOnName(query)); 
  }

  return (
    <AddBeverageToMenu
      searchBeverage={searchBeverage}
      searchResult={data}
    />
  );
};
