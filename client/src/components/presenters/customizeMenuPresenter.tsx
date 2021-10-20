import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addToMenu,
  editInMenu,
  removeFromMenu,
} from "../../redux/actions/menu";
import { CustomizeMenu } from "../views/customizeMenu";
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

  return (
    <div className="admin-menu-container">
      <button
        className="general-button--bw"
        type="submit"
        onClick={() => setCustomizedType(beverageTypes.BEER)}
        disabled={customizedType === beverageTypes.BEER}
      >
        Beer
      </button>
      <button
        className="general-button--bw"
        type="submit"
        onClick={() => setCustomizedType(beverageTypes.COCKTAIL)}
        disabled={customizedType === beverageTypes.COCKTAIL}
      >
        Cocktail
      </button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToMenu: (beverage: Beverage) => dispatch(addToMenu(beverage)),
    removeFromMenu: (beverage: Beverage) => dispatch(removeFromMenu(beverage)),
    editInMenu: (beverage: Beverage) => dispatch(editInMenu(beverage)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizeMenuPresenter);
