import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

export default class Offer extends Component {

    handleInputChange = (e) => {
        let newValue = e.target.value;
        let name = e.target.name;
        let index = this.props.index;
        this.props.handleOfferChange(newValue, name, index)
    }

    render() {
        return (
            <div className="offerDetails">
                <input placeholder="Name" type="text" name="name" value={this.props.offer.name} onChange={this.handleInputChange} />
                <input placeholder="Price" name="price" value={this.props.offer.price} onChange={this.handleInputChange} />
                <input placeholder="Avg Cook Time" name="avgCookTime" value={this.props.offer.avgCookTime} onChange={this.handleInputChange} />
                <a className="button buttonDelete" onClick={() => { this.props.deleteOffer(this.props.index) }}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></a>
            </div>
        );
    }
}

