import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import AllOrdersWrapper from './AllOrdersWrapper';
import MyOrdersWrapper from './MyOrdersWrapper';

export class OrdersListWrapper extends Component {
    render() {
        return (
            <div>
                <div className="selectMenu">
                    <NavLink activeClassName="selectMenuActive" className="selectMenuItem" to="/Orders/AllOrders">All orders</NavLink>
                    <NavLink activeClassName="selectMenuActive" className="selectMenuItem" to="/Orders/MyOrders">My orders</NavLink>
                </div>
                <div>
                    <Route path="/Orders/AllOrders" component={AllOrdersWrapper} />
                    <Route path="/Orders/MyOrders" component={MyOrdersWrapper} />
                </div>
            </div>
        );
    }
}

