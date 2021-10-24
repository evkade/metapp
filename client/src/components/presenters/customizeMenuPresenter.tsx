import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CustomizeMenu } from "../views/customizeMenu";
import {
  addToMenu,
  editInMenu,
  removeFromMenu,
  addToHistory,
} from "../../redux/actions/menu";
import { searchTypes } from "../../constants/searchTypes";
import { beverageTypes } from "../../constants/searchTypes";
import {
  Beverage,
  Beer,
  Cocktail,
  baseCocktail,
  baseBeer,
} from "../../constants/beverageObjects";
import { beverageCardTypes } from "../../constants/beverageCardType";

// props contain menu, addToMenu, removeFromMenu, editInMenu
// todo: add props types to all props
import DrinkModel from "../../model/drinkModel";

const drinkModel = new DrinkModel();

export const CustomizeMenuPresenter = (props) => {
  // Contains the information about which part of the menu we are customizing
  const [customizedType, setCustomizedType] = useState<string>(
    beverageTypes.BEER
  );
  const [currentSearchType, setCurrentSearchType] = useState<string>(
    searchTypes.API
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  // this is the new beverage that will be added to the menu
  const [modalBeverage, setModalBeverage] = useState<Beverage>(
    customizedType === beverageTypes.BEER ? baseBeer : baseCocktail
  );
  const [beverageCardType, setBeverageCardType] = useState<string>(
    beverageCardTypes.ADMIN_SEARCH_RESULTS
  );

  useEffect(() => {
    props.getBeerHistory(props.currentBar);
    props.getCocktailHistory(props.currentBar);
  }, [props.currentBar]);

  return (
    <CustomizeMenu
      showModal={showModal}
      setShowModal={setShowModal}
      modalBeverage={modalBeverage}
      setModalBeverage={setModalBeverage}
      menu={props.menu}
      history={props.history}
      addToMenu={(beverage: Beverage) => props.addToMenu(beverage)}
      removeFromMenu={(beverage: Beverage) => props.removeFromMenu(beverage)}
      editInMenu={(beverage: Beverage) => props.editInMenu(beverage)}
      customizedType={customizedType}
      setCustomizedType={setCustomizedType}
      currentSearchType={currentSearchType}
      setCurrentSearchType={setCurrentSearchType}
      beverageCardType={beverageCardType}
      setBeverageCardType={setBeverageCardType}
    />
  );
};

const mapStateToProps = (store) => {
  console.log("STORE", store);
  return {
    currentBar: store.menu.currentBar,
    menu: { beer: store.menu.beerMenu, cocktail: store.menu.cocktailMenu },
    history: {
      beer: store.menu.beerHistory,
      cocktail: store.menu.cocktailHistory,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBeerHistory: (currentBar) =>
      dispatch(drinkModel.getBeerHistory(currentBar)),
    getCocktailHistory: (currentBar) =>
      dispatch(drinkModel.getCocktailHistory(currentBar)),
    addToMenu: (beverage: Beverage) => dispatch(addToMenu(beverage)),
    addToHistory: (beverage: Beverage) => dispatch(addToHistory(beverage)),
    removeFromMenu: (beverage: Beverage) => dispatch(removeFromMenu(beverage)),
    editInMenu: (beverage: Beverage) => dispatch(editInMenu(beverage)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizeMenuPresenter);
