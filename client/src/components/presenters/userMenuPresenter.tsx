import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuView from "../views/menuView";
import { orderMade } from "../../redux/actions/orders";
import { isTypeNode } from "typescript";

export const MenuPresenter = ({ orders, orderMade }) => {
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

  console.log(orderItems);

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
    orderMade(orderItems);
    setOrderItems([]);
  };

  return (
    <MenuView
      orderItems={orderItems}
      setOrderItems={(newOrderItems) => setOrderItems(newOrderItems)}
      menuItems={menuItems}
      addToOrder={(name) => addOrIncreaseOrder(name)}
      removeFromOrder={(name) => removeFromOrder(name)}
      finalizeOrder={() => finalizeOrder()}
    ></MenuView>
  );
};

const mapStateToProps = (store) => {
  return {
    orders: store.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderMade: (beverage) => dispatch(orderMade(beverage)),
    // drinkMade: (id, timeMade) => dispatch(drinkMade(id, timeMade)),
    // drinkPaid: (id, timePaid) => dispatch(drinkPaid(id, timePaid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPresenter);
