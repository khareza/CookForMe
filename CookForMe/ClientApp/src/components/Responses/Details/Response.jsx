import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit,faSearch } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';

export class ResponseDetails extends Component {

    deleteResponse = () => {
        this.props.deleteResponse(this.props.response.id);
    }

    editResponse = () => {
        this.props.editResponse(this.props.response.id);
    }

    checkResponseDetails = () => {
        this.props.checkResponseDetails(this.props.response.id);
    }

    render() {

        return (
            <div className="orderCard">
                <div className="orderCardHeader">
                    <p>{this.props.response.name}</p>
                    <p>Order expiration date: <Moment format="dddd YYYY-MM-DD HH:mm">{this.props.response.order.expirationDate}</Moment></p>
                    <p>Time left: <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.props.response.order.expirationDate}</Moment></p>
                </div>
                <div className="orderData">
                    <div>
                        <p><span>Description: </span>{this.props.response.order.description}</p>
                        <p><span>Ingredients list: </span></p>
                        <div>
                            <ul>
                                {this.props.response.order.ingredientsAvaiableList.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p><span>My offer: </span></p>
                            <ul>
                                {this.props.response.offers.map((offer, index) => (
                                    <li key={index}>{offer.name} {offer.price} {offer.avgCookTime}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p>Response status: {this.props.response.responseStatus}</p>
                        </div>
                    </div>
                    <div className="orderButtons">
                        {this.props.response.responseStatus === "Active"
                            ?
                            (<div>
                                <button className="button buttonEdit"
                                    onClick={this.editResponse}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                </button>
                                <button className="button buttonDelete"
                                    onClick={this.deleteResponse}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                </button>
                            </div>)
                            : <button className="button buttonAccept"
                                onClick={this.checkResponseDetails}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        }

                    </div>
                </div>
            </div>
        );
    }
}