import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import store from './redux/store'

import { AddBeverageToMenuPresenter } from './components/addBeverageToMenuPresenter';
import UserSignIn from './components/userSignIn';
import EntryView from './components/entryView';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <div>Hello Meta</div>
                <AddBeverageToMenuPresenter />
                <UserSignIn/>
                <EntryView/>
            </div>  
        </Provider>
    )

};

ReactDOM.render(<App />, document.querySelector("#app"));
