import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import '../../../ComponentsStyles/OrderDetails.css';

export class ResponseDetails extends Component {

    deleteResponse = () => {
        this.props.deleteResponse(this.props.response.responseId);
    }

    editResponse = () => {
        this.props.editResponse(this.props.response.responseId);
    }

    render() {

        return (
            <div className="orderCard">
                <div className="orderCardHeader">
                    <p>{this.props.response.name}</p>
                    <p>Deadline: <Moment format="dddd YYYY-MM-DD HH:mm">{this.props.response.orderDeadline}</Moment></p>
                    <p>Time left: <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.props.response.orderDeadline}</Moment></p>
                </div>
                <div className="orderData">
                    <div>
                        <p><span>Description: </span>{this.props.response.orderDescription}</p>
                        <p><span>Ingredients list: </span></p>
                        <div>
                            <ul>
                                {this.props.response.orderIngredientsAvaiableList.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p><span>My offer: </span></p>
                            <ul>
                                {this.props.response.recipes.map((recipe, index) => (
                                    <li key={index}>{recipe.name} {recipe.price} {recipe.avgCookTime}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p>Response status: {this.props.response.responseStatus}</p>
                        </div>
                    </div>
                    <div className="orderButtons">
                        <button className="button buttonEdit" onClick={this.editResponse} disabled={this.props.response.responseStatus !== "Active"}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                        <button className="button buttonDelete" onClick={this.deleteResponse}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
                    </div>
                </div>
            </div>
        );
    }
}