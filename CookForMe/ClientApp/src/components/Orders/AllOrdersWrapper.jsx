import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import AuthMethods from '../../Helpers/AuthMethods';
import AllOrders from './AllOrders';

export default class AllOrdersWrapper extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        this.state = {
            orderToEdit: {},
            orders: []
        }
        this.getOrders();
    }

    getOrders = () => {
        this.Auth.getAllOrders()
            .then((res) => {
                this.setState({ orders: res.data });
            });
    }


    render() {
        return (
            <div>
                <Route exact path="/Orders/AllOrders" render={() => (<AllOrders orders={this.state.orders} deleteOrder={this.deleteOrder} editOrder={this.editOrder} />)} />
            </div>
        );
    }
}

