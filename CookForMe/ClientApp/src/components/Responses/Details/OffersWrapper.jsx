import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Offer from './Offer'

export default class OffersWrapper extends Component {

    state = {
        offers: this.props.offersList ? this.props.offersList : [{
            name:'',
            price:'',
            avgCookTime:''
        }]
    }

    addNewOffer = () => {
        //let ingredients = [...this.state.ingredients, ''];
        this.setState({
            offers: [...this.state.offers, { name: '', price: '', avgCookTime: '' }]
        });
        this.saveOffers();
    }

    deleteOffer = (index) => {
        console.log(index);

        let offers = this.state.offers;
        let offerToDelete = offers[index];
        offers.splice(index, 1);
        this.props.addOfferToDelete(offerToDelete);

        this.setState(offers);
        this.saveOffers();
    }

    handleOfferChange = (newValue,name, index) => {
        let offers = this.state.offers;
        offers[index][name] = newValue;

        this.setState(offers);
        this.saveOffers();
    }

    saveOffers = () => {
        let offersStringArray = this.state.offers.map((offer, index) => (offer))
            
        this.props.saveOffers(offersStringArray);
    }

    renderOffers  = () => {
        return this.state.offers.map((offer, index) => (
            <Offer offer={offer} index={index} key={index}
                deleteOffer={this.deleteOffer}
                handleOfferChange={this.handleOfferChange} />
        ))
    }

    render() {
        return (
            <div className="offerWrapper">
                <a className="button buttonAccept" onClick={this.addNewOffer}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></a>
                <p>Offers amount: {this.state.offers.length}</p>
                {this.renderOffers()}
            </div>
        );
    }
}