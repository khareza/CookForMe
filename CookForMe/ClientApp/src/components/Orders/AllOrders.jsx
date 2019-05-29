﻿import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { OrderDetails } from './Details/AOrder';
import AuthMethods from '../../Helpers/AuthMethods';

class AllOrders extends Component {
    Auth = new AuthMethods();

    responseToOrder = (id) => {
        this.props.history.push(`/Responses/MyResponses/create/${id}`);
    }

    renderOrderComponents = () => {
        return this.props.orders.map((order) => {
            return (
                <OrderDetails key={order.id}
                    responseToOrder={this.responseToOrder}
                    order={order} />
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderOrderComponents()}
            </div>
        );
    }
}

export default withRouter(AllOrders);