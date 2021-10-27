import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  orderPlaced,
  unfinishedOrderPlaced,
  addFavorite,
  removeFavorite,
} from "../../redux/actions/user";
import { useHistory } from "react-router-dom";
import { UserMenu } from "../views/userMenu";
import MenuModel from "../../model/drinkModel";

const menuModel = new MenuModel();

export const UserMenuPresenter = ({
  orders,
  addFavorite,
  removeFavorite,
  favorites,
  unfinishedOrderPlaced,
  unfinishedOrder,
  cocktailMenu,
  beerMenu,
  currentBar,
  getBeerHistory,
  getCocktailHistory,
}) => {
  const [orderItems, setOrderItems] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [totalInfo, setTotalInfo] = useState({ totalCost: 0, totalCount: 0 });

  useEffect(() => {
    setFavoriteList(favorites);

    if (
      !(
        Object.keys(unfinishedOrder).length === 0 &&
        unfinishedOrder.constructor === Object
      )
    ) {
      setOrderItems(unfinishedOrder.order);
      const totalObj = unfinishedOrder.order.reduce(function (a, b) {
        return { price: a.price + b.price, count: a.count + b.count }; // returns object with property x
      });
      const newTotalObj = {
        totalCost: totalObj.price,
        totalCount: totalObj.count,
      };
      setTotalInfo(newTotalObj);
    } else {
      setOrderItems([]);
    }
    getBeerHistory(currentBar);
    getCocktailHistory(currentBar);
  }, [currentBar]);

  let history = useHistory();

  const addOrRemoveTotalInfo = (cost, action) => {
    var newTotalCost = 0;
    var newTotalCount = 0;
    if (action === "add") {
      newTotalCost = totalInfo.totalCost + cost;
      newTotalCount = totalInfo.totalCount + 1;
    }
    if (action === "remove") {
      newTotalCost = totalInfo.totalCost - cost;
      newTotalCount = totalInfo.totalCount - 1;
    }
    const newTotalInfo = { totalCost: newTotalCost, totalCount: newTotalCount };
    setTotalInfo(newTotalInfo);
  };

  const addToOrder = (name, price) => {
    setOrderItems([...orderItems, { name, price, count: 1 }]);
    addOrRemoveTotalInfo(price, "add");
  };

  const increaseOrderCount = (name, price) => {
    const modifiedOrderList = orderItems.map((item) => {
      if (item.name === name) {
        return {
          name: item.name,
          price: item.price,
          count: item.count + 1,
        };
      } else {
        return item;
      }
    });
    setOrderItems(modifiedOrderList);
    addOrRemoveTotalInfo(price, "add");
  };

  const addOrIncreaseOrder = (name, price) => {
    const isItemPresent: boolean = orderItems.some((item) => item.name == name);
    if (isItemPresent) {
      increaseOrderCount(name, price);
    } else {
      addToOrder(name, price);
    }
  };

  const removeFromOrder = (name, price) => {
    const modifiedOrderList = orderItems.map((item, index) => {
      if (item.name === name && item.count !== 0) {
        return {
          name: item.name,
          count: item.count - 1,
        };
      } else {
        return item;
      }
    });
    const modifiedOrderListWithoutZeros = modifiedOrderList.filter(
      (item) => item.count !== 0
    );
    setOrderItems(modifiedOrderListWithoutZeros);
    addOrRemoveTotalInfo(price, "remove");
  };

  const placeUnFinishedOrder = () => {
    unfinishedOrderPlaced(orderItems);
    history.push("/order");
  };

  const addToFavorites = (name) => {
    addFavorite(name);
  };

  const removeFromFavorites = (name) => {
    removeFavorite(name);
  };

  return (
    <UserMenu
      orderItems={orderItems}
      setOrderItems={(newOrderItems) => setOrderItems(newOrderItems)}
      beerMenu={beerMenu}
      cocktailMenu={cocktailMenu}
      addToOrder={(name, price) => addOrIncreaseOrder(name, price)}
      removeFromOrder={(name, price) => removeFromOrder(name, price)}
      placeUnFinishedOrder={() => placeUnFinishedOrder()}
      addToFavorites={(name) => addToFavorites(name)}
      removeFromFavorites={(name) => removeFromFavorites(name)}
      favoriteList={favoriteList}
      totalInfo={totalInfo}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    orders: store.orders,
    favorites: store.user.favorites,
    unfinishedOrder: store.user.unfinishedOrder,
    beerMenu: store.menu.beerMenu,
    cocktailMenu: store.menu.cocktailMenu,
    currentBar: store.menu.currentBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (name) => dispatch(addFavorite(name)),
    removeFavorite: (name) => dispatch(removeFavorite(name)),
    unfinishedOrderPlaced: (beverages) =>
      dispatch(unfinishedOrderPlaced(beverages)),
    getBeerHistory: (currentBar) =>
      dispatch(menuModel.getBeerHistory(currentBar)),
    getCocktailHistory: (currentBar) =>
      dispatch(menuModel.getCocktailHistory(currentBar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuPresenter);
