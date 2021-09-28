import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { AddBeverageToMenuPresenter } from './components/addBeverageToMenuPresenter';
import UserSignIn from './components/userSignIn';

const App = () => {
    console.log('Running app');
    return <div>
    <div>Hello Meta</div>
    <AddBeverageToMenuPresenter />
    <UserSignIn/>
    </div>
};

ReactDOM.render(<App/>, document.querySelector("#app"));