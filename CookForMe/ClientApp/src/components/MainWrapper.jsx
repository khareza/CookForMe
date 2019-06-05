import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SideMenu } from './SideMenu';
import { UserProfile } from './Profile/UserProfile';
import { OrdersListWrapper } from './Orders/OrdersWrapper';
import { ResponsesWrapper } from './Responses/ResponsesWrapper';

export class MainWrapper extends Component {

    render() {
        return (
            <div className="site">
                <div className="menuWrapper">
                    <SideMenu logOut={this.props.logOut} />
                </div>
                <div className="content mt-5 ">
                    <Route path="/Profile" component={UserProfile} />
                    <Route path="/Orders" component={OrdersListWrapper} />
                    <Route path="/Responses" component={ResponsesWrapper} />
                </div>
            </div>
        );
    }

}