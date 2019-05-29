import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import OrderMethods from '../../Helpers/OrderMethods';
import AllOrders from './AllOrders';

export default class AllOrdersWrapper extends Component {
    constructor(props) {
        super(props);
        this.OrderRequest = new OrderMethods();
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {
        this.OrderRequest.getAllOrders()
            .then((res) => {
                this.setState({ orders: res.data });
            });
    }

    render() {
        return (
            <div>
                <Route exac path="/Orders/AllOrders" render={() => (<AllOrders orders={this.state.orders} deleteOrder={this.deleteOrder} editOrder={this.editOrder} />)} />
            </div>
        );
    }
}

