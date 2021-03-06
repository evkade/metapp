import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CustomizeMenu from "../views/customizeMenu";
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
  baseCocktail,
  baseBeer,
} from "../../constants/beverageObjects";
import { beverageCardTypes } from "../../constants/beverageCardType";
import { Spinner } from "../views/spinner";

// todo: add props types to all props
import MenuModel from "../../model/menuModel";

const menuModel = new MenuModel();

const CustomizeMenuPresenter = ({
  menu,
  addToMenu,
  removeFromMenu,
  editInMenu,
  currentBar,
  getBeerHistory,
  getCocktailHistory,
  history,
  loading,
}) => {
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
    getBeerHistory(currentBar);
    getCocktailHistory(currentBar);
  }, [currentBar]);

  return (
    <CustomizeMenu
      showModal={showModal}
      setShowModal={setShowModal}
      modalBeverage={modalBeverage}
      setModalBeverage={setModalBeverage}
      menu={menu}
      history={history}
      addToMenu={addToMenu}
      removeFromMenu={removeFromMenu}
      editInMenu={editInMenu}
      customizedType={customizedType}
      setCustomizedType={setCustomizedType}
      currentSearchType={currentSearchType}
      setCurrentSearchType={setCurrentSearchType}
      beverageCardType={beverageCardType}
      setBeverageCardType={setBeverageCardType}
      loading={loading}
      spinner={<Spinner bar={currentBar} />}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    currentBar: store.menu.currentBar,
    menu: { beer: store.menu.beerMenu, cocktail: store.menu.cocktailMenu },
    history: {
      beer: store.menu.beerHistory,
      cocktail: store.menu.cocktailHistory,
    },
    loading: store.menu.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBeerHistory: (currentBar) =>
      dispatch(menuModel.getBeerHistory(currentBar)),
    getCocktailHistory: (currentBar) =>
      dispatch(menuModel.getCocktailHistory(currentBar)),
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
