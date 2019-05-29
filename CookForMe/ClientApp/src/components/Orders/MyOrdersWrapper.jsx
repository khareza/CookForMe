import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import AddNewOrder from './ActionForms/AddNewOrder';
import EditOrderForm from './ActionForms/EditOrderForm';
import MyOrders from './MyOrders';

export default class MyOrdersWrapper extends Component {

    render() {
        return (
            <div>
                <Route exact path="/orders/MyOrders" component={MyOrders} />
                <Route exact path="/orders/MyOrders/create" component={AddNewOrder} />
                <Route exact path="/orders/MyOrders/edit/:order_id" component={EditOrderForm} />
            </div>
        );
    }
}
