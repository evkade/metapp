import React, { useState } from "react";
import { connect } from "react-redux";
import { addToMenu, removeFromMenu } from "../../redux/actions/menu";
import { CustomizeMenu } from "../views/customizeMenu";
import { Beverage } from "constants/beverageObjects";
import { beverageTypes } from "../../constants/searchTypes";

export const CustomizeMenuPresenter = (props) => {
  // This decides if the admin is customizing the beer or cocktail part of the menu
  const [customizedType, setCustomizedType] = useState(beverageTypes.COCKTAIL);
  const [showModal, setShowModal] = useState(false); 

  // todo: grey button where the person is currently customizing
  return (
    <div>
      <button
        type="submit"
        onClick={() => setCustomizedType(beverageTypes.BEER)}
      >
        Beer
      </button>
      <button
        type="submit"
        onClick={() => setCustomizedType(beverageTypes.COCKTAIL)}
      >
        Cocktail
      </button>
      <CustomizeMenu
        showModal={showModal}
        setShowModal={setShowModal}
        menu={props.menu.menu}
        addToMenu={(beverage: Beverage) => props.addToMenu(beverage)}
        removeFromMenu={(beverage: Beverage) => props.removeFromMenu(beverage)}
        customizedType={customizedType}
      />
    </div>
  );
};

const mapStateToProps = (store) => {
  console.log("mapStateToProps", store, store.state);
  return {
    menu: store.menu,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps");
  return {
    addToMenu: (beverage: Beverage) => dispatch(addToMenu(beverage)),
    removeFromMenu: (beverage: Beverage) => dispatch(removeFromMenu(beverage)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizeMenuPresenter);
