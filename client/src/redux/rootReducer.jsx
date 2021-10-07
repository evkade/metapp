import { combineReducers } from 'redux';
import menuReducer from './reducers/menu';
import userReducer from './reducers/user';

export default combineReducers ({
    menu: menuReducer,
    user: userReducer
});