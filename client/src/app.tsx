import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import store from './redux/store'
import { AddBeverageToMenuPresenter } from './components/presenters/addBeverageToMenuPresenter';
import { HandleUserSignIn } from './components/presenters/handleUserSignIn';
import DrinkModel from './model/drinkModel';
import { searchTypes } from './constants/searchTypes';

const drinkModel = new DrinkModel(); 

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <div>Hello Meta</div>
                <AddBeverageToMenuPresenter drinkModel={drinkModel} searchType={searchTypes.BEER}/>
                <HandleUserSignIn/>
            </div>  
        </Provider>
    )
};

ReactDOM.render(<App />, document.querySelector("#app"));
