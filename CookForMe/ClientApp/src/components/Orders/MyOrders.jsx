import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { OrderDetails } from './Details/MOrder';
import AuthMethods from '../../Helpers/AuthMethods';

class MyOrders extends Component {
    Auth = new AuthMethods();

    editOrder = (id) => {
        this.props.history.push(`/orders/edit/${id}`);
    }


    renderOrderComponents = () => {
        return this.props.orders.map((order) => {
            return (
                <OrderDetails key={order.id}
                    deleteOrder={this.props.deleteOrder}
                    editOrder={this.editOrder}
                    order={order} />
            )
        })
    }

    render() {
        return (
            <div>
                <div className="headerLogin">
                    <h2>All orders</h2>
                </div>
                {this.renderOrderComponents()}
                <div className="text-center">
                    <button className="btn btn-success mt-3"
                        onClick={() => { this.props.history.push('/orders/create') }}>Add new order</button>
                </div>
            </div>
        );
    }
}

export default withRouter(MyOrders);