import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import usePromise from "../../hooks/usePromise";
import { searchTypes } from "../../constants/searchTypes";
import MenuView from "../views/menuView";

export const MenuPresenter = () => {
  const [orderItems, setOrderItems] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: "Beer",
      description: "fruity",
      price: 100,
      alc: 4.4,
    },
    {
      id: 2,
      name: "Wine",
      description: "DRY",
      price: 20,
      alc: 13,
    },
    {
      id: 3,
      name: "Cider",
      description: "Boozy",
      price: 10,
      alc: 5,
    },
    {
      id: 3,
      name: "Cider2",
      description: "Boozy",
      price: 5,
      alc: 5,
    },
    {
      id: 3,
      name: "Cider3",
      description: "Boozy",
      price: 50,
      alc: 5,
    },
    {
      id: 3,
      name: "Cider4",
      description: "Boozy",
      price: 40,
      alc: 5,
    },
    {
      id: 3,
      name: "Cider5",
      description: "Boozy",
      price: 10,
      alc: 5,
    },
    {
      id: 3,
      name: "Cider6",
      description: "Boozy",
      price: 10,
      alc: 5,
    },
    {
      id: 3,
      name: "Cider7",
      description: "Boozy",
      price: 10,
      alc: 5,
    },
    {
      id: 3,
      name: "Cider8",
      description: "Boozy",
      price: 10,
      alc: 5,
    },
    {
      id: 3,
      name: "Cider9",
      description: "Boozy",
      price: 10,
      alc: 5,
    },
    {
      id: 3,
      name: "Cider10",
      description: "Boozy",
      price: 10,
      alc: 5,
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
    const modifiedOrderList = orderItems.map((item) => {
      if (item.name === name && item.count !== 0) {
        return {
          name: item.name,
          count: item.count - 1,
        };
      } else {
        return item;
      }
    });
    setOrderItems(modifiedOrderList);
  };

  return (
    <MenuView
      orderItems={orderItems}
      setOrderItems={(newOrderItems) => setOrderItems(newOrderItems)}
      menuItems={menuItems}
      addToOrder={(name) => addOrIncreaseOrder(name)}
      removeFromOrder={(name) => removeFromOrder(name)}
    ></MenuView>
  );
};

const mapStateToProps = (store) => {
  return {
    menu: store.menu, // hade state.reducer.menu innan men funkade ej
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPresenter);
