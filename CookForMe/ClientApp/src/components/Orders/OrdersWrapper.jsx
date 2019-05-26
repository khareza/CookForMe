import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import AllOrdersWrapper from './AllOrdersWrapper';
import MyOrdersWrapper from './MyOrdersWrapper';

export class OrdersListWrapper extends Component {
    render() {
        return (
            <div>
                <div>
                    <ul>
                        <NavLink to="/Orders/AllOrders">All orders</NavLink>
                        <NavLink to="/Orders/MyOrders">My Orders</NavLink>
                    </ul>
                </div>
                <div>
                    <Route path="/Orders/AllOrders" component={AllOrdersWrapper} />
                    <Route path="/Orders/MyOrders" component={MyOrdersWrapper} />
                </div>
            </div>
        );
    }
}

