// import "bootstrap/dist/css/bootstrap.min.css";
import "./components/components.scss";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { io } from "socket.io-client";

import RoutingApp from "./routingApp";

const App = () => {
  const [socket, setSocket] = React.useState(null);

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
ReactDOM.render(<App />, document.querySelector("#app"));
