import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import AddNewOrder from './ActionForms/AddNewOrder';
import AuthMethods from '../../Helpers/AuthMethods';
import EditOrderForm from './ActionForms/EditOrderForm';
import MyOrders from './MyOrders';

export default class MyOrdersWrapper extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        this.state = {
            orderToEdit: {},
            orders: []
        }
    }

    componentDidMount=()=> {
        this.getOrders();
    }

    getOrders = () => {
        this.Auth.getMyOrders()
            .then((res) => {
                this.setState({ orders: res.data });
            });
    }

    deleteOrder = (id) => {
        this.Auth.deleteOrder(id)
            .then(() => { this.getOrders() })
            .catch(err => { console.log(err) });
    }

    render() {
        return (
            <div>
                <Route exact path="/orders/MyOrders" render={() => (<MyOrders orders={this.state.orders} deleteOrder={this.deleteOrder} editOrder={this.editOrder} />)} />
                <Route exact path="/orders/MyOrders/create" component={AddNewOrder} />
                <Route exact path="/orders/MyOrders/edit/:order_id" render={() => (<EditOrderForm />)} />
            </div>
        );
    }
}
