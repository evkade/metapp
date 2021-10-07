import React, { useEffect,  useState} from "react";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import usePromise from '../../hooks/usePromise';
import { searchTypes } from '../../constants/searchTypes';

export const AddBeverageToMenuPresenter = ({drinkModel, searchType}) => {
  const [beveragePromise, setBeveragePromise] = useState(undefined);
  const [beverageData, beverageError] = usePromise(beveragePromise);
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
 
  const searchBeverage = (query) => {
    setLoading(true); 
    switch(searchType) {
      case searchTypes.BEER: 
        setBeveragePromise(drinkModel.getBeerBasedOnName(query)); 
        break;
      case searchTypes.COCKTAIL: 
        setBeveragePromise(drinkModel.getCocktailBasedOnName(query));
        break;
    }
  }

  useEffect(() => {
    if(beverageData) {
      switch(searchType) {
        case searchTypes.BEER: 
          setSearchResults(beverageData.items.map(beer => drinkModel.setAPIBeerToObject(beer)));
          break; 
        case searchTypes.COCKTAIL: 
          setSearchResults(beverageData.drinks.map(cocktail => drinkModel.setAPICocktailToObject(cocktail)));
          break;
      }
      setBeveragePromise(null);
      setLoading(false); 
    }
    else if(beverageError) {
      // todo: visa felmeddelanden
      setBeveragePromise(null);
      setLoading(false); 
    }
  }, [beverageData, beverageError]);

  return (
    // todo add button which changes which searchType we have
    <AddBeverageToMenu
      searchBeverage={searchBeverage}
      searchResult={searchResults} // todo: just nu skickar bara lista på namn, sen skicka hela objekten
      isLoading={isLoading}
    />
  );
};
