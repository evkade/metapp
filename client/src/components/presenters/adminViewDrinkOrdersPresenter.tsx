import React from 'react';
import { connect } from 'react-redux';
import { drinkMade, drinkPaid } from '../../redux/actions/orders';
import { AdminViewDrinkOrder } from '../views/adminViewDrinkOrder';

const AdminViewDrinkOrdersPresenter = ({orders, drinkMade, drinkPaid}) => {

    const getTimeStamp = () => {
        const today = new Date();
        const hour = today.getHours()
        const minute = today.getMinutes()
        return ((hour < 10) ? '0'+hour : ''+hour) + ':' + ((minute < 10) ? '0'+minute : ''+minute)
    }

    const pay = (id) => {
        drinkPaid(id, getTimeStamp())
    }

    const make = (id) => {
        drinkMade(id, getTimeStamp())
    }

    return (
        <AdminViewDrinkOrder 
            orders={orders.orders}
            drinkMade={make}
            drinkPaid={pay}
        />
    )
};

const mapStateToProps = (store) => {
    return {
      orders: store.orders
    };
  };
  
const mapDispatchToProps = (dispatch) => {
  return {
    drinkMade: (id, timeMade) => dispatch(drinkMade(id, timeMade)),
    drinkPaid: (id, timePaid) => dispatch(drinkPaid(id, timePaid))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminViewDrinkOrdersPresenter);