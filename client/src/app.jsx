<<<<<<< HEAD
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { AddBeverageToMenuPresenter } from './components/AddBeverageToMenuPresenter';

const App = () => {
    console.log('Running app');
    return <div>
    <div>Hello Meta</div>
    <AddBeverageToMenuPresenter />
    </div>
=======
import React from "react";
import ReactDOM from "react-dom";
import { AddBeverageToMenuPresenter } from "./components/addBeverageToMenuPresenter";

const App = () => {
  console.log("Running app");
  return (
    <div>
      <div>Hello Meta</div>
      <AddBeverageToMenuPresenter />
    </div>
  );
>>>>>>> 6350ac7 (add working cocktailDB API call, and basic search page)
};

ReactDOM.render(<App />, document.querySelector("#app"));
