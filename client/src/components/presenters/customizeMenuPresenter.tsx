import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CustomizeMenu } from "../views/customizeMenu";
import {
  addToMenu,
  editInMenu,
  removeFromMenu,
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
import DrinkModel from "../../model/drinkModel";

// props contain menu, addToMenu, removeFromMenu, editInMenu
// todo: add props types to all props
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

  // useEffect(() => {
  //   drinkModel.getBeersMenu("dkm").then(dispa);
  // });

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
        menu={props.menu.menu} // vet ej varför man måste skriva såhär
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
  return {
    menu: store.menu,
    currentBar: store.currentBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getHistory: (bar) => dispatch(getHistory(bar)),
    addToMenu: (beverage: Beverage) => dispatch(addToMenu(beverage)),
    removeFromMenu: (beverage: Beverage) => dispatch(removeFromMenu(beverage)),
    editInMenu: (beverage: Beverage) => dispatch(editInMenu(beverage)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizeMenuPresenter);
