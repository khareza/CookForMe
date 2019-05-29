import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import '../../../ComponentsStyles/OrderDetails.css';
import AuthMethods from '../../../Helpers/AuthMethods';

export class OrderDetails extends Component {
    Auth = new AuthMethods();
    state = {
        id: this.props.order.id,
        responses: []
    }

    editOrder = () => {
        this.props.editOrder(this.props.order.id);
    }

    deleteOrder = () => {
        this.props.deleteOrder(this.props.order.id);
    }

    componentDidMount = () => {
        this.getResponses();
    }

    getResponses = () => {
        this.Auth.getOrderResponses(this.state.id)
            .then((res) => {
                this.setState({ responses: res.data });
            });
    }

    renderResponses = () => {
        return this.state.responses.map((response, index) => {
            let offerIndex = index;
            return response.recipes.map((recipe, index) => (
                <div className="offer" key={index}>
                    <p>{offerIndex + 1}</p>
                    <p>{recipe.name}</p>
                    <p>{recipe.price}</p>
                    <p>{recipe.avgCookTime}</p>
                    
                    <div className="orderButtons">
                        <a className="button buttonAccept" onClick={() => { console.log(`Offer ${offerIndex + 1} accepted`) }}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></a>
                    </div>
                </div>
            ))
        })
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

                <div>
                    <div>{this.renderResponses()}</div>
                </div>
            </div>
        );
    }
}