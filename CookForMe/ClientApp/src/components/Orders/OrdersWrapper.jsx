import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { AddNewOrder } from './Actions/AddNewOrder';
import AuthMethods from '../../Helpers/AuthMethods';
import EditOrderForm from './Actions/EditOrderForm';
import AllOrders from './AllOrders';
import MyOrders from './MyOrders';
import MyResponses from './MyResponses';

export class OrdersListWrapper extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        this.state = {
            orderToEdit: {},
            orders: []
        }
        this.getOrders();
        this.props.history.push('/Orders/AllOrders')
    }

    getOrders = () => {
        this.Auth.getOrders()
            .then((res) => {
                this.setState({ orders: res.data });
            });
    }

    deleteOrder = (id) => {
        this.Auth.deleteOrder(id)
            .then(() => { this.getOrders() })
            .catch(err => { console.log(err) });
    }


    editOrder = (id) => {
        console.log(id);
        this.setState({
            orderToEdit: this.state.orders.find(x => x.id === id)
        });
        this.props.history.push('/orders/edit')
    }

    render() {
        return (
            <div>
                <div>
                    <ul>
                        <NavLink to="/Orders/AllOrders">All orders</NavLink>
                        <NavLink to="/Orders/MyOrders">My Orders</NavLink>
                        <NavLink to="/Orders/MyResponses">My responses</NavLink>
                    </ul>
                </div>
                <div>
                    <Route exact path="/Orders/AllOrders" render={() => (<AllOrders orders={this.state.orders} deleteOrder={this.deleteOrder} editOrder={this.editOrder} />)} />
                    <Route exact path="/Orders/MyOrders" render={() => (<MyOrders orders={this.state.orders} deleteOrder={this.deleteOrder} editOrder={this.editOrder} />)} />
                    <Route exact path="/Orders/MyResponses" render={() => (<MyResponses orders={this.state.orders} deleteOrder={this.deleteOrder} editOrder={this.editOrder} />)} />
                    <Route exact path="/orders/create" component={AddNewOrder} />
                    <Route exact path="/orders/edit/:order_id" render={() => (<EditOrderForm />)} />
                </div>
            </div>
        );
    }
}

