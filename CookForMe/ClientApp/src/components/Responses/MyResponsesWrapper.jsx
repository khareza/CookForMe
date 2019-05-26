import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateResponse from './ActionForms/CreateResponse';
import MyResponses from './MyResponses';
import AuthMethods from '../../Helpers/AuthMethods';

export default class MyResponsesWrapper extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        this.state = {
            responses: []
        }
    }

    componentDidMount = () => {
        this.getResponses();
    }

    getResponses = () => {
        this.Auth.getUserResponses()
            .then((res) => {
                console.log(res.data);
               // this.setState({ responses: res.data });
            });
    }

    deleteResponse = (id) => {
        this.Auth.deleteResponse(id)
            .then(() => { this.getResponses() })
            .catch(err => { console.log(err) });
    }

    render() {
        return (
            <div>
                <Route exact path="/Responses/MyResponses" render={() => (<MyResponses responses={this.state.responses}/>)} />
                <Route exact path="/Responses/MyResponses/create/:order_id" component={CreateResponse} />
            </div>
        );
    }
}
