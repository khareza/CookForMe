import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateResponse from './ActionForms/CreateResponse';
import EditResponseForm from './ActionForms/EditResponseForm';
import {ResponseDetails} from './Details/ResponseDetails';
import MyResponses from './MyResponses';

export default class MyResponsesWrapper extends Component {

    render() {
        return (
            <div>
                <Route exact path="/Responses/MyResponses" component={MyResponses} />
                <Route exact path="/Responses/MyResponses/edit/:response_id" component={EditResponseForm} />
                <Route exact path="/Responses/MyResponses/details/:response_id" component={ResponseDetails} />
                <Route exact path="/Responses/MyResponses/create/:order_id" component={CreateResponse} />
            </div>
        );
    }
}
