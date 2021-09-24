import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { AddBeverageToMenuPresenter } from './components/AddBeverageToMenuPresenter';

const App = () => {
    console.log('Running app');
    return <div>
    <div>Hello Meta</div>
    <AddBeverageToMenuPresenter />
    </div>
};

ReactDOM.render(<App/>, document.querySelector("#app"));