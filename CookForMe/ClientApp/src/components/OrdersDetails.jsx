import React, { Component } from 'react';


export class OrdersDetails extends Component {

    editOrder = () => {
        this.props.editOrder(this.props.order);
    }

    deleteOrder = () => {
        this.props.deleteOrder(this.props.order.id);
    }

    render() {

        return (
            <div>
                <div className="card border-success mb-3">
                    <div className="card-header">{`${this.props.order.founder} ${this.props.user.founder}`}</div>
                    <div className="card-body text-success">
                        <h5 className="card-title">{`Founder: ${this.props.order.founder.firstName} ${this.props.founder.lastName}`}</h5>
                        <p className="card-text">{`Order deadline ${this.props.order.deadline}`}</p>
                        <a className="btn btn-primary text-light" onClick={this.editOrder}>Edit</a>
                        <a className="btn btn-danger text-light" onClick={this.deleteOrder}>Delete</a>
                    </div>
                </div>
            </div>
        );
    }
}
