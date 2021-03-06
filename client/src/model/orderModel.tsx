import {
  fetchRequest,
  setOrders,
  orderMade,
  orderPaid,
  setUserOrders,
  orderCancelled,
  addNewOrder,
} from "../redux/actions/orders";
import { orderPlaced } from "../redux/actions/user";
import moment from "moment";

export default class OrderModel {
  getTimeStamp() {
    return moment().format("HH:mm");
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
        .catch((err) => window.alert(err.message));
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
        .catch((err) => window.alert(err.message));
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
        .catch((err) => window.alert(err.message));
    };
  }

  placeOrder(order, user, currentBar, socket) {
    const date = moment().format("YYYY-MM-DD");
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
          dispatch(addNewOrder({ ...result, user: user.username }));
          socket.emit("orderPlaced", { ...result, user: user.username });
        })
        .catch((err: Error) => window.alert(err.message));
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
        .catch((err) => window.alert(err.message));
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
        .catch((err) => window.alert(err.message));
    };
  }
}
