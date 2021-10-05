import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import store from './redux/store'
import { AddBeverageToMenuPresenter } from './components/presenters/addBeverageToMenuPresenter';
import UserSignIn from './components/views/userSignIn';
import DrinkModel from './model/drinkModel';
import { searchTypes } from './constants/searchTypes';

const drinkModel = new DrinkModel(); 

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <div>Hello Meta</div>
                <AddBeverageToMenuPresenter drinkModel={drinkModel} searchType={searchTypes.BEER}/>
                <UserSignIn/>
            </div>  
        </Provider>
    )
};

ReactDOM.render(<App />, document.querySelector("#app"));
