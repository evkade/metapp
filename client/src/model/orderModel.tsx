import {
  fetchRequest,
  setOrders,
  orderMade,
  orderPaid,
} from "../redux/actions/orders";

export default class OrderModel {
  getOrders(currentBar) {
    console.log(currentBar);
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch(`http://localhost:5000/api/orders?currentbar=${currentBar}`, {
        credentials: "include",
      })
        .then((data) => data.json())
        .then((orders) => dispatch(setOrders(orders)))
        .catch((err) => console.log(err));
    };
  }

  makeOrder(orderId, timestamp) {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/orders/make", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: orderId, timestamp: timestamp }),
      })
        .then((res) => {
          if (res.ok) dispatch(orderMade(orderId, timestamp));
          else throw new Error("Something went wrong");
        })
        .catch((err) => console.log(err));
    };
  }

  payForOrder(orderId, timestamp) {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/orders/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: orderId, timestamp: timestamp }),
      })
        .then((res) => {
          if (res.ok) dispatch(orderPaid(orderId, timestamp));
          else throw new Error("Something went wrong");
        })
        .catch((err) => console.log(err));
    };
  }
}
