import React, { Component } from 'react';
import { OrderDetails } from './Details/MOrder';
import OrderMethods from '../../Helpers/OrderMethods';
import { NotificationManager } from 'react-notifications';

export default class MyOrders extends Component {
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
        this.OrderRequest.getMyOrders()
            .then((res) => {
                this.setState({ orders: res.data });
            });
    }

    editOrder = (id) => {
        this.props.history.push(`/orders/MyOrders/edit/${id}`);
    }

    deleteOrder = (id) => {
        this.OrderRequest.deleteOrder(id)
            .then(() => {
                NotificationManager.success('Deleted order successful', 'Correct');
                this.getOrders()
            })
            .catch(err => {
                NotificationManager.error("You can't do that", 'Error!', 5000, () => {
                });
            });
    }

    renderOrderComponents = () => {
        return this.state.orders.map((order) => {
            return (
                <OrderDetails key={order.id}
                    deleteOrder={this.deleteOrder}
                    editOrder={this.editOrder}
                    order={order} />
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderOrderComponents()}
                <div className="text-center">
                    <button className="btn btn-success mt-3"
                        onClick={() => { this.props.history.push('/orders/MyOrders/create') }}>Add new order</button>
                </div>
            </div>
        );
    }
}