import { combineReducers } from 'redux';
import drinksReducer from './reducers/drinks';
import userReducer from './reducers/user';

export default combineReducers ({
    drinks: drinksReducer,
    user: userReducer
});