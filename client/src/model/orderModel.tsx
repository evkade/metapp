import {
  fetchRequest,
  setOrders,
  orderMade,
  orderPaid,
  setUserOrders,
  orderCancelled,
} from "../redux/actions/orders";
import { orderPlaced } from "../redux/actions/user";

export default class OrderModel {
  getTimeStamp() {
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();

    return (
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute)
    );
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
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch(`http://localhost:5000/api/orders?currentbar=${currentBar}`, {
        credentials: "include",
      })
        .then((data) => {
          if (data.ok) return data.json();
          else throw new Error("Could not fetch orders");
        })
        .then((orders) => dispatch(setOrders(orders)))
        // TODO show to user, not in console
        .catch((err) => console.log(err));
    };
  }

  makeOrder(orderId, socket) {
    const time = this.getTimeStamp();
    return (dispatch) => {
      fetch("http://localhost:5000/api/orders/make", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: orderId, timestamp: time }),
      })
        .then((res) => {
          if (res.ok) {
            dispatch(orderMade(orderId, time));
            socket.emit("made", { id: orderId, timestamp: time });
          } else throw new Error("Could not make order");
        })
        // TODO show to user, not in console
        .catch((err) => console.log(err));
    };
  }

  payForOrder(orderId, socket) {
    const time = this.getTimeStamp();
    return (dispatch) => {
      fetch("http://localhost:5000/api/orders/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: orderId, timestamp: time }),
      })
        .then((res) => {
          if (res.ok) {
            dispatch(orderPaid(orderId, time));
            socket.emit("paid", { id: orderId, timestamp: time });
          } else throw new Error("Could not pay for order");
        })
        // TODO show to user, not in console
        .catch((err) => console.log(err));
    };
  }

  placeOrder(order, user, currentBar, socket) {
    const date = this.getDateStamp();
    const time = this.getTimeStamp();
    const finalOrder = {
      user: user.userId,
      date: date,
      bar: currentBar,
      order: order.order.map((o) => {
        return { beverage: o.name, quantity: o.count };
      }),
    };

    return (dispatch) => {
      dispatch(fetchRequest());
      fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(finalOrder),
      })
        .then((res) => {
          if (res.ok) return res.json();
          else throw new Error("Could not place order");
        })
        .then((result) => {
          dispatch(orderPlaced());
          socket.emit("orderPlaced", { ...result, user: user.username });
        })
        // TODO show to user, not in console
        .catch((err: Error) => console.log(err));
    };
  }

  getUserOrders(userId) {
    return (dispatch) => {
      dispatch(fetchRequest());
      fetch(`http://localhost:5000/api/orders/user?id=${userId}`, {
        credentials: "include",
      })
        .then((data) => {
          if (data.ok) return data.json();
          else throw new Error("Could not get user's orders");
        })
        .then((orders) => dispatch(setUserOrders(orders)))
        // TODO show to user, not in console
        .catch((err) => console.log(err));
    };
  }

  cancelOrder(orderId, socket) {
    return (dispatch) => {
      fetch("http://localhost:5000/api/orders/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: orderId }),
      })
        .then((res) => {
          if (res.ok) {
            dispatch(orderCancelled({ id: orderId }));
            socket.emit("cancelled", orderId);
          } else throw new Error("Could not cancel order");
        })
        // TODO show to user, not in console
        .catch((err) => console.log(err));
    };
  }
}
