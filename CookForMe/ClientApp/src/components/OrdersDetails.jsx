import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import '../ComponentsStyles/OrderDetails.css';

export class OrdersDetails extends Component {

    editOrder = () => {
        this.props.editOrder(this.props.order);
    }

    deleteOrder = () => {
        this.props.deleteOrder(this.props.order.id);
    }

    render() {

        return (
            <div className="orderCard">
                <div className="orderCardHeader">
                    <p>${this.props.order.ingredientsPhotoUrl}</p>
                    <p>Deadline: ${this.props.order.deadline}</p>
                </div>
                <div className="orderData">
                    <div>
                        <p><span>Description: </span>{this.props.order.description}</p>
                        <p><span>Ingredients list: </span>{this.props.order.ingredientsAvaiable}</p>

                    </div>
                    <div className="orderButtons">
                        <a className="button buttonEdit" onClick={this.editOrder}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></a>
                        <a className="button buttonDelete" onClick={this.deleteOrder}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></a>
                    </div>
                </div>
            </div>




        );
    }
}


//<div>
//    <div className="card border-success mb-3">
//        <div className="card-header">
//            ${this.props.order.ingredientsPhotoUrl}
//        </div>
//        <div className="card-body text-success">
//            <h5 className="card-title">{`Founder: ${this.props.order.description}`}</h5>
//            <p className="card-text">{`Order deadline ${this.props.order.deadline}`}</p>
//            <a className="btn btn-primary text-light" onClick={this.editOrder}>Edit</a>
//            <a className="btn btn-danger text-light" onClick={this.deleteOrder}>Delete</a>
//        </div>
//    </div>
//</div>