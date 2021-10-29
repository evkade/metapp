// import "bootstrap/dist/css/bootstrap.min.css";
import "./components/components.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { connect } from "react-redux";
import { logIn } from "./redux/actions/user";
import { switchCurrentBar } from "./redux/actions/menu";
import { io } from "socket.io-client";

import RoutingApp from "./routingApp";

const App = ({}) => {
  const [socket, setSocket] = React.useState(null);
  checkValidUser();

  // @ts-ignore
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  return (
    <Provider store={store}>
      <RoutingApp socket={socket} />
    </Provider>
  );
};

const checkValidUser = async () => {
  await fetch("http://localhost:5000/api/auth/currentuser", {
    credentials: "include",
  })
    .then((data) => data.json())
    .then((user) => {
      store.dispatch(logIn(user.currentUser));
      store.dispatch(
        switchCurrentBar(
          user.currentUser.isAdmin ? user.currentUser.username : "dkm"
        )
      );
    })
    .catch((err) => console.log("No signed in user"));
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps)(App);
ReactDOM.render(<App />, document.querySelector("#app"));
