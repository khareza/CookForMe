import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { LoginWrapper } from './components/LoginWrapper';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import AuthMethods from './Helpers/AuthMethods';
import PrivateComponent from './components/PrivateComponent'
import { MainWrapper } from './components/MainWrapper';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-notifications/lib/notifications.css';
import './ComponentsStyles/SideMenu.css';
import './ComponentsStyles/SelectMenu.css';
import './ComponentsStyles/CustomFileUploader.css';
import './ComponentsStyles/OrderDetails.css';
import './ComponentsStyles/UserProfile.css';
import './ComponentsStyles/Error.css';


class App extends Component {

    Auth = new AuthMethods();

    handleLogout = () => {
        this.Auth.logout();
        this.props.history.push('/start/login');
        NotificationManager.success('Logout Successful', 'Correct');
    }

    render() {
        return (
            <div>
                <NotificationContainer />

                <Router>
                    <Switch>
                        <Route exac path="/start" component={LoginWrapper} />
                        <PrivateComponent path="/" component={MainWrapper} logOut={this.handleLogout} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default withRouter(App);