import { combineReducers } from 'redux';
import menuReducer from './reducers/menu';
import userReducer from './reducers/user';
import orderReducer from './reducers/orders';

export default combineReducers ({
    menu: menuReducer,
    user: userReducer,
    orders: orderReducer
});