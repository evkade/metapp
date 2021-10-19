import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { orderPlaced } from "../../redux/actions/user";
import UserProfile from "../views/userProfile";
import { removeFavorite } from "../../redux/actions/user";

export const UserProfilePresenter = ({
  orders,
  user,
  orderPlaced,
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
    orders: store.user.userOrders,
    favorites: store.user.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderPlaced: (beverage) => dispatch(orderPlaced(beverage)),
    removeFavorite: (name) => dispatch(removeFavorite(name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePresenter);
