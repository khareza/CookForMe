import React, { Component } from 'react';
import { OrdersDetails } from './OrdersDetails';
import AuthMethods from '../Helpers/AuthMethods';
import { withRouter } from 'react-router-dom';

class OrdersList extends Component {
    Auth = new AuthMethods();


    editOrder = (id) => {
        this.props.history.push(`/orders/edit/${id}`);
    }


    renderOrderComponents = () => {
        return this.props.orders.map((order)=> {
            return (
                <OrdersDetails key={order.id}
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

export default withRouter(OrdersList);