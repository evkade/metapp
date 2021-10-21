import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CustomizeMenu } from "../views/customizeMenu";
import {
  addToMenu,
  editInMenu,
  removeFromMenu,
  getBeerHistory,
  getCocktailHistory,
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

export const CustomizeMenuPresenter = (props) => {
  console.log("PROPS", props);
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
    getBeerHistory();
    getCocktailHistory();
  });

  return (
    <div className="admin-menu-container">
      <div className="admin-menu-container__tabs">
        <button
          className="admin-menu-container__tab"
          type="submit"
          onClick={() => setCustomizedType(beverageTypes.BEER)}
          disabled={customizedType === beverageTypes.BEER}
        >
          Beer
        </button>
        <button
          className="admin-menu-container__tab"
          type="submit"
          onClick={() => setCustomizedType(beverageTypes.COCKTAIL)}
          disabled={customizedType === beverageTypes.COCKTAIL}
        >
          Cocktail
        </button>
      </div>
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
        currentSearchType={currentSearchType}
        setCurrentSearchType={setCurrentSearchType}
        beverageCardType={beverageCardType}
        setBeverageCardType={setBeverageCardType}
      />
    </div>
  );
};

const mapStateToProps = (store) => {
  console.log("STORE", store);
  return {
    currentBar: store.currentBar,
    menu: store.menu.menu,
    history: store.menu.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBeerHistory: () => dispatch(getBeerHistory()),
    getCocktailHistory: () => dispatch(getCocktailHistory()),
    // todo: add, remove, and edit should also do this in the database menus
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
