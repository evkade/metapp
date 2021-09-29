import React, { useEffect,  useState} from "react";
import DrinkModel from "../../model/drinkModel";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import usePromise from '../../hooks/usePromise';

export const AddBeverageToMenuPresenter = () => {

  const model = new DrinkModel();

  const [cocktailPromise, setCocktailPromise] = useState(undefined);
  const [data, error] = usePromise(cocktailPromise);
 
  const searchBeverage = (query) => {
    setCocktailPromise(model.getCocktailBasedOnName(query)); 
  }

  return (
    <AddBeverageToMenu
      searchBeverage={searchBeverage}
      searchResult={data}
    />
  );
};
