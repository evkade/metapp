import React, { useEffect,  useState} from "react";
import { drinkModel } from "../../model/drinkModel.ts";
import { AddBeverageToMenu } from "../views/addBeverageToMenu.js";
import usePromise from '../../hooks/usePromise.js';

export const AddBeverageToMenuPresenter = () => {

  const [cocktailPromise, setCocktailPromise] = useState(undefined);
  const [cocktailData, cocktailError] = usePromise(cocktailPromise);

  const [beerPromise, setBeerPromise] = useState(undefined);
  const [beerData, beerError] = usePromise(beerPromise);

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(cocktailData, beerData, cocktailError, beerError);
    if(cocktailData && beerData) {
      setData([...cocktailData.drinks, beerData.items]); 
    }
    else if(cocktailData && beerError) {
      setData([...cocktailData]); 
    }
    else if(beerData && cocktailError) {
      setData([...beerData]); 
    }
    else {
      setData([]); 
    }
  }, [cocktailData, beerData, cocktailError, beerError]);
 
  const searchBeverage = (query) => {
    setCocktailPromise(drinkModel.getCocktailBasedOnName(query)); 
    setBeerPromise(drinkModel.getBeerBasedOnName(query)); 
  }

  return (
    <AddBeverageToMenu
      searchBeverage={searchBeverage}
      searchResult={data}
    />
  );
};
