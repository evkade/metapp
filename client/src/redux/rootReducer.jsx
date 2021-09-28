import { combineReducer } from 'redux';
import drinksReducer from './reducers/drinks';
import userReducer from './reducers/user';

export default combinerReducer({
    drinks: drinksReducer,
    user: userReducer
});