import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AddNewOrder } from './AddNewOrder';
import AuthMethods from '../Helpers/AuthMethods';
import OrdersList from './OrdersList';
import EditOrderForm from './EditOrderForm';

export class OrdersListWrapper extends Component {
    Auth = new AuthMethods();
    state = {
        orderToEdit: {}
    }

    editOrder = (orderToEdit) => {
        this.setState({
            orderToEdit       
        });
        this.props.history.push('/orders/edit')
    }

    render() {
        return (
            <div>
                <Route exact path="/orders" render={() => (<OrdersList editOrder={this.editOrder} />)}/>
                <Route exact path="/orders/create" component={AddNewOrder} />
                <Route exact path="/orders/edit" render={() => (<EditOrderForm orderToEdit={this.state.orderToEdit} />)} />
            </div>
        );
    }
}

