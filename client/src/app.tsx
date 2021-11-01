// import "bootstrap/dist/css/bootstrap.min.css";
import "./components/components.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { io } from "socket.io-client";
import { useLocalStorage } from "./hooks/localStorageHook";

import RoutingApp from "./routingApp";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [path, setPath] = useLocalStorage("pathname", "/");
  // console.log(path);

  // @ts-ignore
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  return (
    <Provider store={store}>
      <RoutingApp socket={socket} pathName={path} setPathName={setPath} />
    </Provider>
  );
};
ReactDOM.render(<App />, document.querySelector("#app"));
