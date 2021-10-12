import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToMenu, removeFromMenu } from "../../redux/actions/menu";
import { AddBeverageToMenu } from "../views/addBeverageToMenu";
import usePromise from "../../hooks/usePromise";
import { searchTypes } from "../../constants/searchTypes";

export const AddBeverageToMenuPresenter = (props) => {
  const drinkModel = props.drinkModel;
  console.log(drinkModel);
  console.log(props.menu);

  const [beveragePromise, setBeveragePromise] = useState(undefined);
  const [beverageData, beverageError] = usePromise(beveragePromise);
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState(props.searchType);

  const searchBeverage = (query) => {
    setLoading(true);
    switch (searchType) {
      case searchTypes.BEER:
        setBeveragePromise(drinkModel.getBeerBasedOnName(query));
        break;
      case searchTypes.COCKTAIL:
        setBeveragePromise(drinkModel.getCocktailBasedOnName(query));
        break;
    }
  };

  const toggleSearchType = () => {
    switch (searchType) {
      case searchTypes.BEER:
        drinkModel.searchType = 
        setSearchType(searchTypes.COCKTAIL);
        break;
      case searchTypes.COCKTAIL:
        setSearchType(searchTypes.BEER);
        break;
    }
  };

  useEffect(() => {
    if (beverageData) {
      switch (searchType) {
        case searchTypes.BEER:
          setSearchResults(
            beverageData.items.map((beer) =>
              drinkModel.setAPIBeerToObject(beer)
            )
          );
          break;
        case searchTypes.COCKTAIL:
          setSearchResults(
            beverageData.drinks.map((cocktail) =>
              drinkModel.setAPICocktailToObject(cocktail)
            )
          );
          break;
      }
      setBeveragePromise(null);
      setLoading(false);
    } else if (beverageError) {
      // todo: visa felmeddelanden
      setBeveragePromise(null);
      setLoading(false);
    }
  }, [beverageData, beverageError]);

  return (
    <AddBeverageToMenu
      searchType={searchType}
      searchBeverage={searchBeverage}
      searchResult={searchResults}
      setSearchResults={setSearchResults}
      toggleSearchType={() => toggleSearchType()}
      isLoading={isLoading}
      menu={props.menu.menu}
      addToMenu={(beverage) => props.addToMenu(beverage)}
      removeFromMenu={(beverage) => props.removeFromMenu(beverage)}
    />
  );
};

const mapStateToProps = (store) => {
  console.log("mapStateToProps", store, store.state);
  return {
    menu: store.menu, // hade state.reducer.menu innan men funkade ej
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToMenu: (beverage) => dispatch(addToMenu(beverage)),
    removeFromMenu: (beverage) => dispatch(removeFromMenu(beverage)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBeverageToMenuPresenter);
