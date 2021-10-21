import {
  fetchRequest,
  setOrders,
  orderMade,
  orderPaid,
} from "../redux/actions/orders";
import { setUserOrders } from "../redux/actions/user";

export default class OrderModel {
  getTimeStamp() {
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();

    return (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" : minute);
  }

  getDateStamp() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return (
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day)
    );
  }

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

  makeOrder(orderId) {
    const time = this.getTimeStamp();
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/orders/make", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: orderId, timestamp: time }),
      })
        .then((res) => {
          if (res.ok) dispatch(orderMade(orderId, time));
          else throw new Error("Something went wrong");
        })
        .catch((err) => console.log(err));
    };
  }

  payForOrder(orderId) {
    const time = this.getTimeStamp();
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/orders/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: orderId, timestamp: time }),
      })
        .then((res) => {
          if (res.ok) dispatch(orderPaid(orderId, time));
          else throw new Error("Something went wrong");
        })
        .catch((err) => console.log(err));
    };
  }

  placeOrder(order, userId, currentBar) {
    const date = this.getDateStamp();
    const time = this.getTimeStamp();
    const finalOrder = {
      user: userId,
      date: date,
      bar: currentBar,
      order: order.order.map((o) => {
        return { beverage: o.name, quantity: o.count };
      }),
    };

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(finalOrder),
    });
  }

  getUserOrders(userId) {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch(`http://localhost:5000/api/orders/user?id=${userId}`, {
        credentials: "include",
      })
        .then((data) => data.json())
        .then((orders) => dispatch(setUserOrders(orders)))
        .catch((err) => console.log(err));
    };
  }
}
