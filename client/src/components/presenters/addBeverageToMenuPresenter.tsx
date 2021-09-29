import React, { useEffect,  useState} from "react";
import DrinkModel from "../../model/drinkModel";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import usePromise from '../../hooks/usePromise';

export const AddBeverageToMenuPresenter = () => {

  const model = new DrinkModel();

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
<<<<<<< HEAD:client/src/components/presenters/addBeverageToMenuPresenter.tsx
    setCocktailPromise(model.getCocktailBasedOnName(query)); 
=======
    setCocktailPromise(drinkModel.getCocktailBasedOnName(query)); 
    setBeerPromise(drinkModel.getBeerBasedOnName(query)); 
>>>>>>> 6791d71 (Start to add second api):client/src/components/presenters/addBeverageToMenuPresenter.js
  }

  return (
    <AddBeverageToMenu
      searchBeverage={searchBeverage}
      searchResult={data}
    />
  );
};
