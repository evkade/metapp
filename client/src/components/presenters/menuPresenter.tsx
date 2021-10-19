import React from "react";
import { Menu } from "../views/menu";
import { connect } from "react-redux";
import { orderPlaced } from "../../redux/actions/user";

export const MenuPresenter = ({
  showModal,
  setShowModal,
  menu,
  removeFromMenu,
  customizedType,
}) => {
  // todo: bara skicka delen av menyn som är customized type och ej skicka hela menyn + customizedtype
  return (
    <Menu
      showModal={showModal}
      setShowModal={setShowModal}
      menu={menu}
      removeFromMenu={removeFromMenu}
      customizedType={customizedType}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    orders: store.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderPlaced: (beverage) => dispatch(orderPlaced(beverage)),
    // drinkMade: (id, timeMade) => dispatch(drinkMade(id, timeMade)),
    // drinkPaid: (id, timePaid) => dispatch(drinkPaid(id, timePaid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPresenter);
