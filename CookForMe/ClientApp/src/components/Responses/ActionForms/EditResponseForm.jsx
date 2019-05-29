import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthMethods from '../../../Helpers/AuthMethods';
import EditRecipe from './EditOffer';

class EditResponseForm extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();

        this.state = {
            offers: [],
            isSubmitDisabled: false
        };
        let id = this.props.match.params.response_id;
        this.getResponse(id);
    }

    getResponse = (id) => {
        this.Auth.getResponse(id)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    offers: res.data.offers,
                });
            }).catch((err) => {
                this.props.history.push(`/responses/MyResponses`);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.Auth.editResponse(
            { id: this.props.match.params.response_id, offers: this.state.offers }
        ).then((res) => { this.props.history.push('/responses/MyResponses') });
    }

    handleOfferChange = (value, name, index ) => {
        let offers = this.state.offers;
        offers[index][name] = value;
        this.setState(offers);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    {this.state.offers.map((offer, index) => (
                        <EditRecipe key={index} offer={offer} index={index} handleRecipeChange={this.handleOfferChange}/>
                    ))}
                    <input type="submit" value="Edit response" className="btn btn-large btn-block btn-info" disabled={this.state.isSubmitDisabled} />
                    <input type="button" value="Cancel" onClick={() => { this.props.history.push('/responses/MyResponses') }} className="btn btn-large btn-block btn-danger" />
                </form>
            </div>
        );
    }
}

export default withRouter(EditResponseForm);