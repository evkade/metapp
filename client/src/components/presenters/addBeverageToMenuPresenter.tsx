import React, { useEffect,  useState} from "react";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import usePromise from '../../hooks/usePromise';

export const AddBeverageToMenuPresenter = ({drinkModel}) => {
  const [cocktailPromise, setCocktailPromise] = useState(undefined);
  const [cocktailData, cocktailError] = usePromise(cocktailPromise);

  const [beerPromise, setBeerPromise] = useState(undefined);
  const [beerData, beerError] = usePromise(beerPromise);

  const [data, setData] = useState([]);

  const [isLoading, setLoading] = useState(false);

  // idé: göra ett eget object för en beverage liksom 
  // så båda cocktails och beers kan vara en beverage med vissa specifika fields 

  useEffect(() => {
    console.log(cocktailData, beerData, cocktailError, beerError);
    if(cocktailData && beerData) {
      setData([...cocktailData.drinks.map(drink => drink.strDrink), beerData.items]); 
      setBeerPromise(null);
      setCocktailPromise(null);
    }
    else if(cocktailData && beerError) {
      setData([...cocktailData.drinks.map(drink => drink.strDrink)]); 
      setBeerPromise(null);
      setCocktailPromise(null);
    }
    else if(beerData && cocktailError) {
      setData([...beerData.items]); 
      setBeerPromise(null);
      setCocktailPromise(null);
    }
    else {
      setData([]); 
      setBeerPromise(null);
      setCocktailPromise(null);
    }
  }, [cocktailData, beerData, cocktailError, beerError]);

  useEffect(() => {
    console.log(cocktailPromise, beerPromise);
    if(!cocktailPromise && !beerPromise) {
      setLoading(false); 
    }
  }, [beerPromise, cocktailPromise]);
 
  const searchBeverage = (query) => {
    setLoading(true); 
    setCocktailPromise(drinkModel.getCocktailBasedOnName(query)); 
    setBeerPromise(drinkModel.getBeerBasedOnName(query)); 
  }

  return (
    <AddBeverageToMenu
      searchBeverage={searchBeverage}
      // just nu: skickar bara lista på namn 
      searchResult={data}
      isLoading={isLoading}
    />
  );
};
