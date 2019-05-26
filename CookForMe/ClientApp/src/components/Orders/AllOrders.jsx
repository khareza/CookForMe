import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { OrderDetails } from './Details/AOrder';
import AuthMethods from '../../Helpers/AuthMethods';

class AllOrders extends Component {
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
            </div>
        );
    }
}

export default withRouter(AllOrders);