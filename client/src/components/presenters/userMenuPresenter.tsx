import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { orderPlaced } from "../../redux/actions/user";
import { addFavorite } from "../../redux/actions/user";
import { removeFavorite } from "../../redux/actions/user";
import { UserMenu } from "../views/userMenu";

export const UserMenuPresenter = ({
  orders,
  orderPlaced,
  addFavorite,
  removeFavorite,
  favorites,
}) => {
  const [orderItems, setOrderItems] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    setFavoriteList(favorites);
  }, []);

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

  const addToOrder = (name) => {
    setOrderItems([...orderItems, { name, count: 1 }]);
  };

  const increaseOrderCount = (name) => {
    const modifiedOrderList = orderItems.map((item) => {
      if (item.name === name) {
        return {
          name: item.name,
          count: item.count + 1,
        };
      } else {
        return item;
      }
    });
    setOrderItems(modifiedOrderList);
  };

  const addOrIncreaseOrder = (name) => {
    const isItemPresent: boolean = orderItems.some((item) => item.name == name);
    if (isItemPresent) {
      increaseOrderCount(name);
    } else {
      addToOrder(name);
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

  const finalizeOrder = () => {
    orderPlaced(orderItems);
    setOrderItems([]);
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
      addToOrder={(name) => addOrIncreaseOrder(name)}
      removeFromOrder={(name) => removeFromOrder(name)}
      finalizeOrder={() => finalizeOrder()}
      addToFavorites={(name) => addToFavorites(name)}
      removeFromFavorites={(name) => removeFromFavorites(name)}
      favoriteList={favoriteList}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    orders: store.orders,
    favorites: store.user.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderPlaced: (beverage) => dispatch(orderPlaced(beverage)),
    addFavorite: (name) => dispatch(addFavorite(name)),
    removeFavorite: (name) => dispatch(removeFavorite(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuPresenter);
