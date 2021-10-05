import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import store from './redux/store'
import { AddBeverageToMenuPresenter } from './components/presenters/addBeverageToMenuPresenter';
import EntryView from './components/views/entryView';
import { HandleUserSignIn } from './components/presenters/handleUserSignIn';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <div>Hello Meta</div>
                <AddBeverageToMenuPresenter />
                <EntryView/>
                <HandleUserSignIn/>
            </div>  
        </Provider>
    )

};

ReactDOM.render(<App />, document.querySelector("#app"));
