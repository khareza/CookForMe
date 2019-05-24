import React, { Component } from 'react';
import { OrdersDetails } from './OrdersDetails';
import AuthMethods from '../Helpers/AuthMethods';
import { withRouter } from 'react-router-dom';

class OrdersList extends Component {
    Auth = new AuthMethods();
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {
        this.Auth.getOrders()
            .then(res => {
                this.setState({ orders: res.data })
            });
    }


    deleteOrder = (id) => {
        this.Auth.orderUser(id)
            .then(() => { this.getOrders() })
            .catch(err => { console.log(err) });
    }

    renderOrderComponents = () => {
        return this.state.orders.map((order)=> {
            return (
                <OrdersDetails key={order.id}
                    deleteOrder={this.deleteOrder}
                    editOrder={
                        (orderToEdit) => {
                            this.props.orderToEdit(orderToEdit)
                        }}
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