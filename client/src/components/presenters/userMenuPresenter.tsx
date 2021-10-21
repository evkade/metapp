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

export const UserMenuPresenter = ({
  orders,
  addFavorite,
  removeFavorite,
  favorites,
  unfinishedOrderPlaced,
  unfinishedOrder,
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
  }, []);

  let history = useHistory();

  const menuItems = [
    {
      id: 1,
      name: "Beer",
      description: "fruity",
      price: 100,
      alcoholPercentage: 4.4,
    },
    {
      id: 2,
      name: "Wine",
      description: "DRY",
      price: 20,
      alcoholPercentage: 13,
    },
    {
      id: 3,
      name: "Cider",
      description: "Boozy",
      price: 10,
      alcoholPercentage: 5,
    },
    {
      id: 3,
      name: "Cider2",
      description: "Boozy",
      price: 5,
      alcoholPercentage: 5,
    },
    {
      id: 3,
      name: "Cider3",
      description: "Boozy",
      price: 50,
      alcoholPercentage: 5,
    },
    {
      id: 3,
      name: "Cider4",
      description: "Boozy",
      price: 40,
      alcoholPercentage: 5,
    },
    {
      id: 3,
      name: "Cider5",
      description: "Boozy",
      price: 10,
      alcoholPercentage: 5,
    },
    {
      id: 3,
      name: "Cider6",
      description: "Boozy",
      price: 10,
      alcoholPercentage: 5,
    },
    {
      id: 3,
      name: "Cider7",
      description: "Boozy",
      price: 10,
      alcoholPercentage: 5,
    },
    {
      id: 3,
      name: "Cider8",
      description: "Boozy",
      price: 10,
      alcoholPercentage: 5,
    },
    {
      id: 3,
      name: "Cider9",
      description: "Boozy",
      price: 10,
      alcoholPercentage: 5,
    },
    {
      id: 3,
      name: "Cider10",
      description: "Boozy",
      price: 10,
      alcoholPercentage: 5,
    },
  ];

  const addToTotalInfo = (cost) => {
    const newTotalCost = totalInfo.totalCost + cost;
    const newTotalCount = totalInfo.totalCount + 1;
    const newTotalInfo = { totalCost: newTotalCost, totalCount: newTotalCount };
    setTotalInfo(newTotalInfo);
  };

  const addToOrder = (name, price) => {
    setOrderItems([...orderItems, { name, price, count: 1 }]);
    addToTotalInfo(price);
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
    addToTotalInfo(price);
  };

  const addOrIncreaseOrder = (name, price) => {
    const isItemPresent: boolean = orderItems.some((item) => item.name == name);
    if (isItemPresent) {
      increaseOrderCount(name, price);
    } else {
      addToOrder(name, price);
    }
  };

  const removeFromOrder = (name) => {
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
      menuItems={menuItems}
      addToOrder={(name, price) => addOrIncreaseOrder(name, price)}
      removeFromOrder={(name) => removeFromOrder(name)}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (name) => dispatch(addFavorite(name)),
    removeFavorite: (name) => dispatch(removeFavorite(name)),
    unfinishedOrderPlaced: (beverages) =>
      dispatch(unfinishedOrderPlaced(beverages)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuPresenter);
