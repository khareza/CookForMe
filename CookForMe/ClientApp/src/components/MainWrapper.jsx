import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SideMenu } from './SideMenu';
import { UserProfile } from './Profile/UserProfile';
import { OrdersListWrapper } from './Orders/OrdersWrapper';
import { ResponsesWrapper } from './Responses/ResponsesWrapper';

export class MainWrapper extends Component {

    render() {
        return (
            <div className="site mx-0">
                <div className="menuWrapper">
                    <SideMenu logOut={this.props.logOut} />
                </div>
                <div className="content d-inline-block mt-5 ">
                    <Route path="/profile" component={UserProfile} />
                    <Route path="/Orders" component={OrdersListWrapper} />
                    <Route path="/responses" component={ResponsesWrapper} />
                </div>
            </div>
        );
    }

}