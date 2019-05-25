import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AddNewOrder } from './AddNewOrder';
import AuthMethods from '../Helpers/AuthMethods';
import OrdersList from './OrdersList';
import EditOrderForm from './EditOrderForm';

export class OrdersListWrapper extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        this.state = {
            orderToEdit: {},
            orders: []
        }
    }

    componentDidMount() {
        this.getOrders();
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
                <Route exact path="/orders" render={() => (<OrdersList orders={this.state.orders} deleteOrder = { this.deleteOrder } editOrder = { this.editOrder } />)}/>
                <Route exact path="/orders/create" component={AddNewOrder} />
                <Route exact path="/orders/edit/:order_id" render={() => (<EditOrderForm/>)} />
            </div>
        );
    }
}

