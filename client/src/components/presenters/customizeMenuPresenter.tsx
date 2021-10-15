import React, { useState } from "react";
import { connect } from "react-redux";
import { addToMenu, removeFromMenu } from "../../redux/actions/menu";
import { CustomizeMenu } from "../views/customizeMenu";
import { Beverage } from "constants/beverageObjects";
import { beverageTypes } from "../../constants/searchTypes";

// props contain menu, addToMenu, removeFromMenu
// todo: add props types to all props 

export const CustomizeMenuPresenter = (props) => {
    
  const [beverageType, setBeverageType] = useState<string>(beverageTypes.BEER);
  const [showModal, setShowModal] = useState<boolean>(false); 

  return (
    <div>
      <button
        type="submit"
        onClick={() => setBeverageType(beverageTypes.BEER)}
        disabled={beverageType === beverageTypes.BEER}
      >
        Beer
      </button>
      <button
        type="submit"
        onClick={() => setBeverageType(beverageTypes.COCKTAIL)}
        disabled={beverageType === beverageTypes.COCKTAIL}
      >
        Cocktail
      </button>
      <CustomizeMenu
        showModal={showModal}
        setShowModal={setShowModal}
        menu={props.menu.menu}
        addToMenu={(beverage: Beverage) => props.addToMenu(beverage)}
        removeFromMenu={(beverage: Beverage) => props.removeFromMenu(beverage)}
        customizedType={beverageType}
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
