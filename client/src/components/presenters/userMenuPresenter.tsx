import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  unfinishedOrderPlaced,
  addFavorite,
  removeFavorite,
} from "../../redux/actions/user";
import { useHistory } from "react-router-dom";
import UserMenu from "../views/userMenu";
import MenuModel from "../../model/menuModel";
import { Spinner } from "../views/spinner";
import FavoriteModel from "../../model/favoriteModel";

const menuModel = new MenuModel();
const favoriteModel = new FavoriteModel();

const UserMenuPresenter = ({
  addFavorite,
  removeFavorite,
  favorites,
  getFavorites,
  unfinishedOrderPlaced,
  unfinishedOrder,
  cocktailMenu,
  beerMenu,
  currentBar,
  getBeerHistory,
  getCocktailHistory,
  loading,
}) => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalInfo, setTotalInfo] = useState({ totalCost: 0, totalCount: 0 });

  useEffect(() => {
    getFavorites();
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
        addOrRemoveTotalInfo(price, "remove");
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
  };

  const placeUnFinishedOrder = () => {
    unfinishedOrderPlaced(orderItems);
    history.push("/order");
  };

  const removeFromFavorites = (name) => {
    removeFavorite(favoriteid(name), favoriteType(name), favoritebar(name));
  };

  const isfavorite = (name) => {
    return favorites.some((elem) => elem.beverage.name === name);
  };

  const favoritebar = (name) => {
    return favorites.find((elem) => elem.beverage.name === name).bar;
  };

  const favoriteid = (name) => {
    return favorites.find((elem) => elem.beverage.name === name).beverage._id;
  };
  const favoriteType = (name) => {
    return favorites.find((elem) => elem.beverage.name === name).beverage_type;
  };

  return (
    <UserMenu
      orderItems={orderItems}
      beerMenu={beerMenu}
      cocktailMenu={cocktailMenu}
      addToOrder={addOrIncreaseOrder}
      removeFromOrder={removeFromOrder}
      placeUnFinishedOrder={placeUnFinishedOrder}
      addToFavorites={(name, type) => addFavorite(name, type, currentBar)}
      removeFromFavorites={removeFromFavorites}
      totalInfo={totalInfo}
      loading={loading}
      spinner={<Spinner bar={currentBar} />}
      isfavorite={isfavorite}
    />
  );
};

async function addToFavorites(beverage, type, bar, dispatch) {
  const beverageObject = await favoriteModel
    .postBeverageToDatabase({ beverage, type, bar })
    .then((data) => data);
  dispatch(
    addFavorite({ beverage: beverageObject, beverage_type: type, bar: bar })
  );
}

const mapStateToProps = (store) => {
  return {
    orders: store.orders,
    favorites: store.user.favorites,
    unfinishedOrder: store.user.unfinishedOrder,
    beerMenu: store.menu.beerMenu,
    cocktailMenu: store.menu.cocktailMenu,
    currentBar: store.menu.currentBar,
    loading: store.menu.loading || store.user.loading || store.orders.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (beverage, type, bar) =>
      addToFavorites(beverage, type, bar, dispatch),
    removeFavorite: (beverage_id, type, bar) =>
      dispatch(removeFavorite({ beverage_id, type, bar })),
    getFavorites: () => dispatch(favoriteModel.getFavorites()),

    unfinishedOrderPlaced: (beverages) =>
      dispatch(unfinishedOrderPlaced(beverages)),
    getBeerHistory: (currentBar) =>
      dispatch(menuModel.getBeerHistory(currentBar)),
    getCocktailHistory: (currentBar) =>
      dispatch(menuModel.getCocktailHistory(currentBar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuPresenter);
