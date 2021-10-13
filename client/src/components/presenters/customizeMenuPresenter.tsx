import React from "react";
import { connect } from "react-redux";
import { addToMenu, removeFromMenu } from "../../redux/actions/menu";
import { CustomizeMenu } from "../views/customizeMenu";
import { Beverage } from "constants/beverageObjects";

export const CustomizeMenuPresenter = (props) => {
  console.log('Props.Menu', props.menu);
  return (
    <CustomizeMenu
      menu={props.menu.menu}
      addToMenu={(beverage: Beverage) => props.addToMenu(beverage)}
      removeFromMenu={(beverage: Beverage) => props.removeFromMenu(beverage)}
    />
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
