import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import store from './redux/store'
import { AddBeverageToMenuPresenter } from './components/presenters/addBeverageToMenuPresenter';
import UserSignIn from './components/views/userSignIn';
<<<<<<< HEAD
=======
import DrinkModel from './model/drinkModel';

const drinkModel = new DrinkModel(); 
>>>>>>> 7afb8ab (Both APIs working together)

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <div>Hello Meta</div>
                <AddBeverageToMenuPresenter />
                <UserSignIn/>
            </div>  
        </Provider>
    )

};

ReactDOM.render(<App />, document.querySelector("#app"));
