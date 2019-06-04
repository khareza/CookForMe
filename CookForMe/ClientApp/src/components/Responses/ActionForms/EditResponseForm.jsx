import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ResponseMethods from '../../../Helpers/ResponseMethods';
import { NotificationManager } from 'react-notifications';
import OffersWrapper from '../Details/OffersWrapper';
import { Error } from '../../Error';

class EditResponseForm extends Component {

    constructor(props) {
        super(props);
        this.ResponseRequest = new ResponseMethods();

        this.state = {
            offers: [],
            offersToDelete: [],
            isSubmitDisabled: false,
            errors: {}
        };
        this.id = this.props.match.params.response_id;
    }

    componentDidMount = () => {
        this.getResponse(this.id);
    }

    getResponse = (id) => {
        this.ResponseRequest.getResponse(id)
            .then((res) => {
                this.setState({
                    offers: res.data.offers,
                });
            }).catch((err) => {
                this.props.history.push(`/responses/MyResponses`);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.ResponseRequest.editResponse(
            { id: this.props.match.params.response_id, offers: this.state.offers, offersToDelete: this.state.offersToDelete }
        ).then((res) => {
            NotificationManager.success('Edited offer successful', 'Correct');
            this.props.history.push('/responses/MyResponses')
        }).catch((err) => {
            this.handleInputErrors(err.response.data.errors);
            NotificationManager.error('Wrong data', 'Error!');
        });
    }

    handleInputErrors = (errors) => {
        let errorsArray = [];
        for (var field in errors) {
            errorsArray[field] = errors[field];
        }
        this.setState({ errors: errorsArray });
    }

    handleOfferChange = (value, name, index ) => {
        let offers = this.state.offers;
        offers[index][name] = value;
        this.setState(offers);
    }

    saveOffers = (offersStringArray) => {
        this.setState({ offers: offersStringArray });
        console.log(this.state.offers);

    }

    addOfferToDelete = (offer) => {
        console.log(offer);
        this.setState({offersToDelete: [...this.state.offersToDelete, offer]})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    {this.state.offers.length > 0 ?
                        <OffersWrapper errors={this.state.errors} saveOffers={this.saveOffers} offersList={this.state.offers} addOfferToDelete={this.addOfferToDelete} /> : null}
                    {this.state.errors['Offers'] ? <Error messages={this.state.errors['Offers']} /> : null}
                    <input type="submit" value="Edit response" className="btn btn-large btn-block btn-info" disabled={this.state.isSubmitDisabled} />
                    <input type="button" value="Cancel" onClick={() => { this.props.history.push('/responses/MyResponses') }} className="btn btn-large btn-block btn-danger" />
                </form>
            </div>
        );
    }
}

export default withRouter(EditResponseForm);