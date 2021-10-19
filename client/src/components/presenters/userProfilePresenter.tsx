import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { orderMade } from "../../redux/actions/orders";
import UserProfile from "../views/userProfile";
import { removeFavorite } from "../../redux/actions/user";

export const UserProfilePresenter = ({
  orders,
  user,
  orderMade,
  favorites,
  removeFavorite,
}) => {
  const removeFromFavorites = (name) => {
    removeFavorite(name);
  };

  return (
    <UserProfile
      username={user}
      orders={orders}
      favorites={favorites}
      removeFromFavorites={(name) => removeFromFavorites(name)}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user.username,
    orders: store.orders.userOrders,
    favorites: store.user.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderMade: (beverage) => dispatch(orderMade(beverage)),
    removeFavorite: (name) => dispatch(removeFavorite(name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePresenter);
