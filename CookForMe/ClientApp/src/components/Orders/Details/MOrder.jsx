import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import '../../../ComponentsStyles/OrderDetails.css';

export class OrderDetails extends Component {

    editOrder = () => {
        this.props.editOrder(this.props.order.id);
    }

    deleteOrder = () => {
        this.props.deleteOrder(this.props.order.id);
    }

    render() {

        return (
            <div className="orderCard">
                <div className="orderCardHeader">
                    <p>{this.props.order.ingredientsPhotoUrl}</p>
                    <p>Deadline: <Moment format="dddd YYYY-MM-DD HH:mm">{this.props.order.deadline}</Moment></p>
                    <p>Time left: <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.props.order.deadline}</Moment></p>
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