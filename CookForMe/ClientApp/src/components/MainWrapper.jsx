import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SideMenu } from './SideMenu';
import { UserProfile } from './Profile/UserProfile';
import { OrdersListWrapper } from './Orders/OrdersWrapper';
import { ResponsesWrapper } from './Responses/ResponsesWrapper';

export class MainWrapper extends Component {

    render() {
        return (
            <div className="row mx-0">
                <div className="col-md-2">
                    <SideMenu logOut={this.props.logOut} />
                </div>
                <div className="col-md-10 d-inline-block mt-5 ">
                    <Route path="/profile" component={UserProfile} />
                    <Route path="/Orders" component={OrdersListWrapper} />
                    <Route path="/responses" component={ResponsesWrapper} />
                </div>
            </div>
        );
    }

}